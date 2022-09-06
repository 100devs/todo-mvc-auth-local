const helpers = require('./ejs_helpers')

module.exports = (app) => {
	app.locals.editIcon = helpers.editIcon
}
