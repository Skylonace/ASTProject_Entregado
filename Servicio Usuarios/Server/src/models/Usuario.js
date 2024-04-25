const { Schema, model } = require('mongoose')

const usuarioSchema = new Schema({
	clase: {type: String, required: true}
}, {
	timestamps: true,
	versionKey: false

})

module.exports = model('Usuario', usuarioSchema);
