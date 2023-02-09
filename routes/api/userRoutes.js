const router = require('express').Router();
const {
    getUsers,
} = require('../../controllers/userController');

//*     '/api/users'
// can add post route in same line as get
router.route('/').get(getUsers)

module.exports = router;