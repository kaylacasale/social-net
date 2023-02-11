

const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');

// '/api/thoughts' to GET all thoughts and POST new thought
router.route('/').get(getThoughts).post(createThought)

// '/api/thoughts/:thoughtId' to GET one, PUT, and DELETE a thought by id
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

module.exports = router;