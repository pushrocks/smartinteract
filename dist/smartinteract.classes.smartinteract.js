"use strict";
const plugins = require("./smartinteract.plugins");
const q = require("q");
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
        let done = q.defer();
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
        let done = q.defer();
        let answerBucket = new AnswerBucket();
        let handleQuestion = () => {
            let oneQuestion = this.questionMap.getOneAndRemove();
            this.askQuestion(oneQuestion).then((answerArg) => {
                answerBucket.addAnswer(answerArg);
                if (!this.questionMap.isEmpty()) {
                    handleQuestion(); // recursion: as questions until empty
                }
                else {
                    done.resolve(answerBucket); // when empty, then resolve promise
                }
            });
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRpbnRlcmFjdC5jbGFzc2VzLnNtYXJ0aW50ZXJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGludGVyYWN0LmNsYXNzZXMuc21hcnRpbnRlcmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbURBQWtEO0FBQ2xELHVCQUFzQjtBQUN0Qiw2QkFBK0I7QUEyQi9COztHQUVHO0FBQ0g7SUFPSTs7T0FFRztJQUNILFlBQVksZ0JBQW9DO1FBUmhEOztXQUVHO1FBQ0ssZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBbUIsQ0FBQTtRQU1sRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7SUFDTCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLFVBQTJCO1FBQ25DLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQWlCLENBQUE7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNyQixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7b0JBQ3JCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtvQkFDckIsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPO29CQUMzQixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87b0JBQzNCLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTztvQkFDM0IsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO2lCQUNoQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUF3QjtnQkFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDVCxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7b0JBQ3JCLEtBQUssRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztpQkFDbEMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLE1BQU0sR0FBa0I7Z0JBQ3hCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtnQkFDckIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxPQUFPO2FBQzVCLENBQUE7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3hCLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZLENBQUMsZ0JBQW1DO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNKLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQWdCLENBQUE7UUFDbEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUNyQyxJQUFJLGNBQWMsR0FBRztZQUNqQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFBO1lBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBd0I7Z0JBQ3hELFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLGNBQWMsRUFBRSxDQUFBLENBQUMsc0NBQXNDO2dCQUMzRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQyxtQ0FBbUM7Z0JBQ2xFLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQTtRQUNELGNBQWMsRUFBRSxDQUFBO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNLLFVBQVU7UUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQTtRQUNoQixDQUFDO0lBQ0wsQ0FBQztDQUNKO0FBcEZELHNDQW9GQztBQUVEOztHQUVHO0FBQ0g7SUFBQTtRQUNJLGNBQVMsR0FBRyxJQUFJLGVBQVMsRUFBaUIsQ0FBQTtJQXlCOUMsQ0FBQztJQXZCRzs7T0FFRztJQUNILFNBQVMsQ0FBQyxTQUF3QjtRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZLENBQUMsT0FBZTtRQUN4QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ3RDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQTtRQUNyQyxDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWE7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNwQyxDQUFDO0NBQ0o7QUExQkQsb0NBMEJDIn0=