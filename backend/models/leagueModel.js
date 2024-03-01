//file rquires mongoose to create scheme
const mongoose = require('mongoose')

//function to create a new schema
const Schema = mongoose.Schema

//Strucutre of data
const leagueSchema = new Schema ({
    leagueName: {
        type: String,
        required: true
    },
    homeCourse: {
        type: String,
        required: true
    },
    secondCourse: {
        type: String,
        required: false
    },
    thirdCourse: {
        type: String,
        required: false
    },
    fourthCourse: {
        type: String,
        required: false
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

const League = mongoose.model('League',leagueSchema)

module.exports = League
