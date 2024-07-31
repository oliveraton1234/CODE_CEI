import * as Yup from 'yup';

export const initialValuesCreateDonador = {
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
    pago: "",
    nombresAsociados: "",
    color: ""
};

export const validationSchemaCreateDonador = Yup.object().shape({
    nombre: Yup.string(),
    apellido: Yup.string(),
    direccion: Yup.string(),
    ciudad: Yup.string(),
    estado: Yup.string(),
    codigoPostal: Yup.string(),
    pais: Yup.string(),
    correoElectronico: Yup.string(),
    telefono: Yup.string(),
    pago: Yup.string(),
    observaciones: Yup.string(),
    nombresAsociados: Yup.string(),
    color: Yup.string()
});
