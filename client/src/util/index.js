
const getLanguageTemplates = () => {
    const cachedTemplates = JSON.parse(localStorage.getItem('languageTemplates'))

    let languageTemplates = {
        python: cachedTemplates && cachedTemplates.python
            ? cachedTemplates.python
            : `def main():\n\tprint('Hello World!')\n\nmain()`,
        javascript: cachedTemplates && cachedTemplates.javascript
            ? cachedTemplates.javascript
            : `const welcome = 'Hello World!';\nconsole.log(welcome);`,
        golang: cachedTemplates && cachedTemplates.golang
            ? cachedTemplates.golang
            : `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello World!");\n}`,
    }

    return languageTemplates
}

const getServer = () => window.location.hostname.includes('localhost') ? 'http://localhost:8080' : ''

export { getLanguageTemplates, getServer }