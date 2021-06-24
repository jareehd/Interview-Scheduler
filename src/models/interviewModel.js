const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    emails : [{
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
    }],
    duration : {
        start : String,
        end : String
    },
    resume : String
})

const Interview = mongoose.model('Interview',interviewSchema)

module.exports = Interview