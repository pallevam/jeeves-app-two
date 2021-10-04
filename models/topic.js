const mongoose = require('mongoose')

const TopicSchema = mongoose.Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true},
    content: {type: String},
    topicOwner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;