
const zapatoCtrl = {}

const Zapato = require('../models/Zapato')

zapatoCtrl.getZapatos = async (req,res) => {
	const zapatos = await Zapato.find()
	res.json(zapatos)
}

zapatoCtrl.createZapato = async (req,res) => {
	const newZapato = new Zapato(req.body)
	await	newZapato.save()
	res.send({message: "Zapato created"})

}

zapatoCtrl.editZapato = async (req,res) => {
	await Zapato.findByIdAndUpdate(req.params.id, req.body)
	res.json({status: 'Zapato Updated'})

}

zapatoCtrl.deleteZapato = async (req,res) => {
	await Zapato.findByIdAndDelete(req.params.id)
	res.json({status: 'Zapato Deleted'})
}

zapatoCtrl.getZapato = async (req,res) => {
	const zapato = await Zapato.find({'_id' : req.params.id});
	res.send(zapato)
}

zapatoCtrl.getZapatosByMarca = async (req,res) => {
	const zapato = await Zapato.find({ 'marca': req.params.marca });
	res.send(zapato)
}

zapatoCtrl.getZapatosByTalla = async (req,res) => {
        const zapato = await Zapato.find({ 'talla': req.params.talla });
        res.send(zapato)
}

zapatoCtrl.getZapatosByTipo = async (req,res) => {
        const zapato = await Zapato.find({ 'tipo': req.params.tipo });
        res.send(zapato)
}

zapatoCtrl.getZapatosByCantidad = async (req,res) => {
        const zapato = await Zapato.find({ 'cantidad': req.params.cantidad });
        res.send(zapato)
}

module.exports = zapatoCtrl;
