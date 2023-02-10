// Require schema and model from mongoose
const { Schema, model, Types, Email } = require('mongoose');
//* message if user enters invalid email


// after installing mongoose-type-email to validate email input, require this npm package
// require('mongoose-type-email')
// Require Thought model and assign to variable
// const thoughtSchema = require('./Thought')

// Schema to create User model
// make sure ech object has username and mail
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        // email: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     validate: mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'
        // },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
        },
        // thoughts: [thoughtSchema],
        //* acts like foreign key to Thought model 
        thoughts: [
            {
                type: Schema.Types.ObjectId, //* need to push id to thoughts arr in user table 
                ref: 'Thought'
            }
        ]
    },
    {
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                // default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
            }

        ],
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
    return this.friends.length;
})
// intiialize our User model
const User = model('User', userSchema);

//* friends param needs to be an array of id
// User.create([
//     // { username: 'kaylacasale', email: 'kayla.casale@gmail.com', thoughts: 'tired', f

// ])
module.exports = User;