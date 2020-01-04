const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const mongoose = require('./database');
const User = require('./models/user');
const Task = require('./models/exercise');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/exercise/new-user", async (req, res) => {
    const {username} = req.body;
    try {
        if (await User.findOne({username}))
            return res.status(400).send("username already taken");

        const user = await User.create(req.body);
        return res.send({"username": user.username, "_id": user._id})
    } catch (err) {
        console.log(err)
    }
});
app.get("/api/exercise/users", async (req, res) => {
    const users = await User.find();
    return res.send(users);
});

app.post("/api/exercise/add", async (req, res) => {
    const {userId, description, duration, date} = req.body;
    try {
        const user = await User.findOne({"_id": userId});
        console.log(user.username);
        const task = await Task.create(req.body);
        return res.send({
            "username": user.username,
            "description": task.description,
            "duration": task.duration,
            "_id": user._id,
            "date": task.date
        })
    } catch (err) {
        console.log(err)
    }
});

app.get("/api/exercise/log", async (req, res) => {
    const userId = req.body.userId;
    const tasks = await Task.find({"userId": userId}).select('-__v');
    return res.send(tasks);
});

// Not found middleware
app.use((req, res, next) => {
    return next({status: 404, message: 'not found'})
});

// Error Handling middleware
app.use((err, req, res, next) => {
    let errCode, errMessage;

    if (err.errors) {
        // mongoose validation error
        errCode = 400; // bad request
        const keys = Object.keys(err.errors);
        // report the first validation error
        errMessage = err.errors[keys[0]].message
    } else {
        // generic or custom error
        errCode = err.status || 500;
        errMessage = err.message || 'Internal Server Error'
    }
    res.status(errCode).type('txt')
        .send(errMessage)
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
});
