const { Schema, model } = require('mongoose')

const compraSchema = new Schema({
	id_articulo: {type: String, required: true},
	id_cliente: {type: String, required: true},
	cantidad: {type: Number, required: true},
	nombre: {type: String, required: true},
	direccion: {type: String, required: true},

}, {
	timestamps: true,
	versionKey: false,
	collection: "compras"
})

module.exports = model('Compra', compraSchema);
