import { Formik, Form, Field, ErrorMessage } from 'formik';
import { initialValuesCreateDonador, validationSchemaCreateDonador } from './components/FormComplementsDonors';
import useCreateDonador from '../../logic/services/CreateDoner';

function CreateDonors() {

    const categoryOptions = [
        { value: 'PayPal', label: 'PayPal' },
        { value: 'Cheque', label: 'Cheque' },
        { value: 'Pagomatico', label: 'Pagomatico' },
    ];

    const { mutate: createDonador} = useCreateDonador();

    const handleSubmit = async (values) => {
        createDonador(values);
    };

    return (
        <div className="p-10 bg-camell-cei h-screen">
            <Formik
                initialValues={initialValuesCreateDonador}
                validationSchema={validationSchemaCreateDonador}
                onSubmit={handleSubmit}
            >
                <Form>
                    <h1 className="text-4xl mb-4">Registrar Nuevo Donador</h1>
                    <div className="bg-gray-200 p-8 mt-3 grid grid-cols-4 gap-10 rounded-xl">
                        <div>
                            <label className="text-orange-cei">Nombre</label>
                            <Field name="nombre" placeholder="Nombre" className="input" />
                            <ErrorMessage name="nombre" component="div" className=" text-red-800" />
                        </div>
                        <div>
                            <label className="text-orange-cei">Apellido</label>
                            <Field name="apellido" placeholder="Apellido" className="input" />
                            <ErrorMessage name="apellido" component="div" className=" text-red-800" />
                        </div>
                        <div>
                            <label className="text-orange-cei">Correo Electrónico</label>
                            <Field name="correoElectronico" placeholder="Correo Electrónico" className="input" />
                            <ErrorMessage name="correoElectronico" component="div" className=" text-red-800" />
                        </div>
                        <div>
                            <label className="text-orange-cei">Teléfono</label>
                            <Field name="telefono" placeholder="Teléfono" className="input" />
                            <ErrorMessage name="telefono" component="div" className=" text-red-800" />
                        </div>
                        <div>
                            <label className="text-orange-cei">Dirección</label>
                            <Field name="direccion" placeholder="Dirección" className="input" />
                            <ErrorMessage name="direccion" component="div" className=" text-red-800" />
                        </div>
                        <div>
                            <label className="text-orange-cei">Ciudad</label>
                            <Field name="ciudad" placeholder="Ciudad" className="input" />
                            <ErrorMessage name="ciudad" component="div" className=" text-red-800" />
                        </div>
                        <div>
                            <label className="text-orange-cei">Estado</label>
                            <Field name="estado" placeholder="Estado" className="input" />
                            <ErrorMessage name="estado" component="div" className=" text-red-800" />
                        </div>
                        <div>
                            <label className="text-orange-cei">Código Postal</label>
                            <Field name="codigoPostal" placeholder="Código Postal" className="input" />
                            <ErrorMessage name="codigoPostal" component="div" className=" text-red-800" />
                        </div>
                        <div>
                            <label className="text-orange-cei">País</label>
                            <Field name="pais" placeholder="País" className="input" />
                            <ErrorMessage name="pais" component="div" className=" text-red-800" />
                        </div>
                        <div>
                            <label className="text-orange-cei">Nombres Asociados</label>
                            <Field name="nombresAsociados" placeholder="Nombres Asociados" className="input " />
                            <ErrorMessage name="nombresAsociados" component="div" className=" text-red-800" />
                        </div>
                        <div>
                            <label className="text-orange-cei">Medio de Pago</label>
                            <Field name="pago" as="select" className="ml-2 w-2/3">
                                <option value="">Seleccione un pago</option>
                                {categoryOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="pago" component="div" className=" text-red-800" />
                        </div>
                        <div className="col-span-2">
                            <label className="text-orange-cei">Observaciones</label>
                            <Field name="observaciones" as="textarea" placeholder="Observaciones" className="ml-2 w-2/3" />
                            <ErrorMessage name="observaciones" component="div" className=" text-red-800" />
                        </div>
                    </div>
                    <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Registrar</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreateDonors;
