import { useEffect, useState } from "react"

const FollowMouse = () => {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({x:0, y:0})

  useEffect(() => {
    console.log('effect',{enable})

    const handleMove = (event) => {
      const {clientX, clientY} = event
      console.log('handleMove',{clientX, clientY})  
      setPosition({x: clientX, y: clientY})
    }
    if (enable){
      window.addEventListener('pointermove',handleMove)
    }

    return () => {
      console.log('cleanup')
      window.removeEventListener('pointermove',handleMove)
      setPosition({x:0, y:0})
    }
  },[enable])

  return (
    <>
    <div style={{
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.5)',
      border: '1px solid white',
      borderRadius : '50%',
      opacity: 0.8,
      pointerEvents: 'none',
      left: -25,
      top: -25,
      width: 50,
      height: 50,
      transform: `translate(${position.x}px,${position.y}px)`
    }}/>
    <button onClick={() => setEnable(!enable)}>{enable ? 'Desactivar':'Activar'} seguimiento</button>
    </>
  )
}

function App() {
  const [mounted, setMounted] = useState(true)
  return(
  <main>
    {mounted && <FollowMouse/>}
    <button onClick={() => setMounted(!mounted)}>{mounted ? 'Desmontar':'Montar'} componente</button>
  </main>
  )
}

export default App