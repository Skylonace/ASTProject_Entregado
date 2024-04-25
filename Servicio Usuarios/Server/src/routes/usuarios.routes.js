const { Router } = require('express')
const router = Router()

const usuariosCtrl = require('../controllers/usuarios.controller.js')

router.get('/:id',usuariosCtrl.getUsuarios);

router.get('/clase/:id',usuariosCtrl.getUsuarioClase);

router.get('/claseAll/:clase/:id',usuariosCtrl.getUsuariosClase);

router.post('/',usuariosCtrl.createUsuario);

router.put('/:id',usuariosCtrl.editUsuario);

router.delete('/:id',usuariosCtrl.deleteUsuario);


module.exports = router
