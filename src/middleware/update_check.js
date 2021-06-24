
const Interview = require('../models/interviewModel')
const User = require('../models/userModel')

update_check = async   (req,res,next) => {
    if(req.body.users.length<2)
        return res.status(400).send({
            error : 'Number of participants is less than 2.'
        })

    const users = req.body.users
    const InterviewStart = req.body.start
    const InterviewEnd = req.body.end

    for(  user of users){
        participant = await User.findById( user._id)
        for( interviewID of participant.interviews)
        {
            if(interviewID == req.body.interviewID)    // previous time of current interview has no effect on validation
                continue
            const interview = await Interview.findById(interviewID)
            const start = interview.duration.start
            const end   = interview.duration.end
            if(!( end<=InterviewStart || start>=InterviewEnd)){
                return  res.status(400).send({
                    error : 'User ' + user.email + ' has already an Interview at that time.'
                })
            }
        }
    }
    next()
}

module.exports = update_check