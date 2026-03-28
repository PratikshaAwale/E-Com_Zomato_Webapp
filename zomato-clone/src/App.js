import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import "./App.css";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import Checkout from "./pages/Checkout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>

      
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
