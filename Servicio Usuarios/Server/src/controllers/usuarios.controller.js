
const usuarioCtrl = {}

const Usuario = require('../models/Usuario')

usuarioCtrl.getUsuarios = async (req,res) => {

	const aux = await Usuario.find({'_id' : req.params.id,'clase': 'Admin'});

        if(aux.length == 0){
                res.send();

        }else{
                const usuarios = await Usuario.find();
	        res.send(usuarios);

        }

}

usuarioCtrl.createUsuario = async (req,res) => {
	const newUsuario = new Usuario(req.body)
	await	newUsuario.save()
	res.send(newUsuario)

}

usuarioCtrl.editUsuario = async (req,res) => {
	await Usuario.findByIdAndUpdate(req.params.id, req.body)
	res.json({status: 'Usuario Updated'})

}

usuarioCtrl.deleteUsuario = async (req,res) => {
	await Usuario.findByIdAndDelete(req.params.id)
	res.json({status: 'Usuario Deleted'})
}

usuarioCtrl.getUsuarioClase = async (req,res) => {

	const aux1 = await Usuario.find({'_id' : req.params.id,'clase' : 'Admin'});

	const aux2 = await Usuario.find({'_id' : req.params.id,'clase' : 'Cliente'});
	const uno = "Admin";
	const dos = "Cliente";
	if(aux1.length == 0 && aux2.length == 0){

		res.send();
	}
	else if(aux1.length == 0){
		res.send(dos);
	}
	else{

		res.send(uno);
	}

}

usuarioCtrl.getUsuariosClase = async (req,res) => {

	const aux = await Usuario.find({'_id' : req.params.id,'clase': 'Admin'});

	if(aux.length == 0){
		res.send();
	}else{
		const usuario = await Usuario.find({'clase' : req.params.clase});
		res.send(usuario);
	}

}

module.exports = usuarioCtrl;
