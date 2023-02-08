//* require mongoose's ObjectId data type for friendCount (friend array in User model)
const { ObjectId } = require('mongoose').Types;

// require User and Thought models
const { User, Thought } = require('../models');

//* aggregate function to get number of friends for user (friendCount)
const friendCount = async () =>
    User.aggregate()
        .count('friendCount')
        .then((numberOfFriends) => numberOfFriends);

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    friendCount: await friendCount(),
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    }
}