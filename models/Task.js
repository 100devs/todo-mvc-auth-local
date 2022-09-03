const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
task: {type: String, required: true},
day: {type: String, required: true},
month: {type: String, required: true},
startTime: {type: String, required: true},
endTime: {type: String, required: true},
userId: { type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Task', TaskSchema)