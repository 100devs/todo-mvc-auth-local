const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
task: {type: String, required: true},
day: {type: String, required: true},
month: {type: String, required: true},
startTime: {type: String},
endTime: {type: String},
userId: { type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Task', TaskSchema)