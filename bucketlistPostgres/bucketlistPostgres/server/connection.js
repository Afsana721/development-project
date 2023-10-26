// dependancies imported
const {Client}=require('pg')

require('dotenv').config()

const debug=require('debug')('connection.js')

// SPREAD OUT THE .env
//POSTGRESS CONNECTION
const {PG_HOST, PG_USER, PG_PW, PG_PORT, PG_DB } = process.env

// connection object
const connectObject = {
    user: PG_USER,
    password: PG_PW,
    port: PG_PORT,
    database: PG_DB,
    host: PG_HOST
}
debug(connectObject)


//get a connection handle object
const conn  = new Client(connectObject)

//export it
module.exports = conn;