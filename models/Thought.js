const { Schema, model, Types } = require('mongoose');
// import moment module to format the timestamp 
// const moment = require('moment')

//reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
            // default: Date.now,
            // get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

// thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            // default: Date.now,
            // get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

// array of objects
// make thoughts array and users array
// [{
//         "thoughtText": "this is my thougt",
//         "username": "Bryan",
//         "reactions": [
//             {
//                 "reactionBody": "Oh my!",
//                 "username": "username"
//             }
//         ]
//     }]

// get total count of friends
thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })

// create the User model using the UserSchema
const Thought = model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;

// thoughtSchema
//     .virtual('getThoughts')
//     // getter
//     .get(function () {
//         return this.thoughts.length;
//     });

