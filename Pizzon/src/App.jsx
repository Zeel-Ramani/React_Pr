import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Benner, { Main } from './Pizzon/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Benner />
      <Main />
    </div>
  )
}

export default App;