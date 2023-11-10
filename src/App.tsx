import Navigation from './components/Navigation'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default App
