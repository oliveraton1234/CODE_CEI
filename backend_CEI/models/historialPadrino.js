const { Schema, model } = require('mongoose');

const historialPadrinoSchema = new Schema({
    padrino: { type: Schema.Types.ObjectId, ref: 'Donador', required: function() { return false; } },
    fechaInicio: { type: String, required: false },
    fechaFin: { type: String, required: false },
    estatus: { type: Boolean, required: false }
}, {
    timestamps: true
});

module.exports = historialPadrinoSchema;