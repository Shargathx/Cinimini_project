import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './assets/pages/Homepage'
import CategoryGame from './assets/pages/CategoryGame'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/:id' element={<CategoryGame />} />
        <Route path='/category/:id' element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
