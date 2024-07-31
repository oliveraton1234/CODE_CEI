
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import api_base_url from '../../configs/api_basse_url';
import { setNino } from '../Redux/actions/ninoAction';
import { useDispatch } from 'react-redux';

const useEditNino = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { mutateAsync, isLoading, isError, error } = useMutation(
        async ({ id, ...data }) => {
            const response = await axios.put(`${api_base_url}/ninos/edit/${id}`, data);  
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
