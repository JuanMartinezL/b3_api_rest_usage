import { useEffect, useState } from "react";
import axios from "axios";

export const FuturamaCharacters = () => {
  // Estado para almacenar los personajes
  const [characters, setCharacters] = useState([]);

  // Estado para manejar posibles errores
  const [error, setError] = useState(null);

  // Estado para controlar la carga
  const [loading, setLoading] = useState(true);

  // Método para hacer la solicitud a la API con Axios
  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.sampleapis.com/futurama/characters");
      setCharacters(response.data);
      setLoading(false);  // Ya se recibieron los datos, desactivar el loading
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  // useEffect ejecuta fetchData la primera vez que se monta el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Si hay error, mostramos el mensaje de error
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  // Si está cargando, mostramos un mensaje de "Loading..."
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white mb-4">Futurama Characters</h2>
      <div className="row overflow-auto vh-80" style={{ maxHeight: "80vh", overflowY: "scroll" }}>
        {characters.map((character, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 d-flex flex-column">
              <img
                src={character.images.main}
                className="card-img-top img-fluid object-fit-cover"
                alt={character.name.first}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {character.name.first} {character.name.middle} {character.name.last}
                </h5>
                <p className="card-text">Species: {character.species}</p>
                <p className="card-text">Age: {character.age || "Unknown"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
