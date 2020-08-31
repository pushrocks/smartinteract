import * as plugins from './smartinteract.plugins';
import * as smartpromise from '@pushrocks/smartpromise';
import { AnswerBucket } from './smartinteract.classes.answerbucket';

/**
 * the availeable question types
 */
export type questionType =
  | 'input'
  | 'confirm'
  | 'list'
  | 'rawlist'
  | 'expand'
  | 'checkbox'
  | 'password'
  | 'editor';

/**
 * a choice
 */
export interface IChoiceObject {
  name: string;
  value: any;
}

export interface IQuestionObject {
  name: string;
  type: questionType;
  message: string;
  default: any;
  choices?: string[] | IChoiceObject[];
  validate?: IValidateFunction;
}

export interface IAnswerObject {
  name: string;
  value: any;
}

export interface IValidateFunction {
  (anyObject: any): boolean;
}

/**
 * class SmartInteract - allows to specify an user interaction during runtime
 */
export class SmartInteract {
  // STATIC
  public static async getCliConfirmation(
    questionArg: string,
    defaultArg: boolean
  ): Promise<boolean> {
    const smartinteractInstance = new SmartInteract();
    const response = await smartinteractInstance.askQuestion({
      default: defaultArg,
      message: questionArg,
      name: 'question',
      type: 'confirm',
    });
    return response.value;
  }

  // INSTANCE
  /**
   * holds  the qestion queue, that is emptied once you call
   */
  private questionMap = new plugins.lik.ObjectMap<IQuestionObject>();

  /**
   * constructor of class SmartInteract
   */
  constructor(questionArrayArg?: IQuestionObject[]) {
    if (questionArrayArg) {
      this.addQuestions(questionArrayArg);
    }
  }
  /**
   * allows you to ask a single question and returns the answer in a promise
   * skips the queue
   */
  askQuestion(optionsArg: IQuestionObject): Promise<IAnswerObject> {
    const done = smartpromise.defer<IAnswerObject>();
    if (this.isValidEnv()) {
      plugins.inquirer
        .prompt([
          {
            name: optionsArg.name,
            type: optionsArg.type,
            message: optionsArg.message,
            default: optionsArg.default,
            choices: optionsArg.choices,
            validate: optionsArg.validate,
          },
        ])
        .then((answers) => {
          // adjust to the fact that now dots define paths for inquirer
          const answerValue = plugins.smartparam.smartGet(answers, optionsArg.name);
          done.resolve({
            name: optionsArg.name,
            value: answerValue,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const answer: IAnswerObject = {
        name: optionsArg.name,
        value: optionsArg.default,
      };
      done.resolve(answer);
    }

    return done.promise;
  }

  /**
   * add questions to queue
   */
  addQuestions(questionArrayArg: IQuestionObject[]) {
    this.questionMap.addArray(questionArrayArg);
  }

  /**
   * run the  question queue
   */
  runQueue() {
    const done = smartpromise.defer<AnswerBucket>();
    const answerBucket = new AnswerBucket();
    const handleQuestion = async () => {
      if (!this.questionMap.isEmpty()) {
        const oneQuestion = this.questionMap.getOneAndRemove();
        const answer: IAnswerObject = await this.askQuestion(oneQuestion);
        answerBucket.addAnswer(answer);
        handleQuestion(); // recursion: as questions until empty
      } else {
        done.resolve(answerBucket); // when empty, then resolve promise
      }
    };
    handleQuestion();
    return done.promise;
  }

  /**
   * checks if the current env is valid for userinput
   */
  private isValidEnv(): boolean {
    if (!process.env.CI) {
      return true;
    } else {
      return false;
    }
  }
}
