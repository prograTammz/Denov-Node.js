const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validateRegister} = require('../models/users');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateRegister(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
  
    user = new User(_.pick(req.body, ['firstName','lastName', 'email', 'password','phoneNumber']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
  
    const token = user.generateAuthToken();
    res.cookie('token',token,{expires: new Date(Date.now() + 60*60*48*1000), httpOnly: false, secure: false });
    res.header('x-auth-token', token);
    res.send({message:"Registeration sucessed.",user:_.pick(user, ['_id', 'firstName','lastName', 'email','phoneNumber'])});    
  });
  //getting user data by decrypting the token
  router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    res.send({message:"Successful",user:user});
  });
module.exports = router; 