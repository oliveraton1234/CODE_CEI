
const userRouter = require('express').Router();
const Usuario = require('../models/usuarios');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registrar usuario
userRouter.post('/register', asyncHandler(async (req, res) => {
    const { name, email, password, area, permisos } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
        res.status(400);
        throw new Error('El usuario ya existe');
    }

    const usuario = new Usuario({
        name,
        email,
        password,
        area,
        permisos
    });

    const savedUsuario = await usuario.save();

    if (savedUsuario) {
        res.status(201).json({
            _id: savedUsuario._id,
            name: savedUsuario.name,
            email: savedUsuario.email,
            area: savedUsuario.area,
            permisos: savedUsuario.permisos,
            token: generateToken(savedUsuario._id),
        });
    } else {
        res.status(400);
        throw new Error('Datos de usuario inválidos');
    }
}));


// Login usuario
userRouter.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting to log in user: ${email} with password: ${password}`);

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        console.log('User not found for email:', email);
        res.status(401).send('Correo electrónico o contraseña');
        return;
    }   

    if (usuario && await usuario.matchPassword(password)) {
        console.log('User authenticated, generating token...');
        res.json({
            _id: usuario._id,
            name: usuario.name,
            email: usuario.email,
            area: usuario.area,
            permisos: usuario.permisos,
            token: generateToken(usuario._id),
        });
    } else {
        console.log('Password does not match for user:', email);
        res.status(401).send('Correo electrónico o contraseña invalidos');
    }
}));



// Generar token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = userRouter;