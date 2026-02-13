import React from "react";

const Cancel = () => {
  return (
    <div style={styles.container}>
      <h2>❌ Payment Cancelled</h2>
      <p>You will be redirected to home page in 3 seconds...</p>
    </div>
  );
};

const styles = {
  container: {
    padding: "50px",
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#d9534f",
  },
};

export default Cancel;
