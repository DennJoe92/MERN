//Require express to run routes
const express = require('express')
//Requires controller file and function to run routes
const {
    createPlayer,
    getPlayers,
    getPlayer,
    deletePlayer,
    updatePlayer

} = require ('../controllers/playersController')

//Create router variable
const router = express.Router()

//Route to get all Rounds
router.get('/', getPlayers)

//Route to get a single Round
router.get('/:id', getPlayer)

//Post a new round
router.post('/', createPlayer)

//Delete a round
router.delete('/:id',deletePlayer)

//Update a round
router.patch('/:id', updatePlayer)

//export the router
module.exports = router