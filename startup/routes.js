const express = require('express');
const cookieParser = require('cookie-parser')
//the routes
const users = require('../routes/users');
const auth = require('../routes/auth');
const bank = require('../routes/bank');

function Route(app){
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/users', users);
    app.use('/api/auth',auth);
    app.use('/api/bank',bank);
}

module.exports = Route;