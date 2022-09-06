const Message = require('../models/Message');

module.exports = {
	getMessages: async (req, res) => {
		console.log(req.user);
		try {
			let messages;
			if (req.params.own) {
				messages = await Message.find({ userId: req.user.id });
			} else {
				messages = await Message.find({});
			}
			res.render('messages.ejs', { messages: messages, user: req.user });
		} catch (err) {
			console.log(err);
		}
	},

	createMessage: async (req, res) => {
		try {
			await Message.create({
				message: req.body.message,
				likes: 0,
				userId: req.user.id,
				replies: [],
			});
			console.log('Message has been added!');
			res.redirect('/messages');
		} catch (err) {
			console.log(err);
		}
	},

	markLiked: async (req, res) => {
		try {
			const message = await Message.findOne({
				_id: req.body.messageIdFromJSFile,
			});
			await Message.findOneAndUpdate(
				{ _id: req.body.messageIdFromJSFile },
				{
					likes: message.likes + 1,
				}
			);
			console.log('Like added');
			res.json('Like added');
			res.redirect('/messages');
		} catch (err) {
			console.log(err);
		}
	},

	markUnliked: async (req, res) => {
		try {
			const message = await Message.findOne({
				_id: req.body.messageIdFromJSFile,
			});
			await Message.findOneAndUpdate(
				{ _id: req.body.messageIdFromJSFile },
				{
					likes: message.likes - 1,
				}
			);
			console.log('Dislike added');
			res.json('Dislike added');
			res.redirect('/messages');
		} catch (err) {
			console.log(err);
		}
	},

	deleteMessage: async (req, res) => {
		console.log(req.body.todoIdFromJSFile);
		try {
			await Message.findOneAndDelete({ _id: req.body.messageIdFromJSFile });
			console.log('Deleted Todo');
			res.json('Deleted It');
			res.redirect('/messages');
		} catch (err) {
			console.log(err);
		}
	},

	editMessage: async (req, res) => {
		try {
			await Message.findOneAndUpdate(
				{ _id: req.body.messageId },
				{
					message: req.body.message,
				}
			);
			console.log('Message edited');
			res.json('Message edited');
		} catch (err) {
			console.log(err);
		}
	},
};
