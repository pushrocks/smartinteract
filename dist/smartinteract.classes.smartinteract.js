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
        plugins.inquirer.prompt([{
                name: optionsArg.name,
                type: optionsArg.type,
                message: optionsArg.message,
                default: optionsArg.default,
                choices: optionsArg.choices,
                validate: optionsArg.validate
            }]).then((answers) => {
            console.log(answers);
            done.resolve(answers);
        });
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
        let answerMap = new lik_1.Objectmap();
        let handleQuestion = () => {
            let oneQuestion = this.questionMap.getOneAndRemove();
            this.askQuestion(oneQuestion).then(x => {
                answerMap.addArray(x);
                if (!this.questionMap.isEmpty()) {
                    handleQuestion(); // recursion: as questions until empty
                }
                else {
                    done.resolve(answerMap.getArray()); // when empty, then resolve promise
                }
            });
        };
        handleQuestion();
        return done.promise;
    }
}
exports.SmartInteract = SmartInteract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRpbnRlcmFjdC5jbGFzc2VzLnNtYXJ0aW50ZXJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGludGVyYWN0LmNsYXNzZXMuc21hcnRpbnRlcmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbURBQWtEO0FBQ2xELHVCQUFzQjtBQUN0Qiw2QkFBK0I7QUEwQi9COztHQUVHO0FBQ0g7SUFPSTs7T0FFRztJQUNILFlBQVksZ0JBQW9DO1FBUmhEOztXQUVHO1FBQ0ssZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBbUIsQ0FBQTtRQU1sRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7SUFDTCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLFVBQTJCO1FBQ25DLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQW1CLENBQUE7UUFDckMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO2dCQUNyQixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7Z0JBQ3JCLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTztnQkFDM0IsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPO2dCQUMzQixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87Z0JBQzNCLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUTthQUNoQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUF3QjtZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekIsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZLENBQUMsZ0JBQW1DO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNKLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQW1CLENBQUE7UUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxlQUFTLEVBQWlCLENBQUE7UUFDOUMsSUFBSSxjQUFjLEdBQUc7WUFDakIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtZQUNwRCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM5QixjQUFjLEVBQUUsQ0FBQSxDQUFDLHNDQUFzQztnQkFDM0QsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBLENBQUMsbUNBQW1DO2dCQUMxRSxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUE7UUFDRCxjQUFjLEVBQUUsQ0FBQTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0NBQ0o7QUE5REQsc0NBOERDIn0=