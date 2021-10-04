const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    postName: {type: String, required: true, trim: true},
    description: {type:String},
    createdAt: {
        type: Date,
        default: new Date()
    },
    postImages: {type: Buffer},
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    topic_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Topic'}
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;