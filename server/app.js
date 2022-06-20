require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const { PORT } = process.env ?? 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static('public'));


app.listen(process.env.PORT ?? 3001, () => { console.log(`Server started sucessfully at port ${PORT}`); }); 
