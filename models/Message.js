const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const MessageSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		required: true,
	},
	replies: {
		type: Array,
	},
});

<<<<<<< HEAD
module.exports = mongoose.model('Message', MessageSchema);
=======
module.exports = mongoose.model('Message', MessageSchema);
>>>>>>> main
