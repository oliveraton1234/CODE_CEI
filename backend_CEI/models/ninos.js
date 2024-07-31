const { Schema, model } = require('mongoose');

const calificacionesSchema = require('./calificaciones');
const datosEscolaresSchema = require('./datosEscolares');
const tequioSchema = require('./tequios');
const contactoSchema = require('./contactos');
const padreSchema = require('./padres');
const articuloSchema = require('./articulos');
const historialPadrinoSchema = require('./historialPadrino');

const ninoSchema = new Schema({
    añoIngreso: { type: String, required: false },
    genero: { type: String, required: false },
    apellido: { type: String, required: false },
    nombre: { type: String, required: false },
    fechaNacimiento: { type: String, required: false },
    edad: { type: Number, required: false },
    lugarNacimiento: { type: String, required: false },
    correoElectronico: { type: String, required: false },
    direccion: { type: String, required: false },
    colonia: { type: String, required: false },
    municipio: { type: String, required: false },
    articulos: [articuloSchema],
    familiares: [padreSchema],
    contactos: [contactoSchema],
    tequios: [tequioSchema],
    datosEscolares: [datosEscolaresSchema],
    calificaciones: [calificacionesSchema],
    padrinos: [historialPadrinoSchema], 
    notas: { type: String, required: false },
    estatus: { type: String, required: false },
},
{
    timestamps: true
});

module.exports = model('Nino', ninoSchema);
