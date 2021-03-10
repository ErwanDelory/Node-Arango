const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// Get some controllers (actions)
const routes = require('./app/routes/routes');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors({ credentials: true, origin: true }));

// Create HTTP server.
const server = http.createServer(app);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', routes);

const port = process.env.PORT || '3000';
app.set('port', port);

server.listen(port, function () {
  console.log(`Server up on port: ${port}`);
});
