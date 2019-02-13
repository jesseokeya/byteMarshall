const assert = require('assert')
const CompileService = require('../../../services/compileService')

const compileService = new CompileService()

describe('Class CompileService', () => {
    it('should be an object', () =>  {
      assert.equal([1,2,3].indexOf(4), -1);
    })
})