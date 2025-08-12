import { useRef, useState, useCallback } from "react";
import { searchMovies } from "../services/movies";


/* Creamos el estado de las peliculas 
-Creamos una funcion asincrona para que no nos pare el programa en el que indicamos 
-Que vamos a traer un objeto json ya funcionando y lo guardamos en el set, 
por ultimo lo pasamos al siguiente componente  */
export function useMovies({search}){

  const [movies, setMovies]= useState([])

  const [loading,setLoading] = useState(false)

  const [error, setError]= useState(null)
  
  const previusSearch = useRef(search) // Guarda el estado anterior y no se modifica
  
  /* El use CallBack hace exactamente lo mismo que el useMemo pero para funciones */
  const getMovies = useCallback( async ({search}) => {
    
      if(search === previusSearch.current) return 
      try{
        setLoading(true)
        setError(null)
        previusSearch.current = search
        const newMovies = await searchMovies({search})
        setMovies(newMovies)
    
      }catch(e){
        setError(e.message)
      }finally{
        //Esto se va a ejecutar tanto en el try como en el Catch
        setLoading(false)
      }
    
    },[])

    
    


  /* Cogemos el estado del componente padre lo guardamos en una nueva constante y 
  le indicamos que si está activado los ordene la lista que recibe si no 
  que nos devuelva la lista tal cual */

  /* const getSortedMovies = () => {
    const sortedMovies = sort 
      ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies
      return sortedMovies
    } */


    /* Sirve para memorizar computaciones que no queremos que se hagan de nuevo  */
    /* const sortedMovies = useMemo(()=> {
      console.log('Renderizando...');
      return sort 
      ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies
    },[sort, movies]) */


    return{movies, getMovies, loading, error, }
 }