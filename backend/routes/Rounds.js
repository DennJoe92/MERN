//Require express to run routes
const express = require('express')
const Round = require('../models/roundsModel')

//Create router vsriable
const router = express.Router()

//Route to get all Rounds
router.get('/', (req, res) => {
    res.json({mssg: 'GET all Rounds'})
})

//Route to get a single Round
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET single Round'})
})

//Post a new round
router.post('/', async(req, res) => {
    const {course, date, player, score} = req.body

    try{
        const round = await Round.create({course, date, player, score})
        res.status(200).json(round)
    } catch (error) {
        res.status(400).json({error: error.message})

    }
})

//Delete a round
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a Round'})
})

//Update a round
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a Round'})
})

//export the router
module.exports = router 