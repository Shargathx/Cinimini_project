import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CategoryGame from './assets/pages/CategoryGame'
import Categories from './assets/pages/Categories'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './assets/pages/Home'
import AddGame from './assets/pages/AddGame'
import Game from './assets/pages/Game'

function App() {
  return (
    <BrowserRouter>
    {/* stiil tuleks pärast eraldi .css faili teha */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh" // makes the container full viewport height
      }}>
        <Header />

        {/* stiil tuleks pärast eraldi .css faili teha */}
        <main style={{ flex: 1, padding: "20px" }}> 
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/categories/:catid' element={<CategoryGame />} />
            <Route path='/categories/:catid/:id' element={<Game />} />
            <Route path='/add-game' element={<AddGame />} />
            <Route path='/update-game/:id' element={<AddGame/>}/>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
