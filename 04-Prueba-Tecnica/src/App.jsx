import "./App.css";
import { getRandomFact } from "./services/facts";
import { useCatImage } from "./hooks/useCatImage";
import { useCatFact } from "./hooks/useCatFact";
import { Otro } from "./components/otro";
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`

/* Es un hook personalizado que nos permite traer el estado de la imagen y de la imagen y que podemos traer el del texto */
export function App() {


  const {fact, refreshFact} = useCatFact()
  const { imageUrl } = useCatImage({ fact });



  const handleClick = async () => {
    refreshFact()

  };

  return (
    <main>
      <h1>APP de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Image extracted useng the first word ${fact}`}
          ></img>
        )}
      </section>
      
    </main>
  );
}
