const express = require('express')
const Topic = require('../models/topic')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/topics', auth, async(req, res) => {
    const topic = new Topic({
        ...req.body,
        topicOwner: req.user._id
    })

    try {
        await topic.save()
        res.status(201).send(topic)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/topics', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'topics',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.topics)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/topics/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const topic = await Topic.findOne({ _id, topicOwner: req.user._id })

        if (!topic) {
            return res.status(404).send()
        }

        res.send(topic)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router