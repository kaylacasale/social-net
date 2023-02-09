const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users } = require('./data')
const { thoughts } = require('./data')
const reactions = require('./data')


connection.once('open', async () => {
    // Delete the entries in the collection
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Empty arrays for randomly generated posts and tags
    //* these are used to push model objects into from seed data
    // const users = []; // just push
    // const thoughts = []; // use for loop to push into each users or forEach(?)
    // const reactions = [];
    // const makeUser = (username, email, friends) => {
    //     users.push({
    //         username: "kayla",
    //         email: "kayla.casale@gmail.com",
    //         thoughts: "I am here!",
    //         friends: 5
    //     })
    // }



    // for (let i = 0; i < 20; i++) {
    //     thoughts.push({
    //         thoughts

    //     })
    // }


    await User.collection.insertMany(users);

    // users.forEach(() => make)

    await Thought.collection.insertMany(thoughts)

    // Thought.create(
    //     { thoughtText: 'hmmm', username: 'kk', reactions: reactions }
    // )

    // User.collection.insertOne({
    //     username: "siena",
    //     email: "siena.casale@gmail.com",
    //     thoughts: [...thoughts]
    // })
    // Thought.collection.insertOne({
    //     thoughtText: "hiii",
    //     username: "siena",
    //     reactions: 

    // })

    // Thought.create(
    //     {}
    // )
    console.table(users);
    console.table(users, ['username', 'email', 'thoughts']);
    console.table(thoughts, ['thoughtText', 'username'])
    console.timeEnd('seeding');
    process.exit(0);
})
// Import functions for seed data

// const { getRandomIndex, getRandomUser, getRandomThought, getRandomText } = require('./data')


// // Start the seeding runtime timer
// console.time('seeding');

// // Creates a connection to mongodb
// connection.once('open', async () => {
//     // Delete the entries in the collection
//     await User.deleteMany({});
//     await Thought.deleteMany({});

//     // Empty arrays for randomly generated posts and tags
//     const users = [];
//     const thoughts = [];

//     // function to make a user object and pish it into the users array
//     const makeUser = (friends) => {
//         users.push({
//             username,
//             thoughts: [thoughts[getRandomIndex(thoughts)]._id],
//             friends,
//         })
//     }
//     // Create 20 random thought and push them into the thoughtd array
//     for (let i = 0; i < 20; i++) {
//         const thoughtText = getRandomText();

//         thoughts.push({
//             thoughtText,
//             username: thoughtText
//         })
//     }

//     // wait for the thoughts to be inserted into the db
//     await Thought.collection.insertMany(thoughts);

//     // for each of the thoughts that exist, make a random user 
//     thoughts.forEach(() => makeThought(getRandomUser()));

