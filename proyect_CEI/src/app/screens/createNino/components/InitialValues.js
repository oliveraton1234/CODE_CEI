
export const initialValuesCreateNino = {
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    correoElectronico: "",
    añoIngreso: "",
    genero: "",
    edad: "",
    lugarNacimiento: "",
    direccion: "",
    colonia: "",
    municipio: "",
    estatus: "",
    notas: "",
    calificaciones: [
        {
            gradoEscolar: "",
            promedio: 0,
            añoAcademico: "",
            semestre: "",
            materias: [{
                nombreMateria: "",
                calificacion: 0,
            }],
            nota: "",
        },
    ],
    articulos: [
        {
            tipo: "",
            talla: "",
            entregado: false,
            fecha: "",
            recomendadoPor: "",
            prioridad: 0,
            telefonoRecomendado: "",
            // color: "",
        },
    ],
    familiares: [
        {
            nombre: "",
            parentesco: "",
            trabajo: "",
            telefono: "",
            notas: "",
        },
    ],
    contactos: [{
        nombre: "",
        telefono: "",
        direccion: "",
        colonia: "",
        notas: "",
    }],
    datosEscolares: [{
        escuelaActual: "",
        licenciaturaCarreraEspecialidad: "",
        turno: "",
        entregaCarta: "",
        tramiteAño: "",
        tramiteRealizado: false,
    }],
    tequios: [
        {
            numero: "",
            realizado: false,
            fecha: "",
            reprogramacion: false,
            notas: "",
        },
    ],
};