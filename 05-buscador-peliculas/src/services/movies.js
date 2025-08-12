const API_KEY = "87affe2e";



/* Un servicio para poder buscar las peliculas 
-Primero indicamos que si está vacío no haga nada
-Try para que pruebe si podemos conectarnos a la api
-Una vez conectados lo pasamos a json y le decimos que busque
-Despues creamos un nuevo nombre para los datos recogidos */
export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );
    const json = await response.json();

    const movies = json.Search;

    //Para no guardar todos los datos con lo que nos obliga la API
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      img: movie.Poster,
    }));
  } catch {
    throw new Error("Error searching movies");
  }
};

