# @[object Object]/[object Object]
[object Object]

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/[object Object])
* [gitlab.com (source)](https://[object Object]/[object Object]/[object Object])
* [github.com (source mirror)](https://github.com/[object Object]/[object Object])
* [docs (typedoc)](https://[object Object].gitlab.io/[object Object]/)

## Status for master
[![pipeline status](https://[object Object]/[object Object]/[object Object]/badges/master/pipeline.svg)](https://[object Object]/[object Object]/[object Object]/commits/master)
[![coverage report](https://[object Object]/[object Object]/[object Object]/badges/master/coverage.svg)](https://[object Object]/[object Object]/[object Object]/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/[object Object].svg)](https://www.npmjs.com/package/[object Object])
[![Known Vulnerabilities](https://snyk.io/test/npm/[object Object]/badge.svg)](https://snyk.io/test/npm/[object Object])
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

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

> [object Object] licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
