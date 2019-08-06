const {User, validateLogin} = require('../models/users');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const cors = require('../middleware/cors');
router.post('/', cors, async (req, res) => {
    const { error } = validateLogin(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
    
    const token = user.generateAuthToken();
    user = await _.pick(user,['isAdmin','isSuperAdmin','phoneNumber','email','firstName','lastName']);
    res.send({user: user,token:token,message:"Logged in successfuly."});

    
});

module.exports = router; 