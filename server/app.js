require('rootpath')();
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('helpers/error-handler');

const app = express();
const { PORT } = process.env ?? 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./controllers/users'));

// global error handler
app.use(errorHandler);

// start server

app.listen(process.env.PORT ?? 3001, () => { console.log(`Server started sucessfully at port ${PORT}`); }); 
