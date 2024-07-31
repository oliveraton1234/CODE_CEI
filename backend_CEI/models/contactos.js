const { Schema, model } = require('mongoose');

const contactoSchema = new Schema({
    nombre: { type: String, required: false },
    telefono: { type: String, required: false },
    notas: { type: String, required: false },
},
{
    timestamps: true
});

module.exports = contactoSchema;