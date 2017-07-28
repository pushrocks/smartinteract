import { expect, tap } from 'tapbundle'

import * as smartinteract from '../dist/index'

let testInteract: smartinteract.SmartInteract

tap.test('should create a valid new instance', async () => {
  testInteract = new smartinteract.SmartInteract()
  expect(testInteract).to.be.instanceOf(smartinteract.SmartInteract)
})

tap.test('should add question to SmartInteract instance', async () => {
  testInteract.addQuestions([ {
    name: 'testQuestion1',
    type: 'input',
    message: 'what is your favourite color? Answer is blue',
    default: 'blue'
  }])
  testInteract.addQuestions([ {
    name: 'testQuestion2',
    type: 'input',
    message: 'what is your second favourite color? Answer is red',
    default: 'red'
  }])
})

tap.test('should use default value when not in CI', async () => {
  let answerBucket = await testInteract.runQueue()
  expect(answerBucket.getAnswerFor('testQuestion1')).to.equal('blue')
  expect(answerBucket.getAnswerFor('testQuestion2')).to.equal('red')
})

tap.start()
