const { Schema, model } = require('mongoose')

const zapatoSchema = new Schema({
	marca: {type: String, required: true},
	talla: {type: Number, required: true},
	tipo: {type: String, required: true},
	precio: {type: Number, required: true},
	cantidad: {type: Number, required: true},

}, {
	timestamps: true,
	versionKey: false

})

module.exports = model('Zapato', zapatoSchema);
