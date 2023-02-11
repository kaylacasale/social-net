const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    addFriend,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

//*     '/api/users'
// can add post route in same line as get
// GET all users, POST one new user
router
    .route('/')
    .get(getUsers)
    .post(createUser)

//*     '/api/users/:userId'
// GET one user by id
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)
//*     '/api/users/:userId/friends/:friendId'
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)

module.exports = router;