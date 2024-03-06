//Require express to run routes
const express = require('express')
//Requires controller file and function to run routes
const {
    createCourse,
    getCourses,
    getCourse,
    deleteCourse,
    updateCourse

} = require ('../controllers/coursesController')

//Create router variable
const router = express.Router()

//Route to get all Rounds
router.get('/', getCourses)

//Route to get a single Round
router.get('/:id', getCourse)

//Post a new round
router.post('/', createCourse)

//Delete a round
router.delete('/:id',deleteCourse)

//Update a round
router.patch('/:id', updateCourse)

//export the router
module.exports = router