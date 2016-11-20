import * as plugins from './smartinteract.plugins'
import * as q from 'q'
import { Objectmap } from 'lik'

export type questionType = 'input' | 'confirm' | 'list' | 'rawlist' | 'expand' | 'checkbox' | 'password' | 'editor'

export interface IChoiceObject {
    name: string
    value: any
}

export interface IQuestionObject {
    name: string
    type: questionType
    message: string
    default: any
    choices: string[] | IChoiceObject[]
    validate: IValidateFunction
}

export interface IAnswerObject {

}

export interface IValidateFunction {
    (anyObject: any): boolean
}

/**
 * class SmartInteract - allows to specify an user interaction during runtime
 */
export class SmartInteract {
    
    /**
     * holds  the qestion queue, that is emptied once you call 
     */
    private questionMap = new Objectmap<IQuestionObject>()

    /**
     * constructor of class SmartInteract
     */
    constructor(questionArrayArg?: IQuestionObject[]) {
        if (questionArrayArg) {
            this.addQuestions(questionArrayArg)
        }
    }
    /**
     * allows you to ask a single question and returns the answer in a promise
     * skips the queue
     */
    askQuestion(optionsArg: IQuestionObject): q.Promise<IAnswerObject[]> {
        let done = q.defer<IAnswerObject[]>()
        plugins.inquirer.prompt([{
            name: optionsArg.name,
            type: optionsArg.type,
            message: optionsArg.message,
            default: optionsArg.default,
            choices: optionsArg.choices,
            validate: optionsArg.validate
        }]).then((answers: IAnswerObject[]) => {
            console.log(answers)
            done.resolve(answers)
        })
        return done.promise
    }

    /**
     * add questions to queue
     */
    addQuestions(questionArrayArg: IQuestionObject[]) {
        this.questionMap.addArray(questionArrayArg)
    }

    /**
     * run the  question queue
     */
    runQueue() {
        let done = q.defer<IAnswerObject[]>()
        let answerMap = new Objectmap<IAnswerObject>()
        let handleQuestion = () => {
            let oneQuestion = this.questionMap.getOneAndRemove()
            this.askQuestion(oneQuestion).then(x => {
                answerMap.addArray(x)
                if (!this.questionMap.isEmpty()) {
                    handleQuestion() // recursion: as questions until empty
                } else {
                    done.resolve(answerMap.getArray()) // when empty, then resolve promise
                }
            })
        }
        handleQuestion()
        return done.promise
    }
}
