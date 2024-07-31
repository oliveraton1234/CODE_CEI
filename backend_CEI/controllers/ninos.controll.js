const Nino = require('../models/ninos');
const ninosController = require('express').Router();

// CRUD
ninosController.post('/create', async (req, res) => {
    try {
        const nino = new Nino(req.body);
        await nino.save();

        res.status(201).send(nino);
    } catch (error) {
        res.status(500).send({ message: error.message });
        console.error('Error en el servidor:', error);
    }
});

ninosController.get('/', async (req, res) => {
    try {
        const { nombre, categorias } = req.query;
        let matchQuery = {};

        if (nombre && categorias) {
            const palabras = nombre.split(' '); // Divide el término de búsqueda en palabras individuales
            const categoriasArray = categorias ? categorias.split(',') : ['nombre', 'apellido'];
            // Generar condiciones de búsqueda para cada palabra en cada categoría
            matchQuery.$or = palabras.flatMap(palabra =>
                categoriasArray.map(categoria => {
                    switch (categoria) {
                        case 'direccion':
                        case 'municipio':
                        case 'colonia':
                        case 'lugarNacimiento':
                            return { [categoria]: { $regex: palabra, $options: 'i' } };
                        case 'carrera':
                            return { 'datosEscolares.licenciaturaCarreraEspecialidad': { $regex: palabra, $options: 'i' } };
                        case 'escuela':
                            return { 'datosEscolares.escuelaActual': { $regex: palabra, $options: 'i' } };
                        case 'padres':
                            return { 'familiares.nombre': { $regex: palabra, $options: 'i' } };
                        case 'nombre':
                        case 'apellido':
                            // Búsqueda directa en los campos nombre y apellido sin sub-agrupación $or
                            return { [categoria]: { $regex: palabra, $options: 'i' } };
                        default:
                            return {};
                    }
                })
            );
        }

        const ninos = await Nino.aggregate([
            { $match: matchQuery },
            {
                $lookup: {
                    from: 'donadors',
                    localField: 'padrinos.padrino',
                    foreignField: '_id',
                    as: 'padrinosInfo'
                }
            },
            {
                $addFields: {
                    estatusSort: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$estatus", "Activo"] }, then: 1 },
                                { case: { $eq: ["$estatus", "Baja Temporal"] }, then: 2 },
                                { case: { $eq: ["$estatus", "Baja Permanente"] }, then: 3 },
                            ],
                            default: 4
                        }
                    }
                }
            },
            { $sort: { estatusSort: 1, createdAt: -1 } }
        ]).limit(40);

        res.status(200).json(ninos);
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: "Error al realizar la búsqueda", error: error.message });
    }
});


ninosController.get('/reprobados', async (req, res) => {
    try {
        const reprobados = await Nino.aggregate([
            { $match: { estatus: 'Activo' } },
            {
                $project: {
                    calificaciones: { $slice: ['$calificaciones', -1] },
                    nombre: 1,
                    apellido: 1,
                    gradoEscolar: 1

                }
            },
            { $unwind: '$calificaciones' },
            { $match: { 'calificaciones.promedio': { $lte: 6 } } },
        ]);

        res.status(200).json(reprobados);
    } catch (errors) {
        res.status(500).send({ message: error.message });
    }
})

//editar
ninosController.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const nino = await Nino.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!nino) {
            return res.status(404).send({ message: 'Niño no encontrado' });
        }

        res.status(200).send(nino);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
ninosController.get("/reportes/ciclos", async (req, res) => {
    const { year, semester } = req.query;

    try {
        let matchQuery = { 'calificaciones.añoAcademico': year };
        if (semester !== 'Completo') {
            matchQuery['calificaciones.semestre'] = semester;
        }

        const results = await Nino.aggregate([
            { $unwind: '$calificaciones' },
            { $match: matchQuery },
            { $group: {
                _id: {
                    ninoId: '$_id',
                    añoAcademico: '$calificaciones.añoAcademico'
                },
                lastCalificacion: { $last: '$calificaciones' }, 
                genero: { $first: '$genero' },
                estatus: { $first: '$estatus' }
            }},
            { $group: {
                _id: {
                    gradoEscolar: '$lastCalificacion.gradoEscolar',
                    genero: '$genero',
                    estatus: '$estatus'
                },
                count: { $sum: 1 }
            }},
            { $sort: { '_id.gradoEscolar': 1, '_id.genero': 1, '_id.estatus': 1 } }
        ]);

        console.log(results);
        res.json(results);
    } catch (error) {
        console.error('Failed to fetch data:', error);
        res.status(500).send('Error fetching data');
    }
});


async function procesarDatosReporte(datos) {
    return datos.map(nino => ({
        estatus: nino.estatus,
        gradoEscolar: nino.calificaciones.gradoEscolar,
        genero: nino.genero,
        count: 1
    }));
}

module.exports = ninosController;
