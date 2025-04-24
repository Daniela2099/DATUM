require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../src/routes/usuario.routes');
const loginRoutes = require('../src/routes/login.route');
const manejoErrores = require('../src/utils/manejoErrores');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/login', loginRoutes);

app.use(manejoErrores);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));