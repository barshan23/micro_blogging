const express = require("express");
const dotenv = require('dotenv');
const Router = require('./router');

// Init express
const app = express();

// Init environment
dotenv.config();

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());

const port = Number(process.env.PORT || 1333);

// Register all the routes
Router.registerRoutes(app);

// 404 error
app.all('*', (req, res, next) => {
    res.status(404).send({
      name: 'notFound',
      message: 'Requested path not found'
    })
});

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;