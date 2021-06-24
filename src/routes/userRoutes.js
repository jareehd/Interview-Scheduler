const express = require('express');
const router = express.Router();
const User = require('../models/userModel')

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
}); 

router.post('/',  async (req,res) => {
  try {
      const user = new User(req.body)
      await user.save() 
      res.status(201).send()
  } catch (e) {
      res.status(500).send(e)
  }
})

module.exports = router;
