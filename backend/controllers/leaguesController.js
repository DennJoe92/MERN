const League = require('../models/leagueModel')
const Course = require('../models/courseModel')
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

    // Ensure courses is an array
    const coursesArray = Array.isArray(courses) ? courses : [courses];

    // Convert courses array to array of ObjectId
    const courseIds = [];

    
// Iterate over the courses array to find the corresponding ObjectId for each course name
for (const courseName of coursesArray) {
    try {
        // Find the course ObjectId by course name
        const course = await Course.findOne({ courseName });
        
        // If the course is found, push its ObjectId to the courseIds array
        if (course) {
            courseIds.push(course._id);
        } else {
            // If the course is not found, return an error
            return res.status(404).json({ error: `Course not found for name: ${courseName}` });
        }
    } catch (error) {
        // Handle any errors that occur during the query
        return res.status(500).json({ error: error.message });
    }
}
    //add doc to db
    try{
        const league = await League.create({leagueName, courses: courseIds, startDate, endDate, scoringMethod})
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
const { leagueName, courses, startDate, endDate, scoringMethod } = req.body;

// Ensure courses is an array
const coursesArray = Array.isArray(courses) ? courses : [courses];

// Convert courses array to array of ObjectId
const courseIds = [];

// Iterate over the courses array to find the corresponding ObjectId for each course name
for (const courseName of coursesArray) {
    try {
        // Find the course ObjectId by course name
        const course = await Course.findOne({ courseName });
        
        // If the course is found, push its ObjectId to the courseIds array
        if (course) {
            courseIds.push(course._id);
        } else {
            // If the course is not found, return an error
            return res.status(404).json({ error: `Course not found for name: ${courseName}` });
        }
    } catch (error) {
        // Handle any errors that occur during the query
        return res.status(500).json({ error: error.message });
    }
}

try {
    const updatedLeague = await League.findOneAndUpdate(
        { _id: id },
        { leagueName, courses: courseIds, startDate, endDate, scoringMethod },
        { new: true } // Return the updated document
    );
    res.status(200).json(updatedLeague);
} catch (error) {
    res.status(400).json({ error: error.message });
}
}


//Export funtion
module.exports = {
    
    getLeagues,
    getLeague,
    createLeague,
    deleteLeague,
    updateLeague
}