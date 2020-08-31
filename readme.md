# @[object Object]/[object Object]
[object Object]

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/[object Object])
* [gitlab.com (source)](https://[object Object]/[object Object]/[object Object])
* [github.com (source mirror)](https://github.com/[object Object]/[object Object])
* [docs (typedoc)](https://[object Object].gitlab.io/[object Object]/)

## Status for master

Status Category | Status Badge
-- | --
GitLab Pipelines | [![pipeline status](https://[object Object]/[object Object]/[object Object]/badges/master/pipeline.svg)](https://lossless.cloud)
GitLab Pipline Test Coverage | [![coverage report](https://[object Object]/[object Object]/[object Object]/badges/master/coverage.svg)](https://lossless.cloud)
npm | [![npm downloads per month](https://badgen.net/npm/dy/[object Object])](https://lossless.cloud)
Snyk | [![Known Vulnerabilities](https://badgen.net/snyk/[object Object]/[object Object])](https://lossless.cloud)
TypeScript Support | [![TypeScript](https://badgen.net/badge/TypeScript/>=%203.x/blue?icon=typescript)](https://lossless.cloud)
node Support | [![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
Code Style | [![Code Style](https://badgen.net/badge/style/prettier/purple)](https://lossless.cloud)
PackagePhobia (total standalone install weight) | [![PackagePhobia](https://badgen.net/packagephobia/install/[object Object])](https://lossless.cloud)
PackagePhobia (package size on registry) | [![PackagePhobia](https://badgen.net/packagephobia/publish/[object Object])](https://lossless.cloud)
BundlePhobia (total size when bundled) | [![BundlePhobia](https://badgen.net/bundlephobia/minzip/[object Object])](https://lossless.cloud)
Platform support | [![Supports Windows 10](https://badgen.net/badge/supports%20Windows%2010/yes/green?icon=windows)](https://lossless.cloud) [![Supports Mac OS X](https://badgen.net/badge/supports%20Mac%20OS%20X/yes/green?icon=apple)](https://lossless.cloud)

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
