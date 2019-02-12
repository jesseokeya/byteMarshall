const shell = require('shelljs')
const golang = require('../util/go')

class CompileService {
    constructor(options = {}) {
        this.options = options
    }

    async compile({ language, syntax }) {
        try {
            switch(language) {
                case 'javascript':
                    return shell.exec(`node -e "${syntax}"`)
                case 'python':
                    return shell.exec(`python -c "${syntax}"`)
                case 'golang':
                    return golang.run(syntax)
            }
        } catch (err) {
            throw err
        }
    }
}

module.exports = CompileService