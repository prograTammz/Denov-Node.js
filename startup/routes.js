const express = require('express');
const cookieParser = require('cookie-parser')
//the routes
const users = require('../routes/users');

function Route(app){
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/users', users);
}

module.exports = Route;