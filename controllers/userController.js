//* require mongoose's ObjectId data type for friendCount (friend array in User model)
// const { ObjectId } = require('mongoose').Types;

// require User and Thought models
const { User, Thought } = require('../models');

//* aggregate function to get number of friends for user (friendCount)
// const friendCount = async () =>
//     User.aggregate()
//         .count('friendCount')
//         .then((numberOfFriends) => numberOfFriends);

// aggreegate functions for getting the studentCount
module.exports = {
    // get all users
    getUsers(req, res) {
        User.find({})
            .then((user) => res.json(user))
            // .catch((err) => res.status(500).json(err))
            // populate users thoughts
            // .populate("thoughts")
            // .populate("friends")
            // .populate({ path: 'thoughts', select: '-__v' })
            // // populate user friends
            // .populate({ path: 'friends', select: '-__v' })
            // // .select('-__v')
            // .then(async (users) => {
            //     // const userObj = {
            //     //     users,
            //     //     friendCount
            //     // }
            //     console.log(userObj)
            //     return res.json(userObj)
            // })
            // // .then((users) => res.json(users))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            })
    },

    // get a single user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .populate("friends")
            // .populate({ path: 'thoughts', select: '-_v' })
            // .populate({ path: 'friends', select: '-_v' })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json(post)
            )
            .catch((err) => res.status(500).json(err))
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    }
}


  // get all users
    // getUsers(req, res) {
    //     User.find()
    //         .then(async (users) => {
    //             const userObj = {
    //                 users,
    //                 friendCount: await friendCount(),
    //             };
    //             return res.json(userObj);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             return res.status(500).json(err);
    //         });
    // }