const express = require('express');
const { registrarCliente } = require('../controllers/clientesController');
const router = express.Router();

router.post('/clientes', registrarCliente);

module.exports = router;