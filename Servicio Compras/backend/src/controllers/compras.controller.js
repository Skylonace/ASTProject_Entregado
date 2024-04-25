
const comprasCtrl = {}

const Compra = require('../models/Compra')
const Zapato = require('../models/Zapato')


function isForbidden(id) {
    if(id.toString().toLowerCase().charAt(0) == 'c') {
        return false;
    } else {
        return true;
    }
}

comprasCtrl.getZapatos = async (req, res) => {
    if(isForbidden(req.params.id)) {
        res.send({message: "Operación no permitida"});
        return;
    }
    const zapatos = await Zapato.find();
    res.send(zapatos);
};

comprasCtrl.searchZapatos = async (req, res) => {
    if(isForbidden(req.params.id)) {
        res.send({message: "Operación no permitida"});
        return;
    }
    try{
        if(req.params.param == "marca") {
            const zapato = await Zapato.find({marca : req.params.value});
            res.send(zapato);
        } else if(req.params.param == "tipo") {
            const zapato = await Zapato.find({tipo : req.params.value});
            res.send(zapato);
        } else if(req.params.param == "talla") {
            const curTalla = int(req.params.value);
            const zapato = await Zapato.find({talla : curTalla});
            res.send(zapato);
        } else if(req.params.param == "id") {
            console.log(req.params.value);
            const zapato = await Zapato.find({_id : req.params.value});
            res.send(zapato);
        } else {
            res.send([])
        }
    } catch(error) {
        console.log(error)
        res.send([])
    }
};

comprasCtrl.getCompras = async(req, res) => {
    if(isForbidden(req.params.id)) {
        res.send({message: "Operación no permitida"});
        return;
    }
    const compras = await Compra.find({id_cliente: req.params.id})
    res.send(compras);
}

comprasCtrl.searchCompras = async(req, res) => {
    try{
        if(isForbidden(req.params.id)) {
            res.send({message: "Operación no permitida"});
            return;
        }
        if(req.params.param == "id_articulo") {
            const compras = await Compra.find({id_articulo : req.params.value});
            res.send(compras);
        } else if(req.params.param == "id_cliente") {
            const compras = await Compra.find({id_cliente : req.params.value});
            res.send(compras);
        } else if(req.params.param == "nombre") {
            const compras = await Compra.find({nombre : req.params.value});
            res.send(compras);
        } else if(req.params.param == "direccion") {
            const compras = await Compra.find({direccion : req.params.value});
            res.send(compras);
        } else if(req.params.param == "id") {
            console.log(req.params.value);
            const compras = await Compra.find({_id : req.params.value});
            res.send(compras);
        } else {
            res.send([])
        }
    } catch(error) {
        console.log(error)
        res.send([])
    }
}

comprasCtrl.getCompra = async(req, res) => {
    if(isForbidden(req.params.id)) {
        res.send({message: "Operación no permitida"});
        return;
    }
    const compra = await Compra.findById(req.params.idCompra);
    res.send(compra);
}

comprasCtrl.createCompra = async(req, res) => {
    if(isForbidden(req.params.id)) {
        res.send({message: "Operación no permitida"});
        return;
    }
    const newCompra = new Compra(req.body);
    affectedProduct = await Zapato.findById(newCompra.id_articulo);
    if(affectedProduct.cantidad < newCompra.cantidad) {
        res.send({message: "Excessive quantity"});
        return;
    }
    affectedProduct.cantidad = affectedProduct.cantidad - newCompra.cantidad;
    await affectedProduct.save();
    await newCompra.save();
    res.send({message: "Compra created"})
}

comprasCtrl.updateCompra = async(req, res) => {
    if(isForbidden(req.params.id)) {
        res.send({message: "Operación no permitida"});
        return;
    }
    await Compra.findByIdAndUpdate(req.params.idCompra, req.body)
	res.send({message: "Compra updated"})
}

comprasCtrl.deleteCompra = async(req, res) => {
    if(isForbidden(req.params.id)) {
        res.send({message: "Operación no permitida"});
        return;
    }
    deletedCompra = await Compra.findByIdAndDelete(req.params.idCompra);
    affectedProduct = await Zapato.findById(deletedCompra.id_articulo);
    affectedProduct.cantidad = affectedProduct.cantidad + deletedCompra.cantidad
    await affectedProduct.save();
	res.send({message: "Compra deleted"})
}

comprasCtrl.getCompras
module.exports = comprasCtrl;
