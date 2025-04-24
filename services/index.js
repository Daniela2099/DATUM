require('dotenv').config();  // Sólo se debe llamar una vez
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/usuario.routes');  // Asegúrate de que la ruta sea correcta

const app = express();
app.use(express.json());  // Habilitar el análisis de JSON en las solicitudes

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api', userRoutes);  // Prefijo de las rutas

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});