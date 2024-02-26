//outlines the required packages for the file, this is to store port in the .env file
require('dotenv').config()

//This line tells the file that Express.js is required to run this file//
const express = require('express')

//This then runs the express app
const app = express ()

//Middlewear that logs out the request and response 
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

//Route Handler to respond to a get request and log a response
app.get ('/', (req, res) => {
    res.json({mssg: 'Welcome'})
})

//Listen for requests on a certain port and then log them to the console
app.listen (process.env.PORT, () =>{
    console.log('listening for port')
})

process.env