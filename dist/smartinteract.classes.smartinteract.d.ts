import { AnswerBucket } from './smartinteract.classes.answerbucket';
/**
 * the availeable question types
 */
export declare type questionType = 'input' | 'confirm' | 'list' | 'rawlist' | 'expand' | 'checkbox' | 'password' | 'editor';
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
export declare class SmartInteract {
    /**
     * holds  the qestion queue, that is emptied once you call
     */
    private questionMap;
    /**
     * constructor of class SmartInteract
     */
    constructor(questionArrayArg?: IQuestionObject[]);
    /**
     * allows you to ask a single question and returns the answer in a promise
     * skips the queue
     */
    askQuestion(optionsArg: IQuestionObject): Promise<IAnswerObject>;
    /**
     * add questions to queue
     */
    addQuestions(questionArrayArg: IQuestionObject[]): void;
    /**
     * run the  question queue
     */
    runQueue(): Promise<AnswerBucket>;
    /**
     * checks if the current env is valid for userinput
     */
    private isValidEnv;
}
