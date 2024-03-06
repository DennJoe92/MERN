//Require express to run routes
const express = require('express')
//Requires controller file and function to run routes
const {
    createLeague,
    getLeagues,
    getLeague,
    deleteLeague,
    updateLeague

} = require ('../controllers/leaguesController')

//Create router variable
const router = express.Router()

//Route to get all Rounds
router.get('/', getLeagues)

//Route to get a single Round
router.get('/:id', getLeague)

//Post a new round
router.post('/', createLeague)

//Delete a round
router.delete('/:id',deleteLeague)

//Update a round
router.patch('/:id', updateLeague)

//export the router
module.exports = router