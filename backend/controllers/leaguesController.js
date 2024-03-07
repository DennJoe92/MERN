const League = require('../models/leagueModel')
const mongoose = require('mongoose')

//GET all Leagues
const getLeagues = async (req, res) => {
    //This finds all leagues and sorts on created date, will want to change this to be top 7 rounds
    const leagues = await League.find({}).sort ({createdAT: -1})

    res.status(200).json(leagues)
}

//GET a single League
const getLeague = async (req, res) => {
    const { id } = req.params

//Validation in mongoose to make sure ID is correct format and if not give 404
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such League'})
    }

    const league = await League.findById(id)

    if(!league) {
        return res.status(404).json({error: 'No such League'})
    }

    res.status(200).json(league)
}

//Create new League
const createLeague = async (req, res) => {
    const {leagueName, courses, startDate, endDate, scoringMethod} = req.body

    //add doc to db
    try{
        const league = await League.create({leagueName, courses, startDate, endDate, scoringMethod})
        res.status(200).json(league)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


//Delete a League
const deleteLeague = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such League'})
}
const league = await League.findOneAndDelete({_id: id})
if(!league) {
    return res.status(400).json({error: 'No such League'})
}

res.status(200).json(league)
}

//Update a League
const updateLeague = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such League'})
}
const league = await League.findOneAndUpdate({_id: id}, {
    ...req.body
})
if(!league) {
    return res.status(400).json({error: 'No such League'})
}

res.status(200).json(league)
}


//Export funtion
module.exports = {
    
    getLeagues,
    getLeague,
    createLeague,
    deleteLeague,
    updateLeague
}