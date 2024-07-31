import axios from 'axios';
import api_base_url from '../../configs/api_basse_url';

const CreateNinoService = async (values) => {
    const response = await axios.post(`${api_base_url}/ninos/create`, values);
    return response.data;
  };


export default CreateNinoService;