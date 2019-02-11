const languageTemplates = {
    python: `def main():\n\tprint("Hello World!")\n\nmain()`,
    javascript: `const welcome = "Hello World!";\nconsole.log(welcome);`,
    golang: `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello World!");\n}`,
}

export { languageTemplates }