const express = require('express');
const cookieParser = require('cookie-parser')
//the routes
const users = require('../routes/users');
const auth = require('../routes/auth');

function Route(app){
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/users', users);
    app.use('/api/auth',auth);
}

module.exports = Route;