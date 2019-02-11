const shell = require('shelljs')
const { PythonShell } = require('python-shell')
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
                    return new Promise((resolve, _) => {
                        PythonShell.runString(syntax, null, (err, results) => {
                            resolve({ 
                                stdout: results ? results[0] : '',
                                stderr: err ? err.toString() : ''
                            })
                        })
                    })
                case 'golang':
                    return golang.run(syntax)
            }
        } catch (err) {
            throw err
        }
    }
}

module.exports = CompileService