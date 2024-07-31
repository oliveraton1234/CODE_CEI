import lupa from "../../../../assets/images/lupa.png";
import agregar from "../../../../assets/images/agregar.png";
import { useState } from "react";
import CardNinos from "../../../shared/cards/NinosCard";

import { useNavigate } from "react-router-dom";
import { buscarDonante } from "../../../logic/services/searchDoner";
import { useDispatch } from "react-redux";
import { setDoner } from "../../../logic/Redux/actions/donerAction";

function SearchDoners() {
  const [nombre, setNombre] = useState("");
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [ninos, setNinos] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categorias = ["Nombre", "Apellidos", "Direccion", "Ciudad", "Estado", "Pais"];

  const handleCategoryClick = (categoria) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(categoria)
        ? prev.filter((c) => c !== categoria)
        : [...prev, categoria]
    );
  };

  const categoriaClaves = {
    Nombre: "nombre",
    Apellidos: "apellido",
    Direccion: "direccion",
    Ciudad: "ciudad",
    Estado: "estado",
    Pais: "pais",
};

const handleSearchClick = async () => {
  const categoriasQuery = categoriasSeleccionadas
    .map((categoria) => categoriaClaves[categoria])
    .filter(Boolean)
    .join(",");

  if (nombre.trim() || categoriasQuery) {
      try {
          const resultados = await buscarDonante(nombre, categoriasQuery);
          setNinos(resultados);
      } catch (error) {
          console.error("Hubo un error al realizar la búsqueda:", error);
      }
  } else {
      alert(
          "Por favor, ingrese un nombre o seleccione al menos una categoría para buscar."
      );
  }
};

  const handleNinoClicked = (nino) => {
    dispatch(setDoner(nino));
    navigate("/edit-donors");
  };

  const handleCreateClick = () => {
    navigate("/create-donors");
  };

  return (
    <>
      <h1 className="text-4xl mx-96 mb-1 ">Donadores</h1>
      <div className="flex justify-center space-x-4 p-4 bg-camell-cei ">
        <div className="w-6/12 h-16 flex space-x-3 bg-white rounded-lg shadow">
          <span className="text-gray-400 mx-2 pt-3" onClick={handleSearchClick}>
            <img className="w-10 cursor-pointer" alt="lupa" src={lupa} />
          </span>
          <input
            className="py-2 rounded-lg focus:outline-none w-full text-xl"
            type="text"
            placeholder="Ingrese el nombre a buscar"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <button
          onClick={handleCreateClick}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg shadow hover:border-orange-cei hover:border-2"
        >
          <span className="text-gray-600 mr-2">
            <img className="w-10 " alt="lupa" src={agregar} />
          </span>
          Agregar
        </button>
      </div>
      <div className="justify-center mt-6 flex space-x-2 bg-camell-cei">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => handleCategoryClick(categoria)}
            className={`px-4 py-2 text-black rounded-lg shadow focus:outline-none ${
              categoriasSeleccionadas.includes(categoria)
                ? "bg-orange-cei text-white"
                : "bg-transparent hover:border-orange-cei hover:border-2"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="my-12 mx-40">
        {ninos?.map((nino) => (
          <div
            className="cursor-pointer "
            key={nino._id}
            onClick={() => handleNinoClicked(nino)}
          >
            <CardNinos
              key={nino.id}
              nombre={nino.nombre + ' ' + nino.apellido}
              correoElectronico={nino.correoElectronico}
              color={nino.color}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchDoners;
