import { useEffect, useState } from "react"
import './App.css'
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export function App () {

    const [fact, setFact ] = useState()

    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => res.json())
        .then(data => {
            const {fact} = data 
            setFact(fact)
            const firstWord = fact.split(' ').join(' ')
            
            fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`)
            .then(res => res.json())
            .then(response =>{
                
                const {url} = response
                setImageUrl(url)
            } )
           }) 

    },[]) //<- En las dependencias debemos poner lo que se modifica y para que lo recarge, sino se reacargara una vez por cada refresh



    return(
        <main>
            <h1>APP de gatitos</h1>
            <section>

                {fact && <p>{fact}</p>}
                {imageUrl && <img src={imageUrl} alt={`Image extracted useng the first word ${fact}`}></img>}

            </section>
        </main>
    )
}
