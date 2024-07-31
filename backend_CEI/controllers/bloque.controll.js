const Bloque = require('../models/bloque');
const bloqueController = require('express').Router();

bloqueController.get('/getAllBlocks', async (req, res) => {
    try {
        const bloques = await Bloque.find();
        res.status(200).json(bloques);
    } catch (error) {
        res.status(500).send(error);
    }
});

bloqueController.post('/createBlock', async (req, res) => {
    try {
        const newBloque = new Bloque(req.body);
        await newBloque.save();
        res.status(201).json(newBloque);
    } catch (error) {
        res.status(500).send(error);
    }
});

bloqueController.put('/updateBlock/:id', async (req, res) => {
    try {
        const bloque = await Bloque.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(bloque);
    } catch (error) {
        res.status(500).send(error);
    }
});

bloqueController.delete('/deleteOneBlock', async (req, res) => {
    try {
        await Bloque.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = bloqueController;