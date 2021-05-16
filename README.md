# Twitter API

### Required Softwares
1. Node v12
2. Npm v6
3. MySql 5.7

### Setting up the DB
- First create a .env file in the root directory. This file will hold the config values for the server
- which would look something like this:
``` 
# DB Configurations
HOST=localhost // DB host
DB_USER=avishek // DB user
DB_PASS=password // DB password
DB_DATABASE=test // Database name
PORT=3000 // Port in which the express server will listen to
SECRET_JWT=supersecret // This secret is used to sign JWT token
```

- Now run the following commands to install all the npm dependencies:
```
npm i
```
- Now run the sql commands in MySql, which are located inside `/src/db/dbSchema.sql`

- To start the server:
```
npm start
```

This should start the server. Now you'll see a log in the console which will tell which port the server is listening to
