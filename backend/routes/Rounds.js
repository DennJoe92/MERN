//Require express to run routes
const express = require('express')
//Requires controller file and function to run routes
const {
    createRound,
    getRounds,
    getRound

} = require ('../controllers/roundsController')

//Create router vsriable
const router = express.Router()

//Route to get all Rounds
router.get('/', getRounds)

//Route to get a single Round
router.get('/:id', getRound)

//Post a new round
router.post('/', createRound)

//Delete a round
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a Round'})
})

//Update a round
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a Round'})
})

//export the router
module.exports = router 