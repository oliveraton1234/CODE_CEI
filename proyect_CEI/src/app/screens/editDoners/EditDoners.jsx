import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import { initialValuesEditDonador, validationSchemaEditDonador } from './components/FormComplementsEditDoner';
import useUpdateDonador from '../../logic/services/EditDonador';
import axios from 'axios';
import api_base_url from '../../configs/api_basse_url';

function EditDoners() {

    const doner = useSelector((state) => state.doner.doner);
    const { mutate: updateDonador } = useUpdateDonador();

    const handleSubmit = async (values) => {
        updateDonador({ id: doner._id, ...values });
    }

    const deleteDoner = async() => {
        try{
            await axios.delete(`${api_base_url}/donadores/${doner._id}`);
            alert('Donador eliminado');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-10 bg-camell-cei h-screen ">
            <Formik
                initialValues={doner || initialValuesEditDonador}
                validationSchema={validationSchemaEditDonador}
                onSubmit={handleSubmit}
                
            >
                <Form>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-4xl">Editar Nuevo Donador</h1>
                        <button 
                            className="bg-red-500 text-white p-2 rounded mr-10"
                            onClick={() => deleteDoner()}
                        >
                            Eliminar
                        </button>
                    </div>

                    <div className="bg-gray-200 p-8 mt-10 mx-10 grid grid-cols-4 gap-3 rounded-xl shadow-lg ">

                        <label className="text-orange-cei ml-3">Nombre</label>


                        <label className="text-orange-cei ml-3">Apellido</label>
                        <label className="text-orange-cei ml-3">Correo Electrónico</label>
                        <label className="text-orange-cei ml-3">Teléfono</label>

                        <Field name="nombre" placeholder="Nombre" className="p-2 rounded-md" />
                        <Field name="apellido" placeholder="Apellido" className="p-2 rounded-md" />
                        <Field name="correoElectronico" placeholder="Correo Electrónico" className="p-2 rounded-md" />
                        <Field name="telefono" placeholder="Teléfono" className="p-2 rounded-md" />

                        <label className="text-orange-cei ml-3">Dirección</label>
                        <label className="text-orange-cei ml-3">Ciudad</label>
                        <label className="text-orange-cei ml-3">Estado</label>
                        <label className="text-orange-cei ml-3">Código Postal</label>

                        <Field name="direccion" placeholder="Dirección" className="p-2 rounded-md" />
                        <Field name="ciudad" placeholder="Ciudad" className="p-2 rounded-md" />
                        <Field name="estado" placeholder="Estado" className="p-2 rounded-md" />
                        <Field name="codigoPostal" placeholder="Código Postal" className="p-2 rounded-md" />


                        <label className="text-orange-cei ml-3">País</label>
                        <label className="text-orange-cei ml-3">Nombres Asociados</label>
                        <label className="text-orange-cei ml-3 col-span-2">Observaciones</label>
                        <Field name="pais" placeholder="País" className="p-2 rounded-md" />


                        <Field name="nombresAsociados" placeholder="Nombres Asociados" className="p-2 rounded-md" />
                        <Field name="observaciones" as="textarea" placeholder="Observaciones" className=" col-span-2 rounded-md " />

                    </div>

                    <button type="submit" className="mt-6 ml-5 w-28 text-lg bg-blue-500 text-white p-2 rounded">Editar</button>
                </Form>
            </Formik>
        </div>
    )
}

export default EditDoners;