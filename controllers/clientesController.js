const { validationResult } = require('express-validator');
const Cliente = require('../models/Cliente'); // Asegúrate de que la ruta sea correcta

const registrarCliente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, email } = req.body;

  console.log('Iniciando registro de cliente con los siguientes datos:', { nombre, email });

  try {
    console.log('Buscando cliente existente con email:', email);
    const clienteExistente = await Cliente.findOne({ where: { email } });

    if (clienteExistente) {
      console.log('Cliente ya existe con email:', email);
      return res.status(400).json({ msg: 'El cliente ya está registrado' });
    }

    console.log('Creando nuevo cliente con los datos:', { nombre, email });
    const nuevoCliente = await Cliente.create({ nombre, email });

    console.log('Cliente registrado exitosamente:', nuevoCliente);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error('Error al registrar el cliente:', error);
    res.status(500).json({ msg: 'Error del servidor', error });
  }
};

module.exports = { registrarCliente };