import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const buscarDonante = async (nombre, categoriasParaBuscar) => {
    const response = await axios.get(`${API_BASE_URL}/donadores/`, {
        params: {
        nombre,
        categorias: categoriasParaBuscar,
        },
    });
    return response.data;
}