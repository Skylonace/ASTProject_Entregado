const { Router } = require('express')
const router = Router()

const zapatosCtrl = require('../controllers/zapatos.controller.js')

router.get('/:idUsuario',zapatosCtrl.getZapatos);

router.get('/marca/:marca/:idUsuario',zapatosCtrl.getZapatosByMarca);

router.get('/talla/:talla/:idUsuario',zapatosCtrl.getZapatosByTalla);

router.get('/tipo/:tipo/:idUsuario',zapatosCtrl.getZapatosByTipo);

router.get('/cantidad/:cantidad/:idUsuario',zapatosCtrl.getZapatosByCantidad);

router.post('/:idUsuario',zapatosCtrl.createZapato);

router.get('/:idZapato/:idUsuario',zapatosCtrl.getZapato);

router.put('/:idZapato/:idUsuario',zapatosCtrl.editZapato);

router.delete('/:idZapato/:idUsuario',zapatosCtrl.deleteZapato);


module.exports = router
