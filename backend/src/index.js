const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const postRouter = require('../src/routes/post');

app.get('/', (req, res) => res.send('Hello world'));

const PORT = process.env.PORT;
const route = require("./routes/index");

//connect db
const db = require("./app/config/db/index");
db.connect();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.listen(5000, () => console.log(`Server stated on port ${5000}`));
