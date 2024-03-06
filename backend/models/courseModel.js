//file rquires mongoose to create scheme
const mongoose = require('mongoose')

//function to create a new schema
const Schema = mongoose.Schema

//Strucutre of data
const courseSchema = new Schema ({
    courseName: {
        type: String,
        required: true
    },
    coursePar: {
        type: Number,
        required: true
    },
    yardage: {
        type: Number,
        required: true
    },
    teePosition: {
        type: String,
        required: false
    },

},{timestamps: true})

//Create a model and apply schema

const Course = mongoose.model('League',courseSchema)

module.exports = Course
