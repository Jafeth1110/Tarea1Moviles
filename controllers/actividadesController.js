const { Cliente } = require('../models/Cliente');
const { Actividad } = require('../models/Actividad');

const generarCodigoUnico = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

const registrarActividad = async (req, res) => {
  const { nombre, fecha, clienteId } = req.body;

  try {
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const codigo = generarCodigoUnico();
    const nuevaActividad = await Actividad.create({ codigo, nombre, fecha, clienteId });
    res.status(201).json(nuevaActividad);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la actividad' });
  }
};

const consultarActividad = async (req, res) => {
  const { codigo } = req.params;

  try {
    const actividad = await Actividad.findOne({
      where: { codigo },
      include: [{ model: Cliente, as: 'cliente' }],
    });

    if (!actividad) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    res.status(200).json({
      nombre: actividad.nombre,
      cliente: actividad.cliente,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la actividad' });
  }
};

module.exports = { registrarActividad, consultarActividad };