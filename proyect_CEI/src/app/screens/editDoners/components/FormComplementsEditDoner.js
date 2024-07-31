
import * as Yup from 'yup';

export const initialValuesEditDonador = {
    nombre: "",
    apellido: "",
    direccion: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    pais: "",
    correoElectronico: "",
    telefono: "",
    observaciones: "",
    nombresAsociados: "",
    color: ""
};

export const validationSchemaEditDonador = Yup.object().shape({
    nombre: Yup.string(),
    apellido: Yup.string(),
    direccion: Yup.string(),
    ciudad: Yup.string(),
    estado: Yup.string(),
    codigoPostal: Yup.string(),
    pais: Yup.string(),
    correoElectronico: Yup.string(),
    telefono: Yup.string(),
    observaciones: Yup.string(),
    nombresAsociados: Yup.string(),
    color: Yup.string()
});