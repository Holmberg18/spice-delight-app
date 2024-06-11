import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Home from "@/pages/Home"
import Meals from "@/pages/Meals"
import Cart from "@/pages/Cart"
import MemberPage from "@/pages/MemberPage"
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "@/store"
import "@/App.css"
import CheckoutForm from "@/pages/Checkout"

function App() {

  return (
      <Provider store={store}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<MemberPage />}/>
            <Route path="/products" element={<Meals />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
  )
}

export default App
