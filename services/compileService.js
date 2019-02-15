const shell = require('shelljs')
const golang = require('../util/go')

/**
 * Class Compile Service
 * @constructor Initializes the compile service
 * @param {Object} options - Options passed into the class constructor
 */
class CompileService {
    constructor(options = {}) {
        this.options = options
    }

    /**
     * Compiles code for multiple supported programming languages
     * @param {Object} context - languge and syntax to be compiled
     * @returns {Promise<Object>} Compilation result
     * @throws {Error} Throws an error if one occurs while running
     */
    async compile({ language, syntax }) {
        try {
            switch (language) {
                case 'javascript':
                    return shell.exec(`node -e "${syntax}"`)
                case 'python':
                    return shell.exec(`python -c "${syntax}"`)
                case 'golang':
                    return golang.run(syntax)
                default:
                    break
            }
        } catch (err) {
            return err
        }
    }
}

module.exports = CompileService