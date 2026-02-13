import React from "react";

const Navbar = ({ cartCount, goToCart, goToShop }) => {
  return (
    <nav style={styles.nav}>
      <h1 style={{ cursor: "pointer" }} onClick={goToShop}>
        Grocery Store
      </h1>
      <button style={styles.cartBtn} onClick={goToCart}>
        Cart ({cartCount})
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#2d7a78",
    color: "#fff",
    fontFamily: "Roboto, sans-serif",
  },
  cartBtn: {
    background: "#fff",
    color: "#2d7a78",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navbar;
