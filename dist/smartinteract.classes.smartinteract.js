"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = __importStar(require("./smartinteract.plugins"));
const smartpromise = __importStar(require("@pushrocks/smartpromise"));
const smartinteract_classes_answerbucket_1 = require("./smartinteract.classes.answerbucket");
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
        this.questionMap = new plugins.lik.Objectmap();
        if (questionArrayArg) {
            this.addQuestions(questionArrayArg);
        }
    }
    /**
     * allows you to ask a single question and returns the answer in a promise
     * skips the queue
     */
    askQuestion(optionsArg) {
        const done = smartpromise.defer();
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
                .then(answers => {
                // adjust to the fact that now dots define paths for inquirer
                const answerValue = plugins.smartparam.smartGet(answers, optionsArg.name);
                done.resolve({
                    name: optionsArg.name,
                    value: answerValue
                });
            })
                .catch(err => {
                console.log(err);
            });
        }
        else {
            const answer = {
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
        const done = smartpromise.defer();
        const answerBucket = new smartinteract_classes_answerbucket_1.AnswerBucket();
        const handleQuestion = async () => {
            if (!this.questionMap.isEmpty()) {
                const oneQuestion = this.questionMap.getOneAndRemove();
                const answer = await this.askQuestion(oneQuestion);
                answerBucket.addAnswer(answer);
                handleQuestion(); // recursion: as questions until empty
            }
            else {
                done.resolve(answerBucket); // when empty, then resolve promise
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRpbnRlcmFjdC5jbGFzc2VzLnNtYXJ0aW50ZXJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGludGVyYWN0LmNsYXNzZXMuc21hcnRpbnRlcmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxpRUFBbUQ7QUFDbkQsc0VBQXdEO0FBQ3hELDZGQUFvRTtBQXlDcEU7O0dBRUc7QUFDSCxNQUFhLGFBQWE7SUFNeEI7O09BRUc7SUFDSCxZQUFZLGdCQUFvQztRQVJoRDs7V0FFRztRQUNLLGdCQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBbUIsQ0FBQztRQU1qRSxJQUFJLGdCQUFnQixFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFDRDs7O09BR0c7SUFDSCxXQUFXLENBQUMsVUFBMkI7UUFDckMsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBaUIsQ0FBQztRQUNqRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNyQixPQUFPLENBQUMsUUFBUTtpQkFDYixNQUFNLENBQUM7Z0JBQ047b0JBQ0UsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO29CQUNyQixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7b0JBQ3JCLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTztvQkFDM0IsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPO29CQUMzQixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87b0JBQzNCLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUTtpQkFDOUI7YUFDRixDQUFDO2lCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDZCw2REFBNkQ7Z0JBQzdELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO29CQUNyQixLQUFLLEVBQUUsV0FBVztpQkFDbkIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE1BQU0sTUFBTSxHQUFrQjtnQkFDNUIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO2dCQUNyQixLQUFLLEVBQUUsVUFBVSxDQUFDLE9BQU87YUFDMUIsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEI7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWSxDQUFDLGdCQUFtQztRQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVE7UUFDTixNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFnQixDQUFDO1FBQ2hELE1BQU0sWUFBWSxHQUFHLElBQUksaURBQVksRUFBRSxDQUFDO1FBQ3hDLE1BQU0sY0FBYyxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUMvQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN2RCxNQUFNLE1BQU0sR0FBa0IsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNsRSxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixjQUFjLEVBQUUsQ0FBQyxDQUFDLHNDQUFzQzthQUN6RDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsbUNBQW1DO2FBQ2hFO1FBQ0gsQ0FBQyxDQUFDO1FBQ0YsY0FBYyxFQUFFLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7T0FFRztJQUNLLFVBQVU7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0NBQ0Y7QUEzRkQsc0NBMkZDIn0=