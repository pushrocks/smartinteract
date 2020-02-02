# smartinteract

smart cli interaction

## Availabililty

[![npm](https://pushrocks.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/smartinteract)
[![git](https://pushrocks.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/smartinteract)
[![git](https://pushrocks.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/pushrocks/smartinteract)
[![docs](https://pushrocks.gitlab.io/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/smartinteract/)

## Status for master

[![build status](https://GitLab.com/pushrocks/smartinteract/badges/master/build.svg)](https://GitLab.com/pushrocks/smartinteract/commits/master)
[![coverage report](https://GitLab.com/pushrocks/smartinteract/badges/master/coverage.svg)](https://GitLab.com/pushrocks/smartinteract/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/smartinteract.svg)](https://www.npmjs.com/package/smartinteract)
[![Dependency Status](https://david-dm.org/pushrocks/smartinteract.svg)](https://david-dm.org/pushrocks/smartinteract)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartinteract/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartinteract/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/smartinteract/badges/code.svg)](https://www.bithound.io/github/pushrocks/smartinteract)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage

Use TypeScript for best in class instellisense.

```javascript
import { SmartInteract } from 'smartinteract'

let myInteract = new SmartInteract([{ // note: its an array. You can specify multiple questions
    name: 'question1',
    type: 'input',
    message: 'Who are you?',
    default: 'Somebody',
    validate: (inputString) => { return true } // implement your own validation
}])
myInteract.addQuestions([ ... ]) // add more questions
myInteract.runQueue()
    .then(answerBucket => { // the bucket has all the answers of the completed queue
        let answerQuestion1 = answerBucket.getAnswerFor('question1')
        // do something with the answers
    })

// alternatively use .askQuestion() for more direct control
myInteract.askQuestion{ // note: its an array. You can specify multiple questions
    name: 'question2',
    type: 'confirm',
    message: 'Do you speak English?',
    default: true,
    validate: (inputString) => { return true } // implement your own validation
}().then(answerObject => {
    // answerObject looks like { name: 'question2', value: true }
})
```

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
> | By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://push.rocks)
