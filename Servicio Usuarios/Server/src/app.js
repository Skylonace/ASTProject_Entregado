const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

//environment varibles
app.set('port', process.env.PORT || 4100);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use("/api/usuarios",require('./routes/usuarios.routes'))

module.exports = app;
