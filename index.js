require('dotenv').config();
//importacion de Express
const express = require('express');
//importamos el cors
const cors = require('cors');


//Crear el servidor de Express
const app = express();
//configurar cors
app.use(cors());
//importando la cadena de conexión
const { bdConnection } = require('./database/config');
//Lectura del body
app.use(express.json());
//Base de Datos
bdConnection();
//Directorio publico
app.use(express.static('public'));


// Rutas
app.use('/api/municipio', require('./routes/municipioRoute'));
app.use('/api/sitio', require('./routes/sitioRoute'));
app.use('/api/talent', require('./routes/talentRoute'));
app.use('/api/evento', require('./routes/eventoRoute'));
app.use('/api/producto', require('./routes/productoRoute'));
app.use('/api/taller', require('./routes/tallerRoute'));



//app.listen(process.env.PORT);
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT)
});