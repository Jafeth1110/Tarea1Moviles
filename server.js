const express = require('express');
const sequelize = require('./config/db');
const clientesRoutes = require('./routes/clientesRoutes');
const actividadesRoutes = require('./routes/actividadesRoutes');
const app = express();

app.use(express.json());

console.log('Inicializando servidor...');
console.log('Cargando middleware y rutas...');
app.use('/api', (req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api', clientesRoutes);
app.use('/api', actividadesRoutes);

const PORT = process.env.PORT || 3000;

console.log('Intentando sincronizar la base de datos...');
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada correctamente');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
