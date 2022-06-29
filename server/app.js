/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
require('rootpath')();
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('helpers/error-handler.js');
const path = require('path');

const app = express();
const { PORT } = process.env ?? 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(cors());

app.use(fileUpload());
// app.use(cors({
//   credentials: true,
//   origin: ['https://localhost:3000', 'https://localhost:3001']
// }));

// api routes
app.use('/users', require('./controllers/users'));
app.use('/products', require('./controllers/products'));
app.use('/orders', require('./controllers/orders'));

// app.get('/products/search', async (req, res) => {
//   const products = await getProducts(req.query);
//   res.json(products)
// })

// global error handler
app.use(errorHandler);

// start server

app.listen(process.env.PORT ?? 3001, () => {
  console.log(`Server started sucessfully at port ${PORT} <3`);
});
