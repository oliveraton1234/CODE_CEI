import { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, FieldArray } from 'formik';
import api_base_url from '../../configs/api_basse_url';
import NavBarLogged from '../../shared/components/NavBarLogged';

const BloquesForm = () => {
    const [bloques, setBloques] = useState([]);

    useEffect(() => {
        const fetchBloques = async () => {
            const result = await axios.get(`${api_base_url}/bloques/getAllBlocks`);
            setBloques(result.data);
        };
        fetchBloques();
    }, []);

    const agregarNuevoBloque = () => {
        const nuevoBloque = {
            nombreBloque: "",
            materias: []
        };
        setBloques([...bloques, nuevoBloque]);
    };

    const eliminarBloque = (index) => {
        const bloquesActualizados = bloques.filter((bloque, i) => i !== index);
        setBloques(bloquesActualizados);
    };

    return (
        <div className='bg-camell-cei h-screen'>
            <NavBarLogged color={'camell'} />
            <div className='mx-10'>
                <button onClick={agregarNuevoBloque} className="bg-blue-500 text-white p-2 rounded mb-4">
                    Agregar Nuevo Bloque
                </button>
                <div className="flex flex-wrap overflow-x-auto">
                    {bloques.map((bloque, index) => (
                        <Formik
                            key={index}
                            initialValues={bloque}
                            onSubmit={async (values) => {
                                if (bloque._id) {
                                    await axios.put(`${api_base_url}/bloques/updateBlock/${bloque._id}`, values);
                                } else {
                                    const response = await axios.post(`${api_base_url}/bloques/createBlock`, values);
                                    bloque._id = response.data._id;
                                }
                                console.log('Bloque guardado:', values);
                            }}
                        >
                            {({ values }) => (  
                                <Form className="min-w-max p-4 mr-4 bg-white shadow-xl rounded"> 
                                    <h2 className="text-2xl font- bold mt-3">Bloque {index + 1}</h2>
                                    <h2 className='font-medium my-2'>Titulo: <Field name="nombreBloque" placeholder="Nombre del Bloque" className="p-2 rounded-md border" /></h2>
                                    <FieldArray
                                        name="materias"
                                        render={arrayHelpers => (
                                            <div >
                                                {values.materias && values.materias.length > 0 ? (
                                                    values.materias.map((materia, i) => (
                                                        <div key={i} className="flex items-center space-x-2">
                                                            <Field name={`materias.${i}`} placeholder="Nombre de Materia" className="p-2 rounded-md border my-1" />
                                                            <button type="button" onClick={() => arrayHelpers.remove(i)} className="bg-red-500 text-white p-1 rounded">
                                                                -
                                                            </button>
                                                            <button type="button" onClick={() => arrayHelpers.insert(i + 1, '')} className="bg-green-500 text-white p-1 rounded">
                                                                +
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <button type="button" onClick={() => arrayHelpers.push('')} className="bg-green-500 text-white p-2 rounded">
                                                        Añadir Materia
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    />
                                    <button className='bg-green-500 text-white p-2 rounded mt-3 ' type="submit">Guardar Cambios</button>
                                    <button className='bg-red-500 text-white p-2 rounded mt-3 ' type="button" onClick={() => eliminarBloque()} >Eliminar</button>
                                </Form>
                            )}
                        </Formik>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default BloquesForm;
