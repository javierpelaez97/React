import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";

function App() {
  
  const {search, setSearch, error} = useSearch()
  const {movies, getMovies} = useMovies({search})
  

 
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
    
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
    
  }

  

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form onSubmit={handleSubmit} >
          <input required value={search} name="query" onChange={handleChange}  placeholder="Avenger, StarWars ..."></input>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{color : 'red'}}>{error}</p>}
      </header>
      <main> <Movies movies= {movies} ></Movies></main>
    </div>
  );
}

export default App;
