import { useEffect,useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const CAT_ENPOINT_IMAGE_URL= `https://cataas.com/cat/says/${firtstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

function App() {
  const [fact, setFact] = useState()
  const [imageURL, setImageURL] = useState()

  const handleClick = () => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(response => response.json())
      .then((data) => {
        const {fact } = data
        setFact(fact)
      })
  }



  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(response => response.json())
      .then((data) => {
        const {fact } = data
        setFact(fact)
      })
    /*
    Fecth con async/await

    async function getRandomFact () {
      const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
      const json = await res.json()
      setFact(json.fact)
    }

    getRandomFact()
    */
  }, [])

  useEffect(() => {
    if (!fact) return
      const threeFirstWords = fact.split(' ',3).join(' ')
      console.log(threeFirstWords)
      fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response =>{
        const {_id} = response
        const url = `/cat/${_id}/says/${threeFirstWords}`
        setImageURL(url)
    })
  },[fact])

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageURL && <img src={`${CAT_PREFIX_IMAGE_URL}${imageURL}`} alt={`Image extrated using the first three words for ${fact}`} />}
    </main>
  )
}

export default App
