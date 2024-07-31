import axios from 'axios';
import api_base_url from '../../configs/api_basse_url';

// Asegúrate de que tu servicio Axios esté configurado correctamente
// services/ninoService.js
export const buscarNinos = async (nombre, categoriasParaBuscar) => {
  
    const response = await axios.get(`${api_base_url}/ninos/`, {
      params: {
        nombre,
        categorias: categoriasParaBuscar
      }
    });
    return response.data;
};
