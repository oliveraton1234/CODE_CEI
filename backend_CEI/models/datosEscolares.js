const { Schema, model } = require('mongoose');

const datosEscolaresSchema = new Schema({    
    escuelaActual: { type: String, required: false },
    licenciaturaCarreraEspecialidad: { type: String, required: false },
    turno: { type: String, required: false },
    entregaCarta: { type: String, required: false },
    tramiteAño: { type: String, required: false },
    tramiteRealizado: { type: Boolean, required: false },
},
{
    timestamps: true
});
module.exports = datosEscolaresSchema;
