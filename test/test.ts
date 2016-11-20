import 'typings-test'
import * as should from 'should'

import * as smartinteract from '../dist/index'

describe('smartinteract', function(){
    let testInteract: smartinteract.SmartInteract
    it('should create a valid new instance', function(){
        testInteract = new smartinteract.SmartInteract()
        should(testInteract).be.instanceOf(smartinteract.SmartInteract)
    })
    it('should add question to SmartInteract instance', function() {
        testInteract.addQuestions([{
            name: 'testQuestion1',
            type: 'input',
            message: 'what is your favourite color? Answer is blue',
            default: 'blue'
        }])
        testInteract.addQuestions([{
            name: 'testQuestion2',
            type: 'input',
            message: 'what is your second favourite color? Answer is red',
            default: 'red'
        }])
    })
    it('should use default value when not in CI', function(done){
        this.timeout(30000)
        testInteract.runQueue().then(answerBucket => {
            should(answerBucket.getAnswerFor('testQuestion1')).equal('blue')
            should(answerBucket.getAnswerFor('testQuestion2')).equal('red')
            done()
        }).catch(err => {
            console.log(err)
            throw err
        })
    })
})
