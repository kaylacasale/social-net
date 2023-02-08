//* Run npm install mongodb and require mongodb and MongoClient class
const { connect, connection } = require('mongoose');

// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally

// Wrap Mongoose around local connection to MongoDB
// Connection string to local instance of MongoDB including database name + //* '/db_name' = socialNetDB
const connectionString =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetDB';

// Defines connection between app and MongoDB instance
connect(connectionString, {
    //  options passed to turn off deprication warnings (Sets connection string parser and Server Discover and Monitoring engine to true and avoids warning)
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export connection
module.exports = connection;