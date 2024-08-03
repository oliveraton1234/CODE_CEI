import React from 'react';
import { Formik, Form, Field, FieldArray } from "formik";
import { useMutation } from 'react-query';
import validationSchemaCreateNino from "./components/Esquema";
import { initialValuesCreateNino } from "./components/InitialValues";
import CreateNinoService from '../../logic/services/CreateNino';

function CreateNinoForm() {

    const interestsOptions = [
        { value: 'Activo', label: 'Activo' },
        { value: 'Baja Temporal', label: 'Baja Temporal' },
        { value: 'Baja Permanente', label: 'Baja Permanente' },
    ];


    const createNinoMutation = useMutation(CreateNinoService, {
        onSuccess: (data) => {
            console.log("Datos guardados:", data);
            alert('Niño creado correctamente!');
        },
        onError: (error) => {
            console.error("Error al guardar los datos:", error);
            alert('Error al agregar!' + error.message);
        }
    });

    const handleSubmit = (values) => {
        console.log("values", values);
        createNinoMutation.mutate(values);
    };


    return (
        <div className="p-10 bg-camell-cei">
            <Formik
                initialValues={initialValuesCreateNino}
                validationSchema={validationSchemaCreateNino}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <div className="flex flex-col">
                            <div className="flex items-center mb-4">
                                <h1 className="text-4xl flex-grow">Registrar Nuevo Niño</h1>

                                <div>
                                    <label className="block text-orange-cei text-lg">Estatus</label>
                                    <div>
                                        {interestsOptions.map(option => (
                                            <label key={option.value} className="inline-flex items-center mr-2 text-lg">
                                                <Field
                                                    type="radio"
                                                    name="estatus"
                                                    value={option.value}
                                                    checked={values.estatus === option.value}
                                                />
                                                <span className="ml-2">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {errors.estatus && touched.estatus && <p className="text-red-500">{errors.estatus}</p>}
                        <h3 className="text-2xl mt-4">Datos Generales</h3>
                        <div className="bg-gray-200 p-8 mt-3 grid grid-cols-4 gap-x-4 gap-y-3 rounded-xl">
                            <p className="text-orange-cei">Nombre</p>
                            <p className="text-orange-cei">Apellido</p>
                            <p className="text-orange-cei">Fecha Nacimiento</p>
                            <p className="text-orange-cei">Correo electrónico</p>
                            <Field
                                name="nombre"
                                placeholder="Nombre"
                                className="p-2 rounded-md"
                            />
                            <Field
                                name="apellido"
                                placeholder="Apellido"
                                className="p-2 rounded-md"
                            />
                            <Field
                                name="fechaNacimiento"
                                type="date"
                                className="p-2 rounded-md"
                            />
                            <Field
                                name="correoElectronico"
                                placeholder="Correo Electrónico"
                                className="p-2 rounded-md"
                            />

                            <p className="text-orange-cei">Año de ingreso</p>
                            {touched.añoIngreso && errors.añoIngreso && <p className="text-red-500">{errors.añoIngreso}</p>}
                            <p className="text-orange-cei">Genero</p>
                            <p className="text-orange-cei">Edad</p>
                            <p className="text-orange-cei">Lugar de nacimiento</p>
                            <Field
                                name="añoIngreso"
                                placeholder="Año de ingreso"
                                className="p-2 rounded-md"
                            />
                            <Field
                                as="select"
                                name="genero"
                                placeholder="Genero"
                                className="p-2 rounded-md"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="Masculino">MASCULINO</option>
                                <option value="Femenino">FEMENINO</option>
                            </Field>
                            <Field
                                name="edad"
                                placeholder="Edad"
                                type="number"
                                className="p-2 rounded-md"
                            />
                            <Field
                                name="lugarNacimiento"
                                placeholder="Lugar de nacimiento"
                                className="p-2 rounded-md"
                            />

                            <p className="text-orange-cei">Direcci&oacute;n</p>
                            <p className="text-orange-cei">Colonia</p>
                            <p className="text-orange-cei">Municipio</p>
                            <p></p>
                            <Field
                                name="direccion"
                                placeholder="Direcci&oacute;n"
                                className="p-2 rounded-md"
                            />
                            <Field
                                name="colonia"
                                placeholder="Colonia"
                                className="p-2 rounded-md"
                            />
                            <Field
                                name="municipio"
                                placeholder="Municipio"
                                className="p-2 rounded-md"
                            />
                            <p className="text-orange-cei col-start-1 col-end-4">Notas</p>
                            <Field
                                name="notas"
                                as="textarea"
                                placeholder="Notas"
                                className="p-2 rounded-md col-span-2"
                            />
                        </div>

                        <h3 className="text-2xl mt-8">Calificaciones</h3>
                        <FieldArray
                            name="calificaciones"
                            render={(arrayHelpers) => (
                                <div className="bg-gray-200 p-8 mt-3 rounded-xl shadow-xl">
                                    <div className="grid grid-cols-3 gap-x-4 gap-y-3">

                                        {values.calificaciones.map((calificacion, index) => (
                                            <React.Fragment key={index}>
                                                
                                                <p className="text-orange-cei">Grado Escolar</p>
                                                <p className="text-orange-cei">Promedio</p>
                                                <p className="text-orange-cei">Año Académico</p>

                                                <Field
                                                    as="select"
                                                    name={`calificaciones.${index}.gradoEscolar`}
                                                    placeholder="Grado Escolar"
                                                    className="p-2 rounded-md"
                                                >
                                                    <option value="">Selecciona una opción</option>
                                                    <option value="KINDER 1">KINDER 1</option>
                                                    <option value="KINDER 2">KINDER 2</option>
                                                    <option value="KINDER 3">KINDER 3</option>
                                                    <option value="PRIMARIA 1">PRIMARIA 1</option>
                                                    <option value="PRIMARIA 2">PRIMARIA 2</option>
                                                    <option value="PRIMARIA 3">PRIMARIA 3</option>
                                                    <option value="PRIMARIA 4">PRIMARIA 4</option>
                                                    <option value="PRIMARIA 5">PRIMARIA 5</option>
                                                    <option value="PRIMARIA 6">PRIMARIA 6</option>
                                                    <option value="SECUNDARIA 1">SECUNDARIA 1</option>
                                                    <option value="SECUNDARIA 2">SECUNDARIA 2</option>
                                                    <option value="SECUNDARIA 3">SECUNDARIA 3</option>
                                                    <option value="PREPARATORIA 1">PREPARATORIA 1</option>
                                                    <option value="PREPARATORIA 2">PREPARATORIA 2</option>
                                                    <option value="PREPARATORIA 3">PREPARATORIA 3</option>
                                                    <option value="UNIVERSIDAD 1">UNIVERSIDAD 1</option>
                                                    <option value="UNIVERSIDAD 2">UNIVERSIDAD 2</option>
                                                    <option value="UNIVERSIDAD 3">UNIVERSIDAD 3</option>
                                                    <option value="UNIVERSIDAD 4">UNIVERSIDAD 4</option>
                                                    <option value="UNIVERSIDAD 5">UNIVERSIDAD 5</option>
                                                    <option value="UNIVERSIDAD 6">UNIVERSIDAD 6</option>
                                                    <option value="UNIVERSIDAD 6">SERVICIO SOCIAL</option>
                                                    <option value="UNIVERSIDAD 6">GRADUADO</option>
                                                </Field>
                                                <Field
                                                    name={`calificaciones.${index}.promedio`}
                                                    type="number"
                                                    placeholder="Promedio"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    as="select"
                                                    name={`calificaciones.${index}.añoAcademico`}
                                                    placeholder="Año Académico"
                                                    className="p-2 rounded-md"
                                                >
                                                    <option value="">Selecciona una opción</option>
                                                    <option value="2021-22">2021-22</option>
                                                    <option value="2022-23">2022-23</option>
                                                    <option value="2023-24">2023-24</option>
                                                </Field>
                                                <div className=' grid grid-cols-subgrid'>
                                                    <p className="text-orange-cei mb-2">Semestre</p>
                                                    <Field
                                                        as="select"
                                                        name={`calificaciones.${index}.semestre`}
                                                        placeholder="Año Académico"
                                                        className="p-2 rounded-md"
                                                    >
                                                        <option value="">Seleccione un semestre</option>
                                                        <option value="Agosto-Diciembre">Agosto-Diciembre</option>
                                                        <option value="Febrero-Junio">Febrero-Junio</option>
                                                        <option value="Completo">Completo</option>
                                                    </Field>
                                                </div>
                                                <div className='grid grid-cols-subgrid'>
                                                    <p className="text-orange-cei mb-2">Notas</p>
                                                    <Field
                                                        name={`calificaciones.${index}.nota`}
                                                        placeholder="Notas"
                                                        className="p-2 rounded-md"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                    className="col-span-3 text-red-500 w-52"
                                                >
                                                    Eliminar Calificación
                                                </button>
                                            </React.Fragment>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    gradoEscolar: "",
                                                    promedio: 0,
                                                    periodo: "",
                                                    color: null,
                                                })
                                            }
                                            className="col-span-3 mt-2 p-2 bg-blue-500 text-white rounded-md w-52"
                                        >
                                            Añadir Calificación
                                        </button>
                                    </div>
                                </div>
                            )}
                        />
                        <h3 className="text-2xl mt-6">Datos escolares</h3>
                        <FieldArray
                            name="datosEscolares"
                            render={(arrayHelpers) => (
                                <div className="bg-gray-200 p-8 mt-3 rounded-xl">
                                    <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                                        <p className="text-orange-cei">Escuela Actual</p>
                                        <p className="text-orange-cei">Carrera/Especialidad</p>
                                        <p className="text-orange-cei">Turno</p>
                                        {values.datosEscolares.map((dato, index) => (
                                            <React.Fragment key={index}>
                                                <Field
                                                    name={`datosEscolares.${index}.escuelaActual`}
                                                    placeholder="Escuela Actual"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    name={`datosEscolares.${index}.licenciaturaCarreraEspecialidad`}
                                                    placeholder="Carrera / Especialidad"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    as="select"
                                                    name={`datosEscolares.${index}.turno`}
                                                    placeholder="Turno"
                                                    className="p-2 rounded-md"
                                                >
                                                    <option value="">Selecciona una opción</option>
                                                    <option value="Matutino">Matutino</option>
                                                    <option value="Vespertino">Vespertino</option>
                                                    <option value="Mixto">Mixto</option>
                                                    <option value="Linea">Linea</option>
                                                    <option value="Sabatino">Sabatino</option>
                                                    <option value="Pendiente">Pendiente</option>
                                                    <option value="Sabado y Domingo">Sábado y Domingo</option>
                                                </Field>
                                                <p className="text-orange-cei">Entrega de carta</p>
                                                <p className="text-orange-cei">Trámite año</p>
                                                <p className="text-orange-cei">Trámite realizado</p>
                                                <Field type="checkbox" name={`datosEscolares.${index}.entregaCarta`} className="mt-3" />
                                                <Field
                                                    name={`datosEscolares.${index}.tramiteAño`}
                                                    placeholder="Año DE tramite"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field type="checkbox" name={`datosEscolares.${index}.tramiteRealizado`} className="mt-3" />
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                    className="col-span-3 text-red-500 w-60"
                                                >
                                                    Eliminar Datos Escolares
                                                </button>
                                            </React.Fragment>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    escuelaActual: "",
                                                    licenciaturaCarreraEspecialidad: "",
                                                    turno: "",
                                                })
                                            }
                                            className="col-span-3 mt-2 p-2 bg-blue-500 text-white rounded-md w-52"
                                        >
                                            Añadir Datos Escolares
                                        </button>
                                    </div>
                                </div>
                            )}
                        />


                        <h3 className="text-2xl mt-6">Artículo</h3>
                        <FieldArray
                            name="articulos"
                            render={(arrayHelpers) => (
                                <div className="bg-gray-200 p-8 mt-3 rounded-xl">
                                    <div className="grid grid-cols-4 gap-x-4 gap-y-3">
                                        <p className="text-orange-cei">Tipo</p>
                                        <p className="text-orange-cei">Talla</p>
                                        <p className="text-orange-cei">Entregado</p>
                                        <p className="text-orange-cei">Fecha</p>
                                        <p className="text-orange-cei">Recomendado por</p>
                                        <p className="text-orange-cei">Prioridad</p>
                                        <p className="text-orange-cei">Teléfono Recomendado</p>
                                        <p></p>

                                        {values.articulos.map((articulo, index) => (
                                            <React.Fragment key={index}>
                                                <Field
                                                    name={`articulos.${index}.tipo`}
                                                    placeholder="Tipo de artículo"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    name={`articulos.${index}.talla`}
                                                    placeholder="Talla del artículo"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    type="checkbox"
                                                    name={`articulos.${index}.entregado`}
                                                    className="mt-3"
                                                />
                                                <Field
                                                    name={`articulos.${index}.fecha`}
                                                    type="date"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    name={`articulos.${index}.recomendadoPor`}
                                                    placeholder="Recomendado por"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    name={`articulos.${index}.prioridad`}
                                                    type="number"
                                                    placeholder="Prioridad"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    name={`articulos.${index}.telefonoRecomendado`}
                                                    placeholder="Teléfono de quien recomendó"
                                                    className="p-2 rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                    className="col-span-7 text-red-500 mt-2 w-52"
                                                >
                                                    Eliminar Artículo
                                                </button>
                                            </React.Fragment>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    tipo: "",
                                                    talla: "",
                                                    entregado: false,
                                                    fecha: "",
                                                    recomendadoPor: "",
                                                    prioridad: "",
                                                    telefonoRecomendado: "",
                                                    color: "",
                                                })
                                            }
                                            className="col-span-8 mt-2 p-2 bg-blue-500 text-white rounded-md w-52"
                                        >
                                            Añadir Artículo
                                        </button>
                                    </div>
                                </div>
                            )}
                        />

                        <h3 className="text-2xl mt-6">Tequios</h3>
                        <FieldArray
                            name="tequios"
                            render={arrayHelpers => (
                                <div className='bg-gray-200 p-8 mt-3 rounded-xl'>
                                    <div className='grid grid-cols-6 gap-x-4 gap-y-3'>
                                        <p className='text-orange-cei col-span-1'>Número</p>
                                        <p className='text-orange-cei col-span-1'>Realizado</p>
                                        <p className='text-orange-cei col-span-1'>Fecha</p>
                                        <p className='text-orange-cei col-span-1'>Reprogramación</p>
                                        <p className='text-orange-cei col-span-2'>Notas</p>
                                        {values.tequios.map((tequio, index) => (
                                            <React.Fragment key={index}>
                                                <Field name={`tequios.${index}.numero`} placeholder="Número" className="p-2 rounded-md" />
                                                <Field type="checkbox" name={`tequios.${index}.realizado`} className="mt-3" />
                                                <Field name={`tequios.${index}.fecha`} type="date" className="p-2 rounded-md" />
                                                <Field type="checkbox" name={`tequios.${index}.reprogramacion`} className="mt-3" />
                                                <Field name={`tequios.${index}.notas`} placeholder="Notas" className="p-2 rounded-md col-span-2" />
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                    className="col-span-6 text-red-500 w-60"
                                                >
                                                    Eliminar Tequio
                                                </button>
                                            </React.Fragment>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.push({ numero: '', realizado: false, fecha: '', reprogramacion: false, notas: '' })}
                                            className="col-span-6 mt-2 p-2 bg-blue-500 text-white rounded-md w-60"
                                        >
                                            Añadir Tequio
                                        </button>
                                    </div>
                                </div>
                            )}
                        />

                        <h3 className="text-2xl mt-6">Padres</h3>

                        <FieldArray
                            name="familiares"
                            render={(arrayHelpers) => (
                                <div className="bg-gray-200 p-8 mt-3 rounded-xl">
                                    <div className="grid grid-cols-4 gap-x-4 gap-y-3">
                                        <p className="text-orange-cei">Nombre</p>
                                        <p className="text-orange-cei">Parentesco</p>
                                        <p className="text-orange-cei">Trabajo</p>
                                        <p className="text-orange-cei">Teléfono</p>
                                        {values.familiares.map((familiar, index) => (
                                            <React.Fragment key={index}>
                                                <Field
                                                    name={`familiares.${index}.nombre`}
                                                    placeholder="Nombre"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    name={`familiares.${index}.parentesco`}
                                                    placeholder="Parentesco"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    name={`familiares.${index}.trabajo`}
                                                    placeholder="Trabajo"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    name={`familiares.${index}.telefono`}
                                                    placeholder="Teléfono"
                                                    className="p-2 rounded-md"
                                                />
                                                <Field
                                                    name={`familiares.${index}.notas`}
                                                    placeholder="Notas"
                                                    className="p-2 rounded-md col-span-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                    className="col-span-4 text-red-500 w-60"
                                                >
                                                    Eliminar Familiar
                                                </button>
                                            </React.Fragment>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    nombre: "",
                                                    parentesco: "",
                                                    trabajo: "",
                                                    telefono: "",
                                                })
                                            }
                                            className="col-span-4 mt-2 p-2 bg-blue-500 text-white rounded-md w-60"
                                        >
                                            Añadir Familiar
                                        </button>
                                    </div>
                                </div>
                            )}
                        />

                        <h3 className="text-2xl mt-6 font-semibold text-gray-700">Contactos</h3>
                        <FieldArray
                            name="contactos"
                            render={arrayHelpers => (
                                <div className='bg-gray-200 p-8 mt-3 rounded-xl shadow-lg'>
                                    <div className='grid grid-cols-12 gap-4'>
                                        <p className='text-orange-cei col-span-3 font-medium'>Nombre</p>
                                        <p className='text-orange-cei col-span-3 font-medium'>Teléfono</p>
                                        <p className='text-orange-cei col-span-5 font-medium'>Notas</p>
                                        <p className='col-span-1'></p>  
                                        {values.contactos.map((contacto, index) => (
                                            <React.Fragment key={index}>
                                                <Field
                                                    name={`contactos.${index}.nombre`}
                                                    placeholder="Nombre"
                                                    className="p-2 col-span-3 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                                    type="text"
                                                />
                                                <Field
                                                    name={`contactos.${index}.telefono`}
                                                    placeholder="Teléfono"
                                                    className="p-2 rounded-md col-span-3 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                                    type="text"
                                                />
                                                <Field
                                                    name={`contactos.${index}.notas`}
                                                    placeholder="Notas"
                                                    className="p-2 rounded-md col-span-5 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                                    type="text"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                    className="col-span-1 text-red-500 hover:text-white hover:bg-red-500 p-2 rounded transition duration-150 ease-in-out"
                                                >
                                                    Eliminar
                                                </button>
                                            </React.Fragment>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.push({ nombre: '', telefono: '', direccion: '', colonia: '', notas: '' })}
                                            className="col-span-12 mt-2 p-2 bg-blue-500 text-white rounded-md"
                                        >
                                            Añadir Contacto
                                        </button>
                                    </div>
                                </div>
                            )}
                        />


                        <button type="submit" className="mt-8 bg-green-500 text-white p-2 rounded">Crear Niño</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateNinoForm;
