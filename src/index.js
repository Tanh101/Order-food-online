require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT;
http.listen(port, () => console.log('RESTful API listening on port ...' + port));