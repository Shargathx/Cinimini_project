import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CategoryGame from './assets/pages/CategoryGame'
import Categories from './assets/pages/Categories'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './assets/pages/Home'
import AddGame from './assets/pages/AddGame'
import EditView from './components/edit-game/EditView'
import Register from './components/login-components/Register'
import Login from './components/login-components/Login'
import GamePage from './assets/pages/GamePage'

function App() {
  return (
    <BrowserRouter>
      <div style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh" // makes the container full viewport height
      }}>
        <Header />

        <main style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/categories/:catid' element={<CategoryGame />} />
            <Route path='/categories/:catid/:id' element={<GamePage />} />
            <Route path='/add-game' element={<AddGame />} />
            <Route path='/update-game/:id' element={<EditView />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
