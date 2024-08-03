import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateNinoService = async (values) => {
    const response = await axios.post(`${API_BASE_URL}/ninos/create`, values);
    return response.data;
  };


export default CreateNinoService;