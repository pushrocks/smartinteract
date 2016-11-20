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
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQixpQ0FBZ0M7QUFFaEMsK0NBQThDO0FBRTlDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7SUFDdEIsSUFBSSxZQUFZLENBQUE7SUFDaEIsRUFBRSxDQUFDLG9DQUFvQyxFQUFFO1FBQ3JDLFlBQVksR0FBRyxJQUFJLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUNoRCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDbkUsQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMsK0NBQStDLEVBQUU7SUFFcEQsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQSJ9