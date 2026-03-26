import { useState } from 'react'
import Navbar from './components/Navbar';
import Memoria from './pages/Memoria'
import Kviz from './pages/Kviz'
import './App.css'

function App() {
  const [menu, setMenu] = useState('memory')

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h1>Minijátékok</h1>

      <Navbar menu={menu} setMenu={setMenu} />

      {menu === 'memory' && <Memoria />}
      {menu === 'quiz' && <Kviz />}
    </div>
  )
}

export default App