const { Router } = require('express')
const router = Router()

const comprasCtrl = require('../controllers/compras.controller.js')

router.get('/zapatos/:id',comprasCtrl.getZapatos);
router.get('/zapatos/:id/:param/:value',comprasCtrl.searchZapatos);
router.get('/compras/:id',comprasCtrl.getCompras);
router.get('/compras/:id/:param/:value',comprasCtrl.searchCompras);
router.get('/compras/:id/:idCompra',comprasCtrl.getCompra);
router.post('/compras/:id',comprasCtrl.createCompra)
router.put('/compras/:id/:idCompra',comprasCtrl.updateCompra);
router.delete('/compras/:id/:idCompra',comprasCtrl.deleteCompra);

module.exports = router
