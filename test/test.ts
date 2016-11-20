import 'typings-test'
import * as should from 'should'

import * as smartinteract from '../dist/index'

describe('smartinteract', function(){
    let testInteract
    it('should create a valid new instance', function(){
        testInteract = new smartinteract.SmartInteract()
        should(testInteract).be.instanceOf(smartinteract.SmartInteract)
    })
    it('should add question to SmartInteract instance', function() {
        
    })
})

