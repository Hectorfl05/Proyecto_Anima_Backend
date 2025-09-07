import { useState } from 'react'
import './App.css'
import ItemList from './components/Items.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>      
  <ItemList />
    </>
  )
}

export default App
