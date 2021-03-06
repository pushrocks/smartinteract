import { expect, tap } from '@pushrocks/tapbundle';

import * as smartinteract from '../ts/index';

let testInteract: smartinteract.SmartInteract;

tap.test('should create a valid new instance', async () => {
  testInteract = new smartinteract.SmartInteract();
  expect(testInteract).to.be.instanceOf(smartinteract.SmartInteract);
});

tap.test('should get a simple confirmation', async () => {
  const response = await smartinteract.SmartInteract.getCliConfirmation(
    'You feel awesome, right?',
    true
  );
  expect(response).to.be.true;
});

tap.test('should add question to SmartInteract instance', async () => {
  testInteract.addQuestions([
    {
      name: 'testQuestion1',
      type: 'input',
      message: 'what is your favourite color? Answer is blue',
      default: 'blue',
    },
  ]);
  testInteract.addQuestions([
    {
      name: 'testQuestion2',
      type: 'input',
      message: 'what is your second favourite color? Answer is red',
      default: 'red',
    },
  ]);
  testInteract.addQuestions([
    {
      name: 'some.dotted.name',
      type: 'input',
      message: 'what is your second favourite color? Answer is aValidAnswer',
      default: 'aValidAnswer',
    },
  ]);
});

tap.test('should use default value when not in CI', async () => {
  const answerBucket = await testInteract.runQueue();
  expect(answerBucket.getAnswerFor('testQuestion1')).to.equal('blue');
  expect(answerBucket.getAnswerFor('testQuestion2')).to.equal('red');
  expect(answerBucket.getAnswerFor('some.dotted.name')).to.equal('aValidAnswer');
});

tap.start();
