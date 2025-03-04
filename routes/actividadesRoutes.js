const express = require('express');
const { registrarActividad, consultarActividad } = require('../controllers/actividadesController');
const router = express.Router();

router.post('/actividades', registrarActividad);
router.get('/actividades/:codigo', consultarActividad);

module.exports = router;