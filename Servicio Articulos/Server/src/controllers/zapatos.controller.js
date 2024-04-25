const zapatoCtrl = {}
const http = require('http');

const Zapato = require('../models/Zapato')

zapatoCtrl.getZapatos = async (req,res) => {
	let response = await fetch('http://localhost:4100/api/usuarios/clase/'+req.params.idUsuario);
        let aux = await response.text();

			if(aux == 'Admin'){
				const zapatos = await Zapato.find()
				res.json(zapatos)
			}else{
				res.send()
			}

}

zapatoCtrl.createZapato = async (req,res) => {

	let response = await fetch('http://localhost:4100/api/usuarios/clase/'+req.params.idUsuario);
        let aux = await response.text();

		if(aux == 'Admin'){
			const newZapato = new Zapato(req.body);
			newZapato.save()
			res.json({status: 'Zapato Created'})
                }else{
                        res.send()
		}


}

zapatoCtrl.editZapato = async (req,res) => {

	 let response = await fetch('http://localhost:4100/api/usuarios/clase/'+req.params.idUsuario);
	 let aux = await response.text();
		if(aux == 'Admin'){
			await Zapato.findByIdAndUpdate(req.params.idZapato, req.body)
			res.json({status: 'Zapato Updated'})
                }else{
                       	res.send()
		}

}

zapatoCtrl.deleteZapato = async (req,res) => {
	let response = await fetch('http://localhost:4100/api/usuarios/clase/'+req.params.idUsuario);
	let aux = await response.text();
	if (aux == 'Admin'){
		await Zapato.findByIdAndDelete(req.params.idZapato);
	}
	res.send();
}

zapatoCtrl.getZapato = async (req,res) => {

	let response = await fetch('http://localhost:4100/api/usuarios/clase/'+req.params.idUsuario);
        let aux = await response.text();

        if(aux == 'Admin'){
		const zapato = await Zapato.find({'_id' : req.params.idZapato});
		res.send(zapato)
        }else{
    	     	res.send()
	}

}

zapatoCtrl.getZapatosByMarca = async (req,res) => {

	let response = await fetch('http://localhost:4100/api/usuarios/clase/'+req.params.idUsuario);
        let aux = await response.text();

        if(aux == 'Admin'){
		const zapato = await Zapato.find({ 'marca': req.params.marca });
		res.send(zapato)
        }else{
      	        res.send()
	}

}

zapatoCtrl.getZapatosByTalla = async (req,res) => {

	let response = await fetch('http://localhost:4100/api/usuarios/clase/'+req.params.idUsuario);
        let aux = await response.text();

        if(aux == 'Admin'){
                const zapato = await Zapato.find({ 'talla': req.params.talla });
                res.send(zapato)
        }else{
                res.send()
        }

}

zapatoCtrl.getZapatosByTipo = async (req,res) => {

	let response = await fetch('http://localhost:4100/api/usuarios/clase/'+req.params.idUsuario);
        let aux = await response.text();

        if(aux == 'Admin'){
                const zapato = await Zapato.find({ 'tipo': req.params.tipo });
                res.send(zapato)
        }else{
                res.send()
        }

}

zapatoCtrl.getZapatosByCantidad = async (req,res) => {

	let response = await fetch('http://localhost:4100/api/usuarios/clase/'+req.params.idUsuario);
        let aux = await response.text();

        if(aux == 'Admin'){
                const zapato = await Zapato.find({ 'cantidad': req.params.cantidad });
                res.send(zapato)
        }else{
                res.send()
        }

}

module.exports = zapatoCtrl;
