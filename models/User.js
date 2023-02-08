// Require schema and model from mongoose
const { Schema, model } = require('mongoose');
//* message if user enters invalid email
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'

// after installing mongoose-type-email to validate email input, require this npm package
require('mongoose-type-email')
// Require Thought model and assign to variable
const thoughtSchema = require('./Thought')

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: mongoose.SchemaTypes.Email
        },
        thoughts: [thoughtSchema],
    },
    {
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    },
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

// create a virtual property called 'friendCount' that gets the amount of friends (also users) per user
userSchema.virtual('friendCount').get(function () {
    return this.users.length;
})
// intiialize our User model
const User = model('user', userSchema);

module.exports = User;