# What's an API ?

    1. ## An interface
    2.    has a set of rules that allow interaction with other services.
    3.    e.g. Switchboard circuit breaker
    4.    e.g. Data hosted on a remote server.

# What's consuming an API ? 

    1. where you are the client (or the customer)
    2. the provider/developer of the api decides on the rules
    3. the provider decides on the format of the data (JSON, XML, text or something)
    4. choose which of CRUD are you gonna use

# What's serving an API ?

    1. where your code is the server (provides the service, e.g. data for the app)
    2. you make all choices about quantity and format of the service
    3. if it's a web api, you usually provide CRUD

       C - create (using POST request to the endpoint http://localhost:3001/bucket)
       R - read   (using GET request to /bucket or /bucket/:id)
       U - update (using PUT request to /bucket/:id)
       D - delete (using DELETE request to /bucket/:id)
       etc. 
    4. provider chooses the rules of access (e.g. protocol, http, authentication)

# What are the types of data APIs?

    1. Architecture e.g. REST, SOAP ...

       Re - representational 
       S  - state
       T  - transfer

# High level Objective:

    1. Build a RESTful API based on NodeJS / ExpressJS
    2. Build a Full Stack Bucket List App:
       - Connect REST api server to the client made with either jQuery and React
       - Connect the API to MongoDB

# What after that?

    1. Build code to test our API
    2. Learn how to debug our API
    3. Learn how to deploy our API to Heroku and AWS
    4. Learn how to secure it with authentication and authorization (auth)

# Trivia

    What is a Microservice?

    - it's a web resident service (e.g. provides data) that does a single thing

# Connecting to the db
# MongoDB

   1. import mongoose              done
   2. connect with the mongodb     done
   3. define mongoose schema's
   4. create mongoose model
   5. add in the mongoose stuff to all the CRUD routes



# Changes to go from MongoDB to PostGres
1. Removed Node modules
2. Copy the mongod version fo buckelist to a new working folder
3. Remove mongoose from package.json
4. Delete package-lock.json
5. Remove all functinoality realted to mongoose from server/index.js
6. Comment out all routes except the READ route
7. Establish connection from server/server.js
    1. get Client function from pg