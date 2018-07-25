import * as plugins from './smartinteract.plugins';
import * as smartq from 'smartq';
import { Objectmap } from '@pushrocks/lik';

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
  /**
   * holds  the qestion queue, that is emptied once you call
   */
  private questionMap = new Objectmap<IQuestionObject>();

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
    let done = smartq.defer<IAnswerObject>();
    if (this.isValidEnv()) {
      plugins.inquirer
        .prompt([
          {
            name: optionsArg.name,
            type: optionsArg.type,
            message: optionsArg.message,
            default: optionsArg.default,
            choices: optionsArg.choices,
            validate: optionsArg.validate
          }
        ])
        .then((answers: IAnswerObject[]) => {
          // adjust to the fact that now dots define paths for inquirer
          let answerValue: any = answers;
          let nameArray = optionsArg.name.split('.');
          for (let name of nameArray) {
            answerValue = answerValue[name];
          }
          done.resolve({
            name: optionsArg.name,
            value: answerValue
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      let answer: IAnswerObject = {
        name: optionsArg.name,
        value: optionsArg.default
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
    let done = smartq.defer<AnswerBucket>();
    let answerBucket = new AnswerBucket();
    let handleQuestion = async () => {
      if (!this.questionMap.isEmpty()) {
        let oneQuestion = this.questionMap.getOneAndRemove();
        let answer: IAnswerObject = await this.askQuestion(oneQuestion);
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

/**
 * class AnswerBucket holds answers
 */
export class AnswerBucket {
  answerMap = new Objectmap<IAnswerObject>();

  /**
   * add an answer to the bucket
   */
  addAnswer(answerArg: IAnswerObject) {
    this.answerMap.add(answerArg);
  }

  /**
   * gets an answer for a specific name
   */
  getAnswerFor(nameArg: string) {
    let answer = this.answerMap.find(answerArg => {
      return answerArg.name === nameArg;
    });
    return answer.value;
  }

  /**
   * gets all answers as array
   */
  getAllAnswers() {
    return this.answerMap.getArray();
  }
}
