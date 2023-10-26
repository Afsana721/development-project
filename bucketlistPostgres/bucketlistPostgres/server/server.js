// dependancies imported
const express = require("express");
const logger = require("morgan");

require("dotenv").config();
require("./connection");
const debug = require("debug")("server");
const conn = require("./connection");

// create an app object
const app = express();

// SPREAD OUT THE .env
const { SERVER_PORT } = process.env;
debug(SERVER_PORT);

// port
const PORT = SERVER_PORT || 3001;

// MIDDLEWARES
//   logger
app.use(logger(process.env.NODE_ENV || "dev"));
//   body parsers for x-www-form-urlencoded and json
app.use(express.urlencoded({ extended: true })); // data format of key:value
// e.g. description=Feed+a+gorilla&isComplete=false
app.use(
  express.json({
    // represents the enhanced parser library
    extended: true,
  })
); // e.g. '{"description": "Feed a gorilla", "isComplete: false"}'

// expose the client folder as a web root (the root location for a website)
app.use(express.static("./../client"));

//connect ot the db here
conn
  .connect()
  .then(function () {
    debug("connected to pg");
  })
  .catch(function (err) {});

const bucketlistArray = [
  { id: 0, description: "Learn Mocha!", isComplete: false }, // index is 0
  { id: 2, description: "Learn SQL!!!", isComplete: false }, // index is 1
  { id: 3, description: "Learn MongoDB!!", isComplete: true }, // index is 2
];

const user_id = 2;
const username = "edp";

// READ or GET - bucket route - send all items back
app.get("/bucket", (req, res) => {
  const q = `SELECT item_id as "id",
    description,
    user_id,
    is_complete as "isComplete",
    extract(epoch from created_timestamp) as created_timestamp
FROM BUCKETLIST.ITEMS
WHERE user_id= ${user_id}`;

  conn.query(q)
    .then(function (data) {
      // debug(data);

      console.log(data.rows)
      res.json(data.rows);
    })
    .catch(function (err) {
      console.log(err);
      res.end();
    });
});

// // POST-
// // TODO: Hook it up to the db
// app.get('/bucket/:id', (req, res) => {
//     // get the id of the item being requested
//     let bucketId = parseInt(req.params.id);

//     // did the client send me a numeric id???
//     if(!bucketId || typeof bucketId !== 'number') {
//         res.status(400).json("A numeric id is required in the request")
//     }

//     // find, findIndex, filter, forEach, for loop may be used
//     // find reference to the item object in the array or db
//     let foundItem1 = bucketlistArray.find(item => {
//         return item.id == bucketId
//     })

//     // do we have an item with that id?
//     // TODO: what happens if the array somehow got other stuff
//     // TODO: how would it behave once we get something from a pg/mongo db
//     if(foundItem1) {
//         res.json(foundItem1)
//     } else {
//         // i need to send something back with a failure HTTP status header
//         res.status(404).json("The requested id does not exist")
//     }
// })

// // CREATE or POST a single item
// CREATE or POST a single item
app.post('/bucket', (req, res) => {
    let description = req.body.description;
    // inform the db
    // create a query template
    const q = `
        INSERT INTO bucketlist.items (user_id, description)
        VALUES (${user_id}, '${description}') 
        RETURNING 
            item_id as "id",
            item_id as "_id",
            description,
            is_complete as "isComplete",
            trunc(extract(epoch from created_timestamp)) as created_timstamp
    `
    conn.query(q)
    .then(function(data){
        // send the created object back to the client
        debug(data);
        res.json(data.rows[0])
    })
    .catch(function(err){
        // tell me if there's an error
        console.log('Error in the post route', err)
        // tell the client as well so they can inform the user appropriately
        res.json("An error occurred in the post route. Please try again later.")
    })
})

// PUT - UPDATE route for a specific id
// this toggles the isComplete property of the requested item
app.put('/bucket/:id', (req, res) => {
    // get the id of the item being requested
    let bucketId = req.params.id;
    const q = `
    update bucketlist.items set is_complete = not(is_complete)
    where user_id = '${user_id}' and item_id= '${bucketId}'
    RETURNING 
        item_id as "id",
        item_id as "_id",
        description,
        is_complete as "isComplete",
        trunc(extract(epoch from created_timestamp)) as created_timstamp`


    // 
    conn.query(q)
    .then(function(data){
        res.json(data.rows) })
    .then(function(returnedStuff){
        res.json(returnedStuff)              // promise is resolved
    })
    .catch(function(err){
        console.log(err)
        res.json("There was an error in the update on the server")
    })
})

// DELETE
app.delete('/bucket/:id', (req, res) => {
    // PASS ID TO BUCKETID
    let bucketId = req.params.id
  
  //PG DELETE STATEMENT
    const q = `
   delete from bucketlist.items where user_id = ${user_id} and item_id= ${bucketId}
    RETURNING 
        item_id as "id",
        item_id as "_id",
        description,
        is_complete as "isComplete",
        trunc(extract(epoch from created_timestamp)) as created_timstamp`


    //PERFORM ACTION ON DATABASE
    conn.query(q)
    .then(function(data){
        res.json(data.rows)  //return the row
    })
    .catch(err => {
        console.log(err)
        res.status(400).send('There was an error on delete')
    })
})


//SERVER PORT listener
app.listen(PORT, () => {
  debug(`Server is running on port ${PORT}`);
});
