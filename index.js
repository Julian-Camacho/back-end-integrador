require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('\x1b[35m Conectado a la base de datos');
    app.listen(process.env.PORT, () => {
        console.log(`\x1b[36m Servidor corriendo en http://localhost:${process.env.PORT} \x1b[37m`);
    });
})
.catch((err) => console.error(err));