require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT;

//connect db
const db = require('./app/Config/db/index');
db.connect();


app.listen(port, () => console.log('RESTful API listening on port ...' + port));