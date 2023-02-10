

const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought
} = require('../../controllers/thoughtController');

// '/api/thoughts' to GET all thoughts and POST new thought
router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId')
    .get(getSingleThought)

module.exports = router;