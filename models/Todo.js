const mongoose = require('mongoose')

//Todo variables
const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Todo', TodoSchema)