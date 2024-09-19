const {Schema} = require('mongoose');

module.exports = new Schema({
    nombre: String,
    descripcion: String,
    rfc: String,
    clave: String
}, 'Stores');