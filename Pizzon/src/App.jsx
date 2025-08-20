import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Benner, { Footer, Main } from './Pizzon/Home';

function App() {
  return (
    <div>
      <Benner />
      <Main />
      <Footer />
    </div>
  )
}

export default App;