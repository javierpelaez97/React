import { useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";

function App() {
  
  const[sort, setSort] = useState(false)
  const {search, setSearch, error} = useSearch()
  const {movies, loading,  getMovies} = useMovies({search, sort})
  

 
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(search)
    
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value

    setSearch(newSearch)
    getMovies({search: newSearch})
    
  }

  

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form onSubmit={handleSubmit} >
          <input required value={search} name="query" onChange={handleChange}  placeholder="Avenger, StarWars ..."></input>
          <label>Ordenar [A/Z]</label>
          <input type="checkbox" onChange={handleSort} checked={sort}></input>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{color : 'red'}}>{error}</p>}
      </header>
      <main> {loading ? <p>Cargando.. </p> : <Movies movies= {movies} ></Movies>}</main>
    </div>
  );
}

export default App;
