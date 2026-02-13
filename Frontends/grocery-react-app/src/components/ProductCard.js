import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product)}>Add To Cart</button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
  },
};

export default ProductCard;
