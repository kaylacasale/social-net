// const connection = require('../config/connection');
// const { Course, Student, User } = require('../models');
// const { getRandomFriends } = require('./data');

// connection.on('error', (err) => err);

// connection.once('open', async () => {
//     console.log('connected');

//     // drop existing users
//     await User.deleteMany({});

//     const users = [];

//     for (let i = 0; i < 30; i++) {
//         // get some random friend objects using a helper function imported from ./data
//         // allows us to backtrack to for loops (traditional vanilla)
//         const freinds = getRandomFriends(30);
//         const username = getRandomUsername();
//         const email = getRandomEmail();
//     }
const users =
    [{
        "username": "kayla",
        "email": "kayla.casale@gmail.com",
        "thoughts": [],
        "friends": [],
    }]

const thoughts =
    [{
        "thoughtText": "I like when people are nice!",
        "username": "kaylacasale"
    }]


module.exports = { users, thoughts }

