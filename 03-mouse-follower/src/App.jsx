import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [enabled, setEnable] = useState(false)
  const [position, setPosition] = useState({x:0, y:0})
  const activePointer = () =>{
    return setEnable(!enabled)
  }

  useEffect(()=>{
    console.log('Renderizando',enabled);

    const handleMove = (event) => {
      const {clientX, clientY} = event
      console.log('Posicion', clientX, clientY);
      setPosition({x:clientX, y:clientY})
    }
    if(enabled){
      window.addEventListener('pointermove', handleMove)
    }

    return() => {
      window.removeEventListener('pointermove', handleMove)
    }  //Para limpiar el efecto
  }, [enabled])

  return (
    <main>
      {enabled? <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)` 
      }}
      />: <div></div>}
      <button onClick={activePointer}> 
      {enabled ? 'Desactivar ' : 'Activar '}
      Seguir puntero</button>
    

    </main>
  )
}

export default App
