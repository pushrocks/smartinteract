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
                done.resolve({
                    name: optionsArg.name,
                    value: answers[optionsArg.name]
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRpbnRlcmFjdC5jbGFzc2VzLnNtYXJ0aW50ZXJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGludGVyYWN0LmNsYXNzZXMuc21hcnRpbnRlcmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbURBQWtEO0FBQ2xELGlDQUFnQztBQUNoQyw2QkFBK0I7QUEyQi9COztHQUVHO0FBQ0g7SUFPRTs7T0FFRztJQUNILFlBQWEsZ0JBQW9DO1FBUmpEOztXQUVHO1FBQ0ssZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBbUIsQ0FBQTtRQU1wRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsV0FBVyxDQUFFLFVBQTJCO1FBQ3RDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQWlCLENBQUE7UUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFFO29CQUN4QixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7b0JBQ3JCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtvQkFDckIsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPO29CQUMzQixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87b0JBQzNCLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTztvQkFDM0IsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO2lCQUM5QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUF3QjtnQkFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7b0JBQ3JCLEtBQUssRUFBRSxPQUFP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