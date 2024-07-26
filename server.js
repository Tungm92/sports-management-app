const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const methodOverride= require('method-override');
const morgan = require('morgan');
const session = require('express-session');

// const path = require('path');

const isSignedIn = require('./middleware/is-signed-in');
const passUsertoView = require('./middleware/pass-user-to-view');

const authController = require('./controllers/auth.js');
const eventsController = require('./controllers/events.js');

const port = process.env.PORT ? process.env.PORT : '3000'

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected on MongoDB ${mongoose.connection.name}.`);
});

// const _____ = require('./models/____.ejs)

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
    session ({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }),
);

// css: app.use(express.static(path.join(__dirname, 'public')))

app.use(passUsertoView);

app.get('/', async (req, res) => {
    if (req.session.user) {
        res.redirect(`/users/${req.session.user._id}/events`)
    } else {
        res.render('index.ejs');
    };
});

app.use('/auth', authController);

app.use(isSignedIn);

app.use('/users/:userId/events', eventsController)

app.listen(port, () => {
    console.log(`Mai Teams is ready on port ${port}!`);
});