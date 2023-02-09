//* once installed, require express for our server
const express = require('express');
//* require config/connection to mongo/mongoose
const db = require('./config/connection');
//* require routes 
const routes = require('./routes');

const cwd = process.cwd();

const PORT = process.env.port || 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('/Social-Net/')
    ? cwd.split('/01-Activities/')[1]
    : cwd;

//* middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // to send JSON objects
app.use(routes);

//* once the connection is established, start the server and return this status
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for ${activity} running on port ${PORT}!`);
    });
});
