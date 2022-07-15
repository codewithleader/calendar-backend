const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const port = process.env.PORT;

/* Creating an instance of the express server. */
const app = express();

/* Database connection */
dbConnection();

/* CORS: Allowing the server to accept requests from other domains. */
app.use(cors());

/* Public directory: Telling the server to use the public folder as the root folder. */
app.use(express.static('public'));

/* Reading and Parsing the Body: Telling the server to parse the body of the request into JSON. */
app.use(express.json());

/**
 ** Routes
 */

/* Authentication route */
app.use('/api/auth', require('./routes/auth'));

/* Events route. */
app.use('/api/events', require('./routes/events'));

/* Listening for a request on the port that we have defined. */
app.listen(port, () => {
  console.log('Server is running on port:', port);
});
