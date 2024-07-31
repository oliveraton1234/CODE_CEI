import React, { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { initialValuesCreateNino } from '../createNino/components/InitialValues';
import { useSelector } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';
import { validationSchemaEditNino } from './components/ValidationSchema';
import useEditNino from '../../logic/services/editNino';
import useSearchDoner from '../../logic/services/useSearchDoner';
import axios from 'axios';
import api_base_url from '../../configs/api_basse_url';
import { initialValuesEditNino } from './components/initialValuesEditNino';

function EditNinoForm() {

    const interestsOptions = [
        { value: 'Activo', label: 'Activo' },
        { value: 'Baja Temporal', label: 'Baja Temporal' },
        { value: 'Baja Permanente', label: 'Baja Permanente' },
    ];


    const nino = useSelector((state) => state.nino.nino || {});
    const { padrinos = [] } = nino;
    const { updateNino } = useEditNino();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [setSelectedMateriaIndex] = useState(null);

    const handleSubmit = async (values) => {
        const filteredPadrinos = padrinos.filter(p => p.padrino);

        if (selectedPadrino && selectedPadrino._id) {
            filteredPadrinos.push({
                padrino: selectedPadrino._id,
                fechaInicio: fechaInicio,
                estatus: estatusPadrino
            });
        }

        const updatedValues = {
            ...values,
            padrinos: filteredPadrinos
        };

        try {
            await updateNino({ id: nino._id, ...updatedValues });
            alert('Niño actualizado correctamente!');
        } catch (error) {
            alert('Error al actualizar el niño');
        }
    };


    const [busqueda, setBusqueda] = useState('');
    const [shouldFetch, setShouldFetch] = useState(false);
    const [selectedPadrino, setSelectedPadrino] = useState(null);

    const { data: resultados, isError: isErrorSearch, isLoading: isLoadingSearch, error: errorSearch } = useSearchDoner(busqueda, shouldFetch);

    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [estatusPadrino, setEstatusPadrino] = useState(true);

    const handleInputChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleSearchClick = () => {
        setShouldFetch(true);
    };

    const handleSelectPadrino = (padrino) => {
        setSelectedPadrino(padrino);
        setShouldFetch(false);
        setFechaInicio('');
        setFechaFin('');
        setEstatusPadrino(true);
    };

    const [expandedIndices, setExpandedIndices] = useState(new Set());
    const toggleExpand = index => {
        const newSet = new Set(expandedIndices);
        if (newSet.has(index)) {
            newSet.delete(index);
        } else {
            newSet.add(index);
        }
        setExpandedIndices(newSet);
    };

    const pushMateria = (arrayHelpers, index) => {
        arrayHelpers.insert(index, {
            materias: [...(initialValuesCreateNino.calificaciones[index]?.materias || []), { nombre: '', calificacion: 0 }]
        });
    };

    const calculoPromedio = (materias) => {
        if (!materias || materias.length === 0) return 0;
        const suma = materias.reduce((acc, curr) => acc + (curr.calificacion || 0), 0);
        return (suma / materias.length).toFixed(2);
    };

    const openModal = (index) => {
        setSelectedMateriaIndex(index);
        setIsModalOpen(true);
    };

    const selectMateria = (materia) => {
        // setFile(`calificaciones.${selectedMateriaIndex}.materias.nombre`, materia.nombre);
        setIsModalOpen(false);
    };

    const [bloques, setBloques] = useState([]);

    useEffect(() => {
        const fetchBloques = async () => {
            const result = await axios.get(`${api_base_url}/bloques/getAllBlocks`);
            setBloques(result.data);
        };
        fetchBloques();
    }, []);

    const materiaOptions = bloques.reduce((acc, bloque) => {
        const materiasFromBloque = bloque.materias.map(materia => ({
            nombreBloque: bloque.nombreBloque,
            nombreMateria: materia
        }));
        return acc.concat(materiasFromBloque);
    }, []);


    return (
        <div className='p-10 bg-camell-cei'>
            <Formik
                initialValues={nino || initialValuesEditNino}
                validationSchema={validationSchemaEditNino}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <div className="flex flex-col">
                            <div className="flex items-center mb-4">
                                <h1 className="text-4xl flex-grow">Editar Niño</h1>
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
                                type="email"
                                placeholder="Correo Electrónico"
                                className="p-2 rounded-md"
                            />

                            <p className="text-orange-cei">Año de ingreso</p>
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

                        <h3 className="text-2xl">Calificaciones</h3>
                        <FieldArray
                            name="calificaciones"
                            render={({ remove, push }) => (
                                <div className="bg-gray-200 p-8 mt-3 rounded-xl">
                                    {values.calificaciones.map((calificacion, index) => (
                                        <div key={index} className="mb-4 p-4 shadow rounded bg-white">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className='grid grid-cols-4 gap-x-4 '>
                                                    <p className="text-orange-cei">Grado Escolar</p>
                                                    <p className="text-orange-cei">Promedio</p>
                                                    <p className="text-orange-cei">Año Académico</p>
                                                    <p className="text-orange-cei">Semestre</p>
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
                                                <button type='button' onClick={() => toggleExpand(index)} className="p-2 bg-blue-500 text-white rounded-md">
                                                    {expandedIndices.has(index) ? "Ocultar Detalles" : "Mostrar Detalles"}
                                                </button>
                                            </div>
                                            {expandedIndices.has(index) && (
                                                <div className='border-4 p-2  border-solid'>
                                                    <h3 className="text-lg text-center m-2 font-semibold">Materias</h3>
                                                    <div className="grid grid-cols-1 gap-x-4 gap-y-3 w-3/6">
                                                        <FieldArray
                                                            name={`calificaciones.${index}.materias`}
                                                            render={({ push, form }) => (
                                                                <>
                                                                    {calificacion.materias.map((materia, subIndex) => (
                                                                        <div key={subIndex} className="flex items-center space-x-3">
                                                                            <Autocomplete
                                                                                id={`grouped-materia-${index}-${subIndex}`}
                                                                                options={materiaOptions.sort((a, b) => -b.nombreBloque.localeCompare(a.nombreBloque))}
                                                                                groupBy={(option) => option.nombreBloque}
                                                                                getOptionLabel={(option) => option.nombreMateria}
                                                                                style={{ width: 300 }}
                                                                                onChange={(event, value) => {
                                                                                    form.setFieldValue(`calificaciones.${index}.materias.${subIndex}.nombreMateria`, value ? value.nombreMateria : '');
                                                                                }}
                                                                                renderInput={(params) => (
                                                                                    <TextField {...params} name={`calificaciones.${index}.materias.${subIndex}.nombreMateria`} placeholder="Nombre de Materia" className="p-2 rounded-md border flex-grow" />
                                                                                )}
                                                                                renderGroup={(params) => (
                                                                                    <div key={params.key} style={{ margin: '10px 0' }}>
                                                                                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem', backgroundColor: '#f4f4f4', padding: '5px 10px', borderRadius: '4px' }}>{params.group}</p>
                                                                                        <ul>{params.children}</ul>
                                                                                    </div>
                                                                                )}
                                                                                renderOption={(props, option) => (
                                                                                    <li {...props} style={{ paddingLeft: '30px' }}>{option.nombreMateria}</li>
                                                                                )}
                                                                            />
                                                                            <Field name={`calificaciones.${index}.materias.${subIndex}.nombreMateria`} className="p-2 rounded-md border w-42" />
                                                                            <Field name={`calificaciones.${index}.materias.${subIndex}.calificacion`} type="number" placeholder="Calificación" className="p-2 rounded-md border w-24" />
                                                                        </div>
                                                                    ))}
                                                                    <button type='button' onClick={() => push({ nombre: '', calificacion: 0 })} className="p-2 bg-green-500 text-white rounded-md ">
                                                                        Añadir Materia
                                                                    </button>
                                                                </>
                                                            )}
                                                        />

                                                        <p className="text-sm text-gray-600 font-semibold">Promedio Calculado: {calculoPromedio(calificacion.materias)}</p>
                                                    </div>
                                                </div>
                                            )}
                                            <button type="button" onClick={() => remove(index)} className="mt-2 p-2 bg-red-500 text-white rounded-md">
                                                Eliminar Calificación
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => push({ gradoEscolar: '', promedio: 0, periodo: '', materias: [] })} className="mt-2 p-2 bg-blue-500 text-white rounded-md w-52">
                                        Añadir Calificación
                                    </button>
                                </div>
                            )}
                        />

                        {isModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                                    {bloques.map((bloque, i) => (
                                        <div key={i}>
                                            <h3>{bloque.nombreBloque}</h3>
                                            {bloque.materias.map(materia => (
                                                <p key={materia} onClick={() => selectMateria(materia)}>{materia}</p>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <h3 className="text-2xl">Datos escolares</h3>
                        <FieldArray
                            name="datosEscolares"
                            render={(arrayHelpers) => (
                                <div className="bg-white p-8 my-3 rounded-xl shadow-xl">
                                    <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                                        {values.datosEscolares.map((dato, index) => (
                                            <React.Fragment key={index}>
                                                <p className="text-orange-cei">Escuela Actual</p>
                                                <p className="text-orange-cei">Carrera/Especialidad</p>
                                                <p className="text-orange-cei">Turno</p>

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
                                                    name={`datosEscolares.${index}.turno`}
                                                    placeholder="Turno"
                                                    className="p-2 rounded-md"
                                                />
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


                        <h3 className="text-2xl">Artículo</h3>
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

                        <h3 className="text-2xl">Tequios</h3>
                        <FieldArray
                            name="tequios"
                            render={arrayHelpers => (
                                <div className='bg-gray-100 p-8 mt-3 rounded-xl'>
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

                        <h3 className="text-2xl">Padres</h3>

                        <FieldArray
                            name="familiares"
                            render={(arrayHelpers) => (
                                <div className="bg-gray-200 p-8 mt-3 rounded-xl">
                                    <div className="grid grid-cols-3 gap-x-3 gap-y-3">
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

                        <h3 className="text-2xl">Contactos</h3>
                        <FieldArray
                            name="contactos"
                            render={arrayHelpers => (
                                <div className='bg-gray-100 p-8 mt-3 rounded-xl'>
                                    <div className='grid grid-cols-4 gap-x-4 gap-y-3'>
                                        <p className='text-orange-cei col-span-1'>Nombre</p>
                                        <p className='text-orange-cei col-span-1'>Teléfono</p>
                                        <p className='text-orange-cei col-span-2'>Notas</p>
                                        {values.contactos.map((contacto, index) => (
                                            <Fragment key={index}>
                                                <Field name={`contactos.${index}.nombre`} placeholder="Nombre" className="p-2 rounded-md" />
                                                <Field name={`contactos.${index}.telefono`} placeholder="Teléfono" className="p-2 rounded-md" />
                                                <Field name={`contactos.${index}.notas`} placeholder="Notas" className="p-2 rounded-md col-span-2" />
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                    className="col-span-4 text-red-500 w-60"
                                                >
                                                    Eliminar Contacto
                                                </button>
                                            </Fragment>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.push({ nombre: '', telefono: '', direccion: '', colonia: '', notas: '' })}
                                            className="col-span-4 mt-2 p-2 bg-blue-500 text-white rounded-md w-60"
                                        >
                                            Añadir Contacto
                                        </button>
                                    </div>
                                </div>
                            )}
                        />

                        <h3 className="text-2xl mt4">Padrinos Actuales</h3>

                        <div className='mt4'>
                            <div className="mt-5">
                                <h3 className="text-xl font-bold mb-3">Información de Padrinos</h3>
                                {values.padrinos.length > 0 ? (
                                    values.padrinos.map((padrino, index) => (
                                        <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2 shadow">
                                            <p className="font-semibold">Padrino {index + 1}: {values.padrinosInfo[index].nombre} {values.padrinosInfo[index].apellido}</p>
                                            <div className="grid grid-cols-3 gap-4 mt-4 mb-2">
                                                <div>
                                                    <label className="text-gray-600">Fecha de Inicio</label>
                                                    <Field
                                                        name={`padrinos[${index}].fechaInicio`}
                                                        type="date"
                                                        className="form-input mt-1 block w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-gray-600">Fecha de Fin</label>
                                                    <Field
                                                        name={`padrinos[${index}].fechaFin`}
                                                        type="date"
                                                        className="form-input mt-1 block w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-gray-600">Estatus</label>
                                                    <Field
                                                        as="select"
                                                        name={`padrinos[${index}].estatus`}
                                                        className="form-select mt-1 block w-full"
                                                    >
                                                        <option value={true}>Activo</option>
                                                        <option value={false}>Inactivo</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : <p>No hay padrinos asignados aún.</p>}
                            </div>

                            <h3 className="text-2xl mt-8">Agregar Nuevo Padrino</h3>
                            <input
                                type="text"
                                placeholder="Buscar padrino..."
                                className="p-2 rounded-md mt-4"
                                value={busqueda}
                                onChange={handleInputChange}
                            />
                            <button type="button" onClick={handleSearchClick} className="p-2 bg-blue-500 text-white rounded-md">Buscar</button>
                            {isLoadingSearch && <p>Cargando...</p>}
                            {isErrorSearch && <p>Error en la búsqueda: {errorSearch.message}</p>}
                            {resultados && resultados.map((padrino) => (
                                <div key={padrino._id} className="flex flex-col bg-gray-100 p-4 mt-2 rounded-xl">
                                    <p>{padrino.nombre} {padrino.apellido}</p>
                                    <button onClick={() => handleSelectPadrino(padrino)} type='button' className="p-2 bg-blue-300 text-white rounded-md">Seleccionar</button>
                                </div>
                            ))}
                            {selectedPadrino && (
                                <>
                                    <p>Padrino Seleccionado: {selectedPadrino.nombre} {selectedPadrino.apellido}</p>
                                    <div className='grid grid-cols-3'>
                                        <label className="text-gray-600">Fecha de Inicio</label>
                                        <label className="text-gray-600">Fecha de Fin</label>
                                        <label className="text-gray-600">Estatus</label>
                                        <Field type="date" name="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="p-2 rounded-md" />
                                        <Field type="date" name="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} className="p-2 rounded-md" />
                                        <Field as="select" name="estatus" value={estatusPadrino} onChange={(e) => setEstatusPadrino(e.target.value === 'true')} className="p-2 rounded-md">
                                            <option value="true">Activo</option>
                                            <option value="false">Inactivo</option>
                                        </Field>
                                    </div>
                                </>
                            )}
                        </div>

                        <button type="submit" className=" mt-16 bg-green-500 text-white p-2 rounded">Actualizar Niño</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EditNinoForm;
// 