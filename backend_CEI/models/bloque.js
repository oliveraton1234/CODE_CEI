const mongoose = require('mongoose');

    const bloqueSchema = new mongoose.Schema({
        nombreBloque: {type: String,required: true},
        materias: [{type: String}]
    });

const Bloque = mongoose.model('Bloque', bloqueSchema);

module.exports = Bloque;
