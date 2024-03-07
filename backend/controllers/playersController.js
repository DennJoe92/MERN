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

//Create new Player
const createPlayer = async (req, res) => {
    const {name, startingHandicap, currentHandicap, league} = req.body

    // Ensure player is an array
    const leagueArray = Array.isArray(league) ? league : [league];

    // Convert courses array to array of ObjectId
    const leagueIds = [];

    
// Iterate over the courses array to find the corresponding ObjectId for each course name
for (const leagueName of leagueArray) {
    try {
        // Find the course ObjectId by course name
        const league = await Player.findOne({ leagueName });
        
        // If the course is found, push its ObjectId to the leagueIds array
        if (league) {
            leagueIds.push(league._id);
        } else {
            // If the course is not found, return an error
            return res.status(404).json({ error: `League not found for name: ${leagueName}` });
        }
    } catch (error) {
        // Handle any errors that occur during the query
        return res.status(500).json({ error: error.message });
    }
}
    //add doc to db
    try{
        const player = await Player.create({name, startingHandicap, currentHandicap, league:leagueIDs})
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
const { name, startingHandicap, currentHandicap, league } = req.body;

// Ensure player is an array
const leagueArray = Array.isArray(league) ? league : [league];

// Convert courses array to array of ObjectId
const leagueIds = [];

// Iterate over the courses array to find the corresponding ObjectId for each league name
for (const leagueName of leagueArray) {
    try {
        // Find the course ObjectId by course name
        const league = await League.findOne({ leagueName });
        
        // If the course is found, push its ObjectId to the leagueIds array
        if (league) {
            leagueIds.push(league._id);
        } else {
            // If the league is not found, return an error
            return res.status(404).json({ error: `league not found for name: ${leagueName}` });
        }
    } catch (error) {
        // Handle any errors that occur during the query
        return res.status(500).json({ error: error.message });
    }
}

try {
    const updatePlayer = await Player.findOneAndUpdate(
        { _id: id },
        { name, startingHandicap, currentHandicap, league: leagueIDs },
        { new: true } // Return the updated document
    );
    res.status(200).json(updatePlayer);
} catch (error) {
    res.status(400).json({ error: error.message });
}
}


//Export funtion
module.exports = {
    
    getPlayers,
    getPlayer,
    createPlayer,
    deletePlayer,
    updatePlayer
}