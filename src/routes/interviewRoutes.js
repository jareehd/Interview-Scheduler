const express = require('express')
const router = express.Router()

const Interview = require('../models/interviewModel')
const User = require('../models/userModel')

const valid_check = require('../middleware/valid_check')
const update_check = require('../middleware/update_check')

const {CreationMail , CancelationMail , UpdationMail } = require('../utility/Mail.js');

router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find({})
    res.status(200).send(interviews)
  } catch (e) {
      res.status(400).send(e)
  }
});

router.post('/delete', async (req,res)=>{
    try {
        interview = await Interview.findById(req.body.interviewID)
        for( const email of interview.emails)
        {
            const user = await User.findOne({ email })
            user.interviews.splice(user.interviews.indexOf(interview._id),1)
            await user.save()
        }
        await Interview.findByIdAndDelete(interview._id)
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/update', update_check, async (req,res) => {
    try {
        emails=[]
        for( const user of req.body.users)
        {
            emails.push(user.email)
        }
        await Interview.findByIdAndUpdate(req.body.interviewID,{
            emails,
            duration : {
                start : req.body.start,
                end : req.body.end
            },
            resume
        })
        const interview = await Interview.findById(req.body.interviewID)
        for(const currentuser of req.body.users)
        {
            const user = await User.findById(currentuser._id)
            if(!(user.interviews.includes(interview._id)))
             user.interviews.push(interview._id)
             
            await user.save()
        }
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/',valid_check, async (req,res) => {
    try {
        
        emails=[]
        const resume = req.body.resume
        for( const user of req.body.users)
        {
            emails.push(user.email)
        }
        interview = await new Interview({
            emails,
            duration : {
                start : req.body.start,
                end : req.body.end
            },
            resume
        }).save()

        for(const currentuser of req.body.users)
        {
            const user = await User.findById(currentuser._id)
            user.interviews.push(interview._id)
            await user.save()
//             CreationMail(user.email, parseInt(interview.duration.start),parseInt(interview.duration.end))
        }
            
        res.status(201).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;
