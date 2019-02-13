const CompileService = require('../../../services/compileService')

const compileService = new CompileService()

test('should be an object', () => expect(typeof compileService).toEqual('object'))