
const comprasCtrl = {}

const Compra = require('../models/Compra')
const Zapato = require('../models/Zapato')

comprasCtrl.getZapatos = async (req, res) => {
    const zapatos = await Zapato.find();
    res.send(zapatos);
};

comprasCtrl.searchZapatos = async (req, res) => {
    if(req.params.param == "marca") {
        const zapato = await Zapato.find({marca : req.params.value});
        res.send(zapato);
    } else if(req.params.param == "tipo") {
        const zapato = await Zapato.find({tipo : req.params.value});
        res.send(zapato);
    } else if(req.params.param == "talla") {
        const zapato = await Zapato.find({talla : req.params.value});
        res.send(zapato);
    } else if(req.params.param == "id") {
        const zapato = await Zapato.findById(req.params.value);
        res.send(zapato);
    } else {
        res.send({message: "Categoria no permitida"})
    }
};

function getUserType(id) {
    if(id.toString().toLowerCase().charAt(0) == 'a') {
        return 'administrador';
    } else if(id.toString().toLowerCase().charAt(0) == 'c') {
        return 'cliente';
    } else {
        return null;
    }
}

comprasCtrl.getCompras = async(req, res) => {
    const userType = getUserType(req.params.id);
    if(userType == "administrador") {
        const compras = await Compra.find();
        res.send(compras);
    } else if(userType == "cliente") {
        const compras = await Compra.find({id_cliente: req.params.id})
        res.send(compras);
    } else {
        res.send({message: "Usuario no existe"})
    }
}

comprasCtrl.searchCompras = async(req, res) => {
    const userType = getUserType(req.params.id);
    if(userType == "administrador") {
        if(req.params.param == "id_articulo") {
            const compras = await Compra.find({id_articulo : req.params.value});
            res.send(compra);
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
            const compras = await Compra.findById(req.params.value);
            res.send(compras);
        } else {
            res.send({message: "Categoria no permitida"})
        }
    } else if(userType == "cliente") {
        if(req.params.param == "id_articulo") {
            const compras = await Compra.find({id_articulo : req.params.value,
                                                id_cliente : req.params.id});
            res.send(compra);
        } else if(req.params.param == "id_cliente") {
            if(req.params.value == req.params.id) {
                const compras = await Compra.find({id_cliente : req.params.value});
            } else {
                res.send({message: "Operacion no permitida"})
            }
            res.send(compras);
        } else if(req.params.param == "nombre") {
            const compras = await Compra.find({nombre : req.params.value,
                                                id_cliente : req.params.id});
            res.send(compras);
        } else if(req.params.param == "direccion") {
            const compras = await Compra.find({direccion : req.params.value,
                                            id_cliente : req.params.id});
            res.send(compras);
        } else if(req.params.param == "id") {
            const compras = await Compra.findById(req.params.value);
            if(compras.id_cliente == req.params.id) {
                res.send(compras);
            } else {
                res.send({message: "Operacion no permitida"})
            }
        } else {
            res.send({message: "Categoria no permitida"})
        }
    } else {
        res.send({message: "Usuario no existe"})
    }
}

comprasCtrl.getCompra = async(req, res) => {
    const userType = getUserType(req.params.id);
    if(userType == "administrador") {
        const compra = await Compra.findById(req.params.idCompra);
        res.send(compra);
    } else if(userType == "cliente") {
        const compra = await Compra.findById(req.params.idCompra);
        if(compra.id_cliente == req.params.id) {
            res.send(compra)
        } else {
            res.send({message: "Operacion no permitida"})
        }
    } else {
        res.send({message: "Usuario no existe"})
    }
}

comprasCtrl.getCompras
module.exports = comprasCtrl;
