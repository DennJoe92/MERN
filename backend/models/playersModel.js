//file rquires mongoose to create scheme
const mongoose = require('mongoose')

//function to create a new schema
const Schema = mongoose.Schema

//function to bring in league details to schema
const League = require('./leagueModel')

//Strucutre of data
const playerSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    startingHandicap: {
        type: Number,
        required: true
    },
    currentHandicap: {
        type: Number,
        required: true
    },
    league: {
        type: Schema.Types.ObjectId,
        ref: 'League',
        required: true
    },
    leagueName: String,
    

},{timestamps: true})

//Create a model and apply schema

const Player = mongoose.model('Player',playerSchema)

module.exports = Player

