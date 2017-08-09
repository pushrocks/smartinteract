"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartinteract.plugins");
const smartq = require("smartq");
const lik_1 = require("lik");
/**
 * class SmartInteract - allows to specify an user interaction during runtime
 */
class SmartInteract {
    /**
     * constructor of class SmartInteract
     */
    constructor(questionArrayArg) {
        /**
         * holds  the qestion queue, that is emptied once you call
         */
        this.questionMap = new lik_1.Objectmap();
        if (questionArrayArg) {
            this.addQuestions(questionArrayArg);
        }
    }
    /**
     * allows you to ask a single question and returns the answer in a promise
     * skips the queue
     */
    askQuestion(optionsArg) {
        let done = smartq.defer();
        if (this.isValidEnv()) {
            plugins.inquirer.prompt([{
                    name: optionsArg.name,
                    type: optionsArg.type,
                    message: optionsArg.message,
                    default: optionsArg.default,
                    choices: optionsArg.choices,
                    validate: optionsArg.validate
                }]).then((answers) => {
                // adjust to the fact that now dots define paths for inquirer
                let answerValue = answers;
                let nameArray = optionsArg.name.split('.');
                for (let name of nameArray) {
                    answerValue = answerValue[name];
                }
                done.resolve({
                    name: optionsArg.name,
                    value: answerValue
                });
            }).catch(err => {
                console.log(err);
            });
        }
        else {
            let answer = {
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
    addQuestions(questionArrayArg) {
        this.questionMap.addArray(questionArrayArg);
    }
    /**
     * run the  question queue
     */
    runQueue() {
        let done = smartq.defer();
        let answerBucket = new AnswerBucket();
        let handleQuestion = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.questionMap.isEmpty()) {
                let oneQuestion = this.questionMap.getOneAndRemove();
                let answer = yield this.askQuestion(oneQuestion);
                answerBucket.addAnswer(answer);
                handleQuestion(); // recursion: as questions until empty
            }
            else {
                done.resolve(answerBucket); // when empty, then resolve promise
            }
        });
        handleQuestion();
        return done.promise;
    }
    /**
     * checks if the current env is valid for userinput
     */
    isValidEnv() {
        if (!process.env.CI) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.SmartInteract = SmartInteract;
/**
 * class AnswerBucket holds answers
 */
class AnswerBucket {
    constructor() {
        this.answerMap = new lik_1.Objectmap();
    }
    /**
     * add an answer to the bucket
     */
    addAnswer(answerArg) {
        this.answerMap.add(answerArg);
    }
    /**
     * gets an answer for a specific name
     */
    getAnswerFor(nameArg) {
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
exports.AnswerBucket = AnswerBucket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRpbnRlcmFjdC5jbGFzc2VzLnNtYXJ0aW50ZXJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGludGVyYWN0LmNsYXNzZXMuc21hcnRpbnRlcmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbURBQWtEO0FBQ2xELGlDQUFnQztBQUNoQyw2QkFBK0I7QUEyQi9COztHQUVHO0FBQ0g7SUFPRTs7T0FFRztJQUNILFlBQWEsZ0JBQW9DO1FBUmpEOztXQUVHO1FBQ0ssZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBbUIsQ0FBQTtRQU1wRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsV0FBVyxDQUFFLFVBQTJCO1FBQ3RDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQWlCLENBQUE7UUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFFO29CQUN4QixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7b0JBQ3JCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtvQkFDckIsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPO29CQUMzQixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87b0JBQzNCLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTztvQkFDM0IsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO2lCQUM5QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUF3QjtnQkFDaEMsNkRBQTZEO2dCQUM3RCxJQUFJLFdBQVcsR0FBUSxPQUFPLENBQUE7Z0JBQzlCLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxJ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