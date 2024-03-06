const Course = require('../models/courseModel')
const mongoose = require('mongoose')

//GET all Courses
const getCourses = async (req, res) => {
    //This finds all rounds and sorts on created date, will want to change this to be top 7 rounds
    const courses = await Course.find({}).sort ({createdAT: -1})

    res.status(200).json(courses)
}

//GET a single Course
const getCourse = async (req, res) => {
    const { id } = req.params

//Validation in mongoose to make sure ID is correct format and if not give 404
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Course'})
    }

    const courses = await Course.findById(id)

    if(!courses) {
        return res.status(404).json({error: 'No such Course'})
    }

    res.status(200).json(courses)
}

//Create new Course
const createCourse = async (req, res) => {
    const {courseName, coursePar, yardage} = req.body

    //add doc to db
    try{
        const course = await Course.create({courseName, coursePar, yardage})
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


//Delete a Round
const deleteCourse = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Course'})
}
const course = await Course.findOneAndDelete({_id: id})
if(!course) {
    return res.status(400).json({error: 'No such Course'})
}

res.status(200).json(course)
}

//Update a Course
const updateCourse = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Course'})
}
const course = await Course.findOneAndUpdate({_id: id}, {
    ...req.body
})
if(!course) {
    return res.status(400).json({error: 'No such Course'})
}

res.status(200).json(course)
}


//Export funtion
module.exports = {
    
    getCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
}