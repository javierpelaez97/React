import { useState } from "react";

export function useMovies({search}){

    const [responseMovies, setResponseMovies] = useState([])
    const movies = responseMovies.Search;

    //Para no guardar todos los datos con lo que nos obliga la API
  const mappedMovies = movies?.map (movie => ({
    id: movie.imdbID,
    title:movie.Title,
    year: movie.Year,
    img: movie.Poster

  }))

  const getMovies = () => {
    if(search) {
      fetch(`https://www.omdbapi.com/?apikey=87affe2e&s=${search}`)
      .then(res => res.json())
      .then(json => {
        setResponseMovies(json)
      })
    }else{
      setResponseMovies()
    }
  }

  return{movies : mappedMovies, getMovies}
 }