const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // get single thought by thoughtId  in url through GET request to '/api/thoughts/:thoughtId' 
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No Thought find with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //* example GET request url: '/api/thoughts/63eacb5c3ac467446c1ee0c1'

    // create a thought through  POST request to route '/api/thoughts' (will push the Mongo-created thoughtId to the associated user's thoughts array field)
    // POST request body requires: 1) thoughtText 2) username 3) userId
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No User found with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    //* POST request path to create a thought by userId associated with a user: '/api/thoughts'
    //* example data for POST request body:
    // {
    //     "thoughtText": "Here's a cool thought...",
    //     "username": "lernantino",
    //     "userId": "5edff358a0fcb779aa7b118b"
    //   }
    // create a thought associated with a user by id

    // update a thought by id through route '/api/thoughts/:thoughtId'
    // PUT request body can have: 1) thoughtText 2) username 3) userId [to change thoughtText in thought, username associated with thought, and/or thoughtId stored in user's thoughts array]
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No thought find with this ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //* example PUT request to update a thought with thoughtId in url and userId in request body (to associate thought with a user): '/api/thoughts/63eacb5c3ac467446c1ee0c1'
    //* example PUT request body: 
    // {
    //     "thoughtText": "I want sushi",
    //     "username": "lernantino",
    //     "userId": "63e61e92de0dab5fc647c904"
    //   }


    // delete a thought by id through '/api/thoughts/:thoughtId' 
    // no DELETE request body required
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID!" })
                    : User.findOneAndUpdate(
                        { thoughts: req.prams.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Thought deleted, but no user found" })
                    : res.json({ message: "Thought successfully deleted" })
            )
            .catch((err) =>
                res.status(500).json(err))
    },
    //* example path to delete a thought by thoughtId in url (will delete a thought associated with a user): '/api/thoughts/63eacb5c3ac467446c1ee0c1'
    //* no DELETE request body

    // create a reaction by thoughtId through '/api/thoughts/:thoughtId/reactions
    // request body requires: 1) reactionBody 2) username
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //* example path to create a reaction associated with a thought (will add reaction username, body, and reactionId to reactions array in thought object): 'http://localhost:3001/api/thoughts/63e62916511a1e89ea66830a/reactions'
    //* example POST request body: 
    // {
    //     "reactionBody": "I am full!",
    //     "username": "lernatino"
    //    }

    // delete a reaciton by reactionId through '/api/thoughts/:thoughtId/reactions/:reactionId
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
    //* example DELETE route path: 'http://localhost:3001/api/thoughts/63e62916511a1e89ea66830a/reactions/63eac362ed39738432a99ae1'
    //* no request body
}