
import { useQuery } from 'react-query';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useSearchDoner = (nombre,shouldFetch) => {
    return useQuery(
        ['searchDonor', nombre],
        () => axios.get(`${API_BASE_URL}/donadores/`, {
            params: { nombre }
        }).then(res => res.data),
        {
            enabled: !!nombre && shouldFetch, 
            keepPreviousData: true,
            retry: false, 
            refetchOnWindowFocus: false
        }
    );
}

export default useSearchDoner;