const express = require('express')
const Topic = require('../models/topic')
const Post = require('../models/post')
const auth = require('../middleware/auth')
const { Mongoose } = require('mongoose')
const router = new express.Router()

router.post('/:topic_id/post/create', auth, async(req, res) => {
    let topic_id = req.params.topic_id
    if(!Mongoose.Types.ObjectId.isValid(topic_id)) {
        return res.status(400).send({
            message: 'Invalid topic id',
            data:{}
        })
    }
    Topic.findOne({ _id: topic_id}).then((topic) => {
        if(!topic) {
            return res.status(400).send({
                message: 'No topic found',
                data: {}
            })
        } else {
            let newPost = new Post({
                postName: req.body.postName,
                user_id: req.user._id,
                topic_id: topic_id
            })

            let postData = await newPost.save()

            return res.status(200).send({
                message: 'Post successfully added',
                data: {}
            })
        }
    }).catch((error) => {
        return res.status(400).send({
            message: error.message,
            data: error
        })
    })
})