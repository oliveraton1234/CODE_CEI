import * as Yup from 'yup';

export const validationSchemaEditNino = Yup.object().shape({
    nombre: Yup.string(),
    apellido: Yup.string(),
    fechaNacimiento: Yup.date(),
    correoElectronico: Yup.string().email("Correo electrónico inválido"),
    genero: Yup.string(),
    edad: Yup.number(),
    lugarNacimiento: Yup.string(),
    direccion: Yup.string(),
    colonia: Yup.string(),
    municipio: Yup.string(),
    añoIngreso: Yup.string(),
    estatus: Yup.string(),
    notas: Yup.string(),
    calificaciones: Yup.array().of(
        Yup.object().shape({
            gradoEscolar: Yup.string(),
            promedio: Yup.number(),
            periodo: Yup.string(),
            materias: Yup.array().of(
                Yup.object().shape({
                    nombreMateria: Yup.string() ,
                    calificacion: Yup.number(),
                })
            ),
        })
    ),
    articulos: Yup.array().of(
        Yup.object().shape({
            tipo: Yup.string(),
            talla: Yup.string(),
            entregado: Yup.boolean(),
            fecha: Yup.string(),
            recomendadoPor: Yup.string(),
            prioridad: Yup.number(),
            telefonoRecomendado: Yup.string(),
        })
    ),
    contactos: Yup.array().of(
        Yup.object().shape({
            nombre: Yup.string(),
            telefono: Yup.string(),
            direccion: Yup.string(),
            colonia: Yup.string(),
            notas: Yup.string(),
        })
    ),
    datosEscolares: Yup.array().of(
        Yup.object().shape({
            escuelaActual: Yup.string(),
            licenciaturaCarreraEspecialidad: Yup.string(),
            turno: Yup.string(),
            entregaCarta: Yup.string(),
            tramiteAño: Yup.string(),
            tramiteRealizado: Yup.boolean(),
            // color: Yup.string(),
        })
    ),
    tequios: Yup.array().of(
        Yup.object().shape({
            numero: Yup.string(),
            realizado: Yup.boolean(),
            fecha: Yup.string(),
            notas: Yup.string(),
            // color: Yup.string(),
            reprogramacion: Yup.boolean(),
        })
    ),
    familiares: Yup.array().of(
        Yup.object().shape({
            nombre: Yup.string(),
            parentesco: Yup.string(),
            telefono: Yup.string(),
            trabajo: Yup.string(),
            notas: Yup.string(),
        })
    ),
    padrinos: Yup.array().of(
        Yup.object().shape({
            padrino: Yup.mixed().nullable(),
            fechaInicio: Yup.string().nullable(),
            fechaFin: Yup.string().nullable(),
            estatus: Yup.boolean().nullable(),
        })
    ).nullable(),
});
