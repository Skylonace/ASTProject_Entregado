const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

//environment varibles
app.set('port', process.env.PORT || 4700);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use("/",require('./routes/compras.routes'))

module.exports = app;
