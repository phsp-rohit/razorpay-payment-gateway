import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("shop");

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <Navbar
        cartCount={cart.length}
        goToCart={() => setPage("cart")}
        goToShop={() => setPage("shop")}
      />

      {page === "shop" && <Shop addToCart={addToCart} />}
      {page === "cart" && <Cart cart={cart} setPage={setPage} />}
      {page === "success" && <Success />}
      {page === "cancel" && <Cancel />}
    </div>
  );
}

export default App;
