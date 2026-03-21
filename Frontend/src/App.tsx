import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import CategoryGame from './assets/pages/CategoryGame'
import Categories from './assets/pages/Categories'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './assets/pages/Home'

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
        <nav style={{margin: "10px 0"}}>
          {/* <Link to="/"><button>Avaleht</button></Link> */}
          {/* <Link to="/categories"><button>Kategooriad</button></Link> */}
          <Link to="/category/1"><button>Valitud kategooria mängud (ignore this)</button></Link>
          {/* <Link to="/game/:id"><button></button></Link> */}
        </nav>

        {/* stiil tuleks pärast eraldi .css faili teha */}
        <main style={{ flex: 1, padding: "20px" }}> 
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/categories/:id' element={<CategoryGame />} />
            {/* <Route path='/category/:id' element={<Game />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
