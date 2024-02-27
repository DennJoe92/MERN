//file rquires mongoose to create scheme
const mongoose = require('mongoose')

//function to create a new schema
const Schema = mongoose.Schema

//Strucutre of data
const roundSchema = new Schema ({
    course: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    player: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }

},{timestamps: true})

//Create a model and apply schema

const Round = mongoose.model('Round',roundSchema)

module.exports = Round

