import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const buscarNinos = async (nombre, categoriasParaBuscar) => {
  
    const response = await axios.get(`${API_BASE_URL}/ninos/`, {
      params: {
        nombre,
        categorias: categoriasParaBuscar
      }
    });
    return response.data;
};
