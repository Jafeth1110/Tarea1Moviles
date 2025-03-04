const { Cliente } = require('../models/Cliente');

const registrarCliente = async (req, res) => {
  const { nombre, email } = req.body;

  try {
    const clienteExistente = await Cliente.findOne({ where: { email } });
    if (clienteExistente) {
      return res.status(400).json({ error: 'El cliente ya existe' });
    }

    const nuevoCliente = await Cliente.create({ nombre, email });
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el cliente' });
  }
};

module.exports = { registrarCliente };