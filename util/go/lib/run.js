var compiler = require(__dirname + '/compiler'),
	shx = require('shelljs')

module.exports = (input) => {
	return new Promise((then, er) => {
		compiler(input).then(g => {
			shx.exec('go run ' + g, (err, result) => {
				if (err) {
					return er(err)
				} else {
					then({
						stdout: result,
						buildPath: g
					})
				}
			})
		}).catch(e => {
			return er(e)
		})
	})
}