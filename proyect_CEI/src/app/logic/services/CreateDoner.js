import { useMutation } from 'react-query';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useCreateDonador = () => {
    return useMutation(
        (newDonador) => axios.post(`${API_BASE_URL}/donadores/create`, newDonador),
        {
            onSuccess: (data) => {
                alert("Donador creado exitosamente");
            },
            onError: (error) => {
                alert("Error al crear el donador");
            }
        }
    );
};

export default useCreateDonador;