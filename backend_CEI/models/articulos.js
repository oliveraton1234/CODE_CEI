const { Schema, model } = require('mongoose');

const articuloSchema = new Schema({
    tipo: { type: String, required: false },
    talla: { type: String, required: false },
    entregado: { type: Boolean, required: false },
    fecha: { type: String, required: false },
    recomendadoPor: { type: String, required: false },
    prioridad: { type: Number, required: false },
    telefonoRecomendado: { type: String, required: false },
    color: { type: String, required: false },
    entregado: { type: Boolean, required: false },
    fechaEntrega: { type: String, required: false },
},
{
    timestamps: true
});

module.exports = articuloSchema;