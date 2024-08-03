import { useMutation } from 'react-query';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useUpdateDonador = () => {
    return useMutation(
        ({ id, ...data }) => axios.put(`${API_BASE_URL}/donadores/edit/${id}`, data),
        {
            onSuccess: (data) => {
                alert("Donador actualizado exitosamente");
            },
            onError: (error) => {
                alert("Error al actualizar el donador");
                console.log(error);
            }
        }
    );
};

export default useUpdateDonador;