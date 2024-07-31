const { Schema, model } = require('mongoose');

const tequioSchema = new Schema({
    numero: { type: String, required: false },
    realizado: { type: Boolean, required: false },
    fecha: { type: String, required: false },
    notas: { type: String, required: false },
    color: { type: String, required: false },
    reprogramacion: { type: Boolean, required: false },
},
{
    timestamps: true
});

// module.exports = model('Tequio', tequioSchema);
module.exports = tequioSchema;