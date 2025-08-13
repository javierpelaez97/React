import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState([])

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
    .then(res => res.json()
    .then(res = setData)
  )
  },[])

  
  
   const handleClick = () =>{
    const selected = data[0].selected

    console.log(selected);
    
    
  }
   
  
  return (
    <main>
      <h1>TODO</h1>
      <form>
        <input type="text" placeholder='Añadir tarea' />
        <button>Añadir</button>
      </form>
      <ul>
        {
          data.map((res)=>(
            <li key={res.id}>
              <h3>{res.title}</h3>
              {res.selected? <button onClick={handleClick}>❌</button> :
              <button>✅</button>}
            </li>
            ))}

      </ul>
    </main>
    
  )
}

export default App
