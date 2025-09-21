const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

//***** THIS IS A INITIAL STAGE IMPLEMENTATION MORE WILL BE ADDED*****

// If you want to test the server. open terminal and enter following commands
//1. `cd server`
//2. `npm install`
//3. Set up `.env` with your DB credentials (optional)
//4. Run `node server.js`

//setting up express.js client
const app = express();
//local port 4000
const port = 4000; 

// we use body-parser for parsing json requests, this essentially put client requests into a accessable form instead of purely JSON
app.use(bodyParser.json());

// What this server is essentially doing
// listening to all JSON requests sent from clients
// parse the JSON requests and interact with database according to these requests


//postgres SQL congiguration
// use connection pool so that we don't reconnect to server everytime
// this is suggested by chatGPTo3
const pool = new Pool({
  user: 'postgres',       //when testing, replace with your PostgreSQL username
  host: 'localhost',
  database: 'weride',   //when testing, replace with your PostgreSQL database name
  password: 'qwerty2004',   //when testing, replace with your PostgreSQL password
  port: 5432,                  //when testing, default PostgreSQL port
});



// Import the rides router, injecting the pool
const ridesRouter = require('./routes/rides')(pool);
const myTripsRouter = require('./routes/mytrip')(pool);
const auth = require('./routes/authorization');
const userRouter = require('./routes/users')(pool);
// Mount the rides router at /rides
app.use('/rides', ridesRouter);
app.use('/users', userRouter);
app.use('/mytrips', auth, myTripsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
