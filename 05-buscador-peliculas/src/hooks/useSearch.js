import { useEffect, useRef, useState } from "react"


export function useSearch () {

const [search, setSearch] = useState ('') 
const [error, setError] = useState(null)

const isFirstInput = useRef(true) //sirve para que el valor persista entre renderizados

    useEffect(()=>{

        if(isFirstInput.current){
            isFirstInput.current = search === ''
            return
        }

        if (search === ''){
         setError('No se puede buscar una pelicuala vacía')
         return
        }
    
        if(search.match(/^\d+$/)){
          setError('No se puede buscar la pelicula por un nuemero')
          return
        }
    
        setError(null)
      },[search])

      return {search, setSearch, error}
}
