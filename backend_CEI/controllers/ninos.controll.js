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
    const { promedioMaximo, materia, anioAcademico, semestre, gradoEscolar } = req.query;

    try {
        let matchQuery = { estatus: 'Activo' };

        if (promedioMaximo) {
            matchQuery['calificaciones.promedio'] = { $lte: parseFloat(promedioMaximo), $ne: 0 };
        }

        if (materia) {
            matchQuery['calificaciones.materias.nombreMateria'] = materia;
        }

        const projectQuery = {
            nombre: 1,
            apellido: 1,
            'calificaciones.gradoEscolar': 1,
            'calificaciones.promedio': 1,
            'calificaciones.añoAcademico': 1,
            'calificaciones.semestre': 1,
        };

        const pipeline = [
            { $match: matchQuery },
            { $unwind: '$calificaciones' },
            { $match: matchQuery },
            { $project: projectQuery }
        ];

        
        if(gradoEscolar) {
            pipeline.push({ $match: { 'calificaciones.gradoEscolar': gradoEscolar } });
        }

        if (anioAcademico) {
            pipeline.push({ $match: { 'calificaciones.añoAcademico': anioAcademico } });
        }

        if (semestre) {
            pipeline.push({ $match: { 'calificaciones.semestre': semestre } });
        }


        const reprobados = await Nino.aggregate(pipeline);
        res.status(200).json(reprobados);
    } catch (error) {
        console.error('Failed to fetch data:', error);
        res.status(500).send({ message: error.message });
    }
});

module.exports = ninosController;


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

ninosController.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const nino = await Nino.findByIdAndDelete(id);

        if (!nino) {
            return res.status(404).send({ message: 'Niño no encontrado' });
        }

        res.status(200).send(nino);
    } catch (error) {
        res.status(500).send({ message: error.message });
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
