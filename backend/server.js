//outlines the required packages for the file, this is to store port in the .env file
require('dotenv').config()

//This line tells the file that Express.js is required to run this file//
const express = require('express')
//Require mongoose package
const mongoose = require('mongoose')
//This points to the Rounds Routes file
const roundRoutes = require('./routes/Rounds')
//This points to the Course Routes file
const coursesRoutes = require('./routes/Courses')

//This then runs the express app
const app = express ()

//Middlewear that logs data to database
app.use(express.json())
//Middlewear that logs out the request and response 
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

//Route Handler pointing to routes set up in Rounds file
app.use('/api/Rounds',roundRoutes)
app.use('/api/Courses',coursesRoutes)

//Connect to DB and post error if error
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Listen for requests on a certain port and then log them to the console
        app.listen (process.env.PORT, () =>{
            console.log('connected to db and listening on port')
        })
    })
    .catch((error) => {
        console.log(error)
    })

process.env