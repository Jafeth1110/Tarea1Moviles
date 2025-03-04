const express = require('express');
const sequelize = require('./config/db');
const clientesRoutes = require('./routes/clientesRoutes');
const actividadesRoutes = require('./routes/actividadesRoutes');
const app = express();

app.use(express.json());

app.use('/api', clientesRoutes);
app.use('/api', actividadesRoutes);

const PORT = process.env.PORT || 3006;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});