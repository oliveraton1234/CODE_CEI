const { Schema, model } = require('mongoose');

const donadorSchema = new Schema({
    nombre: { type: String, required: false },
    apellido: { type: String, required: false },
    direccion: { type: String, required: false },
    ciudad: { type: String, required: false },
    estado: { type: String, required: false },
    codigoPostal: { type: String, required: false },
    pais: { type: String, required: false },
    correoElectronico: { type: String, required: false },
    telefono: { type: String, required: false },
    observaciones: { type: String, required: false },
    pago: { type: String, required: false },
    nombresAsociados: { type: String, required: false },
    color: { type: String, required: false }
},
{
    timestamps: true
});

module.exports = model('Donador', donadorSchema);

