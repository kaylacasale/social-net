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
    // get all users through GET rwquest to url: '/api/users'
    // no GET request body required
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
    // no GET request boyd required
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

    // create a user through POST route to '/api/users' (will create a unique Mongo-created userId)
    // POST request body requires: 1) username 2) email (associated with user)
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //* example POST request body below:
    // {
    //     "username": "lernantino",
    //     "email": "lernantino@gmail.com"
    //   }

    // update a user by id (PUT route to '/api/users/:userId')
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
    //* example PUT request body:
    // {
    //     "username": "The Eye of Sauron",
    //     "email": "meta@facebook.com"
    // }

    // delete a user by id (DELETE route to '/api/users/:userId)
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User find with this ID!" })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: "User and Thought deleted!" }))
            .catch((err) => res.status(500).json(err));
    },


    // /api/users/:userId/friends/:friendId
    // add a friend through POST route to '/api/users/:userId/friends/:friendId' where friendId is another user's userId
    // request body requires: 1) userId we are adding a friend to 2) friendId which is the userId of the friend that will be added to the user's friends array
    addFriend(req, res) {
        console.log('You are adding a friend!');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
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
    },
    //* first example POST request body to add a friend by '/api/users/63e70757d8f29e21904ebd1a/friends/63ead9cc23a5f12b4f3b801f': 
    //* no request body needed (can add to visualize userId and friendId in console)
    // {
    //     "userId": "63e70757d8f29e21904ebd1a",
    //     "friendId": "63ead9cc23a5f12b4f3b801f"
    // }
    //* second example POST request body to add another friend (push into friends array of same user) by '/api/users/63e70757d8f29e21904ebd1a/friends/63e62fca04c0a07cb1741ce2':
    // {
    //     "userId": "63e70757d8f29e21904ebd1a",
    //     "friendId": "63e62fca04c0a07cb1741ce2"
    // }
    // delete a friend of a user by '/api/users/:userId/friends/:friendId'
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(
                (user) =>
                    !user
                        ? res.status(404).json({ message: "No User find with this ID!" })
                        : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
}
//* example DELETE request url: '/api/users/63e70757d8f29e21904ebd1a/friends/63e70757d8f29e21904ebd1a'
//* no request body

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