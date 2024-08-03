import { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, FieldArray } from 'formik';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import NavBarLogged from '../../shared/components/NavBarLogged';

const BloquesForm = () => {
    const [bloques, setBloques] = useState([]);

    useEffect(() => {
        const fetchBloques = async () => {
            const result = await axios.get(`${API_BASE_URL}/bloques/getAllBlocks`);
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

    const eliminarBloque = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/bloques/deleteOneBlock/${id}`);
            alert('Bloque eliminado');
            const bloquesActualizados = bloques.filter((bloque) => bloque._id !== id);
            setBloques(bloquesActualizados);
        } catch (error) {
            alert('Error al eliminar el bloque');
        }
    };
    

    return (
        <div className='bg-camell-cei h-screen'>
            <NavBarLogged color={'camell'} />
            <div className='mx-10'>
                <button onClick={agregarNuevoBloque} className="bg-blue-500 text-white p-2 rounded mb-4">
                    Agregar Nuevo Bloque
                </button>
                <div className="flex flex-wrap overflow-x-auto overflow-y-auto ">
                    {bloques.map((bloque, index) => (
                        <Formik
                            key={index}
                            initialValues={bloque}
                            onSubmit={async (values) => {
                                if (bloque._id) {
                                    await axios.put(`${API_BASE_URL}/bloques/updateBlock/${bloque._id}`, values);
                                } else {
                                    const response = await axios.post(`${API_BASE_URL}/bloques/createBlock`, values);
                                    bloque._id = response.data._id;
                                }
                                alert('Cambios guardados');
                            }}
                        >
                            {({ values }) => (  
                                <Form className="min-w-max p-4 mr-4 mb-5 bg-white shadow-xl rounded"> 
                                    <h2 className="text-2xl font- bold mt-3">Bloque {index + 1}</h2>
                                    <h2 className='font-medium my-2'>Titulo: <Field name="nombreBloque" placeholder="Nombre del Bloque" className="p-2 rounded-md border" /></h2>
                                    <FieldArray
                                        name="materias"
                                        render={arrayHelpers => (
                                            <div >
                                                {values.materias && values.materias.length > 0 ? (
                                                    values. materias.map((materia, i) => (
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
                                    <button className='bg-red-500 text-white p-2 rounded mt-3 ' type="button" onClick={() => eliminarBloque(values._id)} >Eliminar</button>
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
