const Player = require('../models/playersModel')
const mongoose = require('mongoose')

//GET all Players
const getPlayers = async (req, res) => {
    //This finds all rounds and sorts on created date, will want to change this to be top 7 rounds
    const players = await Player.find({}).sort ({createdAT: -1})

    res.status(200).json(players)
}

//GET a single Player
const getPlayer = async (req, res) => {
    const { id } = req.params

//Validation in mongoose to make sure ID is correct format and if not give 404
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Player'})
    }

    const player = await Player.findById(id)

    if(!player) {
        return res.status(404).json({error: 'No such Player'})
    }

    res.status(200).json(player)
}

//Create new Round
const createPlayer = async (req, res) => {
    const {name, startingHandicap, currentHandicap, league} = req.body

    //add doc to db
    try{
        const player = await Player.create({name, startingHandicap, currentHandicap, league})
        res.status(200).json(player)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


//Delete a Player
const deletePlayer = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Player'})
}
const player = await Player.findOneAndDelete({_id: id})
if(!player) {
    return res.status(400).json({error: 'No such Player'})
}

res.status(200).json(player)
}

//Update a Player
const updatePlayer = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Player'})
}
const player = await Player.findOneAndUpdate({_id: id}, {
    ...req.body
})
if(!player) {
    return res.status(400).json({error: 'No such Player'})
}

res.status(200).json(player)
}


//Export funtion
module.exports = {
    
    getPlayers,
    getPlayer,
    createPlayer,
    deletePlayer,
    updatePlayer
}