import { useMutation } from 'react-query';
import axios from 'axios';
import api_base_url from '../../configs/api_basse_url';

const useCreateDonador = () => {
    return useMutation(
        (newDonador) => axios.post(`${api_base_url}/donadores/create`, newDonador),
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