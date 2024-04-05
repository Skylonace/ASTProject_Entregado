const { Router } = require('express')
const router = Router()

const zapatosCtrl = require('../controllers/zapatos.controller.js')

router.get('/',zapatosCtrl.getZapatos);

router.get('/marca/:marca',zapatosCtrl.getZapatosByMarca);

router.get('/talla/:talla',zapatosCtrl.getZapatosByTalla);

router.get('/tipo/:tipo',zapatosCtrl.getZapatosByTipo);

router.get('/cantidad/:cantidad',zapatosCtrl.getZapatosByCantidad);

router.post('/',zapatosCtrl.createZapato);

router.get('/:id',zapatosCtrl.getZapato);

router.put('/:id',zapatosCtrl.editZapato);

router.delete('/:id',zapatosCtrl.deleteZapato);


module.exports = router
