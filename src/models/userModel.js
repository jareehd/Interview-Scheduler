const mongoose = require('mongoose')
const validator = require('validator') 

const userSchema = new mongoose.Schema({
    firstname : {
        type : String
    },
    lastname:{
        type : String
    },
    email: {
        type: String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    } ,
    interviews : [{
            type : mongoose.Schema.Types.ObjectId, 
            ref  : 'Interview'
    }] 
})
 
const User =  mongoose.model('User',userSchema)

module.exports = User