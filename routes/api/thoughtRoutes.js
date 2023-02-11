

const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction
} = require('../../controllers/thoughtController');

// '/api/thoughts' to GET all thoughts and POST new thought
router.route('/').get(getThoughts).post(createThought)

// '/api/thoughts/:thoughtId' to GET one, PUT, and DELETE a thought by id
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

// '/api/thoughts/:thoughtId/reactions to POST new reaction
router.route('/:thoughtId/reactions')
    .post(createReaction)
module.exports = router;