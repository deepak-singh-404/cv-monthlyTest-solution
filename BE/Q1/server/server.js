const express = require('express');
const mongoose = require('mongoose')
const passport = require('passport')
const dotenv = require('dotenv');
dotenv.config()

const cors = require('cors')
const morgan = require('morgan')

//MIDDILWARES
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors())

// Routes
const userRoutes = require('./routes/userRoutes');
const { compareSync } = require('bcryptjs');

//Passport Middleware
app.use(passport.initialize());

//Passport Config.
require('./config/passport')(passport)

app.use(morgan('dev'))

//ROUTES
app.get('/', (req,res,next)=>{
    res.send("its working")
})

app.use('/api/v1/user', userRoutes)

//Catching 404 Error
app.use((req, res, next) => {
    const error = new Error('INVALID ROUTE')
    error.status = 404
    next(error);
})

//Error handler function
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/cvRamanQuestionOne"
    , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
        console.log("Database connected")
        app.listen(PORT,()=>{
            console.log("server started")
        })
    }).catch((err) => {
        console.log("Error in connecting to DataBase", err.message)
    })

// process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD
// "mongodb://127.0.0.1:27017/frontEndProject"

