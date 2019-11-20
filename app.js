
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const userRouter = require("./backend/routes/users");
const configData = require('./backend/config/config');

const config = configData.config();
const app = express();

const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}?authSource=${config.db.db_authSource}`;


mongoose.connect(mongoUrl, {
    // promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    config: {
        autoIndex: false,
        useNewUrlParser: true
    }
}).then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('There is an error in connecting with MongoDB');
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/users', userRouter);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/frontend/index.html');
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/frontend/login.html');
});
app.listen(config.app.port, config.app.host);
console.log(`Running on http://${config.app.host}:${config.app.port}`);