const express = require('express')
const router = new express.Router()
const Interview = require('../models/interviewModel')

router.get('/view/:id' , async function(req,res){
   
   try{
     const email = req.query.email    
     const interview = await Interview.findById(req.params.id);
     
     let result;

     if(interview.emails.includes(email)) result = "Welcome to meeting    " + email
     else result = "Meeting not found"
      
     res.status(200).send(result)
   } catch (e) {
     res.status(500).send(e)
   }
});

module.exports = router