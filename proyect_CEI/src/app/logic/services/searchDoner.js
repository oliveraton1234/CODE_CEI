import axios from "axios";
import api_base_url from "../../configs/api_basse_url";

export const buscarDonante = async (nombre, categoriasParaBuscar) => {
    const response = await axios.get(`${api_base_url}/donadores/`, {
        params: {
        nombre,
        categorias: categoriasParaBuscar,
        },
    });
    return response.data;
}