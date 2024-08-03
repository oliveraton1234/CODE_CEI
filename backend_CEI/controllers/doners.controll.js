const express = require('express');
const donersController = express.Router();
const Donador = require('../models/donadores');

// Obtener todos los donadores
donersController.get('/all', async (req, res) => {
  try {
    const donadores = await Donador.find();
    res.json(donadores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo donador
donersController.post('/create', async (req, res) => {
  const donador = new Donador({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    estado: req.body.estado,
    codigoPostal: req.body.codigoPostal,
    pais: req.body.pais,
    correoElectronico: req.body.correoElectronico,
    telefono: req.body.telefono,
    observaciones: req.body.observaciones,
    color: req.body.color
  });

  try {
    const newDonador = await donador.save();
    res.status(201).json(newDonador);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener un donador específico
donersController.get('/:id', getDonador, (req, res) => {
  res.json(res.donador);
});

//encontrar
donersController.get('/', async (req, res) => {
  try {
    let query = {};
    const { nombre, categorias } = req.query;

    if (nombre) {
      const searchRegex = new RegExp(nombre, 'i');
      if (categorias) {
        const campos = categorias.split(',').filter(c => c);
        query['$or'] = campos.map(campo => ({ [campo]: searchRegex }));
      } else {
        query['$or'] = [{ nombre: searchRegex }, { apellido: searchRegex }];
      }
    }

    const donadores = await Donador.find(query);
    res.status(200).send(donadores);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Actualizar un donador
donersController.put('/edit/:id', getDonador, async (req, res) => {
  const { id } = req.params;
    const updateData = req.body;

  try {
    const updatedDonador = await Donador.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedDonador) {
      return res.status(404).json({ message: 'Donador no encontrado' });
    }

    res.status(200).send(updatedDonador);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un donador
donersController.delete('/:id', getDonador, async (req, res) => {
  try {
    const result = await Donador.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: 'Donador no encontrado' });
        }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getDonador(req, res, next) {
  let donador;
  try {
    donador = await Donador.findById(req.params.id);
    if (donador == null) {
      return res.status(404).json({ message: 'Donador no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.donador = donador;
  next();
}

//encontrar por nombre y apellido
donersController.get('/search/byName', async (req, res) => {
  try {
    const { nombre } = req.query;
    
    if (!nombre) {
        return res.status(400).json({ message: "Se requiere un nombre para la búsqueda." });
    }

    // Crear una expresión regular para buscar coincidencias que contengan las palabras proporcionadas en cualquier orden
    const regex = new RegExp(nombre.split(' ').join('|'), 'i');

    // Realizar la búsqueda en la base de datos
    const donadores = await Donador.find({
        $or: [
            { nombre: { $regex: regex } },
            { apellido: { $regex: regex } }
        ]
    }).limit(20); // Limitar los resultados para mejorar el rendimiento y la experiencia del usuario

    res.status(200).json(donadores);
} catch (error) {
    console.error('Error en la búsqueda de padrinos:', error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
}
})    

module.exports = donersController;
