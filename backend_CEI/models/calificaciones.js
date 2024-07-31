const { Schema, model } = require('mongoose');

const materiaSchema = new Schema({
    nombreMateria: { type: String, required: false },
    calificacion: { type: Number, required: false }
});

const calificacionesSchema = new Schema({
    gradoEscolar: { type: String, required: false },
    promedio: { type: Number, required: false },
    materias: [materiaSchema],
    añoAcademico: { type: String, required: false }, 
    semestre: { type: String, required: false}
},
{
    timestamps: true
});


module.exports = calificacionesSchema;