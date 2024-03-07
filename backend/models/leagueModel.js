//file rquires mongoose to create scheme
const mongoose = require('mongoose')

//function to create a new schema
const Schema = mongoose.Schema

//Strucutre of data
const LeagueSchema = new Schema ({
    leagueName: {
        type: String,
        required: true
    },
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    scoringMethod: {
        type: String,
        required: true
    },

},{timestamps: true})

//Create a model and apply schema

const League = mongoose.model('League',LeagueSchema)

module.exports = League
