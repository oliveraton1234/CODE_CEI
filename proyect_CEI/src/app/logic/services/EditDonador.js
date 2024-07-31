import { useMutation } from 'react-query';
import axios from 'axios';
import api_base_url from '../../configs/api_basse_url';

const useUpdateDonador = () => {
    return useMutation(
        ({ id, ...data }) => axios.put(`${api_base_url}/donadores/edit/${id}`, data),
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