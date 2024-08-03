import axios from 'axios';
const  = import.meta.env.VITE_;

export const buscarNinos = async (nombre, categoriasParaBuscar) => {
  
    const response = await axios.get(`${}/ninos/`, {
      params: {
        nombre,
        categorias: categoriasParaBuscar
      }
    });
    return response.data;
};
