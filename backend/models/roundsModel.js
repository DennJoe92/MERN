//file rquires mongoose to create scheme
const mongoose = require('mongoose')

//function to create a new schema
const Schema = mongoose.Schema

//function to bring in details to schema
const Course = require('./courseModel');
const Player = require('./playersModel')


//Strucutre of data
const roundSchema = new Schema ({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
        },
    date: {
        type: Date,
        required: true
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
        required: true
        },
    score: {
        type: Number,
        required: true
    },

},{timestamps: true})

//Create a model and apply schema

const Round = mongoose.model('Round',roundSchema)

module.exports = Round

