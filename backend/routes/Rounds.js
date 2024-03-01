//Require express to run routes
const express = require('express')
//Requires controller file and function to run routes
const {
    createRound,
    getRounds,
    getRound,
    deleteRound,
    updateRound

} = require ('../controllers/roundsController')

//Create router variable
const router = express.Router()

//Route to get all Rounds
router.get('/', getRounds)

//Route to get a single Round
router.get('/:id', getRound)

//Post a new round
router.post('/', createRound)

//Delete a round
router.delete('/:id',deleteRound)

//Update a round
router.patch('/:id', updateRound)

//export the router
module.exports = router