"use strict";
require("typings-test");
const should = require("should");
const smartinteract = require("../dist/index");
describe('smartinteract', function () {
    let testInteract;
    it('should create a valid new instance', function () {
        testInteract = new smartinteract.SmartInteract();
        should(testInteract).be.instanceOf(smartinteract.SmartInteract);
    });
    it('should add question to SmartInteract instance', function () {
        testInteract.addQuestions([{
                name: 'testQuestion1',
                type: 'input',
                message: 'what is your favourite color? Answer is blue',
                default: 'blue'
            }]);
        testInteract.addQuestions([{
                name: 'testQuestion2',
                type: 'input',
                message: 'what is your second favourite color? Answer is red',
                default: 'red'
            }]);
    });
    it('should use default value when not in CI', function (done) {
        this.timeout(30000);
        testInteract.runQueue().then(answerBucket => {
            should(answerBucket.getAnswerFor('testQuestion1')).equal('blue');
            should(answerBucket.getAnswerFor('testQuestion2')).equal('red');
            done();
        }).catch(err => {
            console.log(err);
            throw err;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQixpQ0FBZ0M7QUFFaEMsK0NBQThDO0FBRTlDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7SUFDdEIsSUFBSSxZQUF5QyxDQUFBO0lBQzdDLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRTtRQUNyQyxZQUFZLEdBQUcsSUFBSSxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDaEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ25FLENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLCtDQUErQyxFQUFFO1FBQ2hELFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLElBQUksRUFBRSxPQUFPO2dCQUNiLE9BQU8sRUFBRSw4Q0FBOEM7Z0JBQ3ZELE9BQU8sRUFBRSxNQUFNO2FBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBQ0gsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN2QixJQUFJLEVBQUUsZUFBZTtnQkFDckIsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsT0FBTyxFQUFFLG9EQUFvRDtnQkFDN0QsT0FBTyxFQUFFLEtBQUs7YUFDakIsQ0FBQyxDQUFDLENBQUE7SUFDUCxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxVQUFTLElBQUk7UUFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFDckMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDaEUsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDL0QsSUFBSSxFQUFFLENBQUE7UUFDVixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDaEIsTUFBTSxHQUFHLENBQUE7UUFDYixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==