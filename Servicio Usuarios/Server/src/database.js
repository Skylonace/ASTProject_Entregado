const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean-usuarios')
	.then((db) => console.log("db is connected"))
	.catch((err) => console.error(err));
