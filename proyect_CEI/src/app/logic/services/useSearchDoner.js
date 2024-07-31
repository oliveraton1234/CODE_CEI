
import { useQuery } from 'react-query';
import axios from 'axios';
import api_base_url from '../../configs/api_basse_url';

const useSearchDoner = (nombre,shouldFetch) => {
    return useQuery(
        ['searchDonor', nombre],
        () => axios.get(`${api_base_url}/donadores/search/byName`, {
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