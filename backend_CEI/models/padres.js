const { Schema, model } = require('mongoose');

const padreSchema = new Schema({
    nombre: { type: String, required: false },
    parentesco: { type: String, required: false },
    trabajo: { type: String, required: false }, 
    telefono: { type: String, required: false },
    notas: { type: String, required: false },
},
{
    timestamps: true
});

module.exports = padreSchema;
