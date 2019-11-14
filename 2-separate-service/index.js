'use strict';

// Express
const express = require('express');
const redis = require('./lib/redis');

// Constants
const PORT = process.env.PORT || '8080';

// App
const app = express();
app.get('/', (req, res) => {
    res.send("It works!");
});

app.get('/create/:session_key', (req, res) => {
    const session_key = req.params.session_key;

    if (session_key === null) {
        res.status(400);
        res.send('No session key provided');
        return;
    }

    // Create Session
    console.log(`Creating session "${session_key}" ...`);

    var session = {
        'id': session_key,
        'timestamp': Date.now()
    };

    redis.create_session(session_key, session).then(function(object) {
        console.log(object);
        console.log(`Stored "${session_key}" in memory`);
        res.send(object);

    }).catch(function(err) {
        console.error(err);
        res.status(err.status);
        res.send(err);
    });
});

app.get('/get/:session_key', (req, res) => {
    const session_key = req.params.session_key;

    if (session_key === null) {
        res.status(400);
        res.send('No session key provided');
        return;
    }

    // Get Session
    console.log(`Getting session "${session_key}" ...`);

    redis.get_session(session_key).then(function(object) {
        console.log(object);
        console.log(`Obtained "${session_key}" in memory`);
        res.send(object !== null ? object : `No "${session_key}" object found in memory`);

    }).catch(function(err) {
        console.error(err);
        res.status(err.status);
        res.send(err);
    });
    
});

app.get('/delete/:session_key', (req, res) => {
    const session_key = req.params.session_key;

    if (session_key === null) {
        res.status(400);
        res.send('No session key provided');
        return;
    }

    // Delete Session
    console.log(`Deleting session "${session_key}" ...`);

    redis.delete_session(session_key).then(function(reply) {
        console.log(reply);
        console.log(`Deleted "${reply}" "${session_key}" objects from memory`);
        res.send(`Deleted "${reply}" "${session_key}" objects from memory`);

    }).catch(function(err) {
        console.error(err);
        res.status(err.status);
        res.send(err);
    });
});

app.listen(PORT);
console.log(`Running on ${PORT}`);