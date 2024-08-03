
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { setNino } from '../Redux/actions/ninoAction';
import { useDispatch } from 'react-redux';

const useEditNino = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { mutateAsync, isLoading, isError, error } = useMutation(
        async ({ id, ...data }) => {
            const response = await axios.put(`${API_BASE_URL}/ninos/edit/${id}`, data);  
            console.log("Datos guardados:", response.data);
            return response.data;
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries('ninos');
                dispatch(setNino(data));
            }
        }
    );

    return { updateNino: mutateAsync, isLoading, isError, error };
};

export default useEditNino;
