# smartinteract
interact with terminal users

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/interact)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/interact)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/interact)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/interact/)

## Status for master
[![build status](https://gitlab.com/pushrocks/interact/badges/master/build.svg)](https://gitlab.com/pushrocks/interact/commits/master)
[![coverage report](https://gitlab.com/pushrocks/interact/badges/master/coverage.svg)](https://gitlab.com/pushrocks/interact/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/interact.svg)](https://david-dm.org/pushrocks/interact)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/interact/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/interact/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/interact/badges/code.svg)](https://www.bithound.io/github/pushrocks/interact)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage
We recommend the use of TypeScript for best in class intellesense

```javascript
import { SmartInteract } from 'smartinteract'

let myInteract = new SmartInteract([{ // note: its an array. You can specify multiple questions
    type: 'input',
    message: 'Who are you?',
    default: 'Somebody',
    choices: { ... }, // optional, only needed if type is 'choice'
    validate: (inputString) => { return true } // implement your own validation
}])
SmartInteract.addQuestions([ ... ]) // add more questions
SmartInteract.runQueue()
    .then(answersArray => {
        // do something with the answers
    })

```