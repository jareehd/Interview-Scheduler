const express = require('express')
const cors = require("cors");
const app = express()
require('dotenv').config()          
const mongoose = require('mongoose') 

app.use(cors());
app.use(express.json({limit : '20mb'}))
app.use(express.urlencoded({ extended: true , limit: '20mb' }))
 

// connect database 
const db = process.env.dbURI

mongoose.connect( db ,{
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify:false
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log('Server is running on port, ' ,port)
})