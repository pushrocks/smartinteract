# smartinteract
interact with terminal users

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/smartinteract)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/smartinteract)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/smartinteract)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/smartinteract/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartinteract/badges/master/build.svg)](https://gitlab.com/pushrocks/smartinteract/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartinteract/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartinteract/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/smartinteract.svg)](https://david-dm.org/pushrocks/smartinteract)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartinteract/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartinteract/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/smartinteract/badges/code.svg)](https://www.bithound.io/github/pushrocks/smartinteract)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage
We recommend the use of TypeScript for best in class intellesense

```javascript
import { SmartInteract } from 'smartinteract'

let myInteract = new SmartInteract([{ // note: its an array. You can specify multiple questions
    name: 'question1',
    type: 'input',
    message: 'Who are you?',
    default: 'Somebody',
    validate: (inputString) => { return true } // implement your own validation
}])
SmartInteract.addQuestions([ ... ]) // add more questions
SmartInteract.runQueue()
    .then(answerBucket => { // the bucket has all the answers of the completed queue
        let answerQuestion1 = answerBucket.getAnswerFor('question1')
        // do something with the answers
    })

// alternatively use .askQuestion() for more direct control
SmartInteract.askQuestion{ // note: its an array. You can specify multiple questions
    name: 'question2',
    type: 'confirm',
    message: 'Do you speak English?',
    default: true,
    validate: (inputString) => { return true } // implement your own validation
}().then(answerObject => {
    // answerObject looks like { name: 'question2', value: true }
})
```

### Environment
In some environments like CI there is no user input to be expected.
smartinteract will always directyl create an answer from the default value

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
