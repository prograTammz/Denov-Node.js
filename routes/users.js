const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate,validateLogin} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
  
    user = new User(_.pick(req.body, ['firstName','lastName', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
  
    const token = user.generateAuthToken();
    res.cookie(token,{secure: true, httpOnly: true});
    res.header('x-auth-token', token);
    res.send(_.pick(user, ['_id', 'firstName','lastName', 'email']));    
  });
  router.post('/login', async (req, res) => {
    const { error } = validateLogin(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
  
    const token = user.generateAuthToken();
    res.send(token);
  });
  
  router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id);

    res.send(user);
  });
module.exports = router; 