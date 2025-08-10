import { useEffect, useState} from "react"



export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    if (!fact) return;
    const firstWord = fact.split(" ").join(" ");

    fetch(
      `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact]);

  return { imageUrl };
}