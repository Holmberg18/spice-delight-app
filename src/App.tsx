import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Home from "@/pages/Home"
import Meals from "@/pages/Meals"
import Product from "@/pages/Product"
import Cart from "@/pages/Cart"
import Checkout from "@/pages/Checkout"
import MemberPage from "@/pages/MemberPage"
import ThankYou from "./pages/ThankYou"
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "@/store"
import "@/App.css"

function App() {

  return (
      <Provider store={store}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<MemberPage />}/>
            <Route path="/products" element={<Meals />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
  )
}

export default App
