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

    // get a single user by ID (GET route to '/api/users/:userId)
    getSingleUser({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate("thoughts")
            .populate("friends")
            .select("-_v")
            // .populate({ path: 'thoughts', select: '-_v' })
            // .populate({ path: 'friends', select: '-_v' })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json(user)

            )
            .catch((err) => res.status(500).json(err))
    },
    //* example POST request body below:
    // {
    //     "username": "lernantino",
    //     "email": "lernantino@gmail.com"
    //   }
    //create a user (POST route to '/api/users')
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // update a user (PUT route to '/api/users/:userId')
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with this ID! :(" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },



    // add a friend (POST route to '/api/users/:userId')
    addFriend(req, res) {
        console.log('You are adding a friend!');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID! :(' })
                    : res.json(student)
            )
            .catch((err) => res.status(500).json(err))
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