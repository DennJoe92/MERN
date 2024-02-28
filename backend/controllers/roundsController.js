const Round = require('../models/roundsModel')
const mongoose = require('mongoose')

//GET all Rounds
const getRounds = async (req, res) => {
    //This finds all rounds and sorts on created date, will want to change this to be top 7 rounds
    const rounds = await Round.find({}).sort ({createdAT: -1})

    res.status(200).json(rounds)
}

//GET a single Round
const getRound = async (req, res) => {
    const { id } = req.params

//Validation in mongoose to make sure ID is correct format and if not give 404
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Round'})
    }

    const round = await Round.findById(id)

    if(!round) {
        return res.status(404).json({error: 'No such Round'})
    }

    res.status(200).json(round)
}

//Create new Round
const createRound = async (req, res) => {
    const {course, date, player, score} = req.body

    //add doc to db
    try{
        const round = await Round.create({course, date, player, score})
        res.status(200).json(round)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


//Delete a Round
const deleteRound = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Round'})
}
const round = await Round.findOneAndDelete({_id: id})
if(!round) {
    return res.status(400).json({error: 'No such Round'})
}

res.status(200).json(round)
}

//Update a Round
const updateRound = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Round'})
}
const round = await Round.findOneAndUpdate({_id: id}, {
    ...req.body
})
if(!round) {
    return res.status(400).json({error: 'No such Round'})
}

res.status(200).json(round)
}


//Export funtion
module.exports = {
    
    getRounds,
    getRound,
    createRound,
    deleteRound,
    updateRound
}