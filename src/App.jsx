import { useState } from 'react'
import './App.css'
import MainKonva from './components/MainKonva'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Main Canva</h1>
    <MainKonva />
    </>
  )
}

export default App
