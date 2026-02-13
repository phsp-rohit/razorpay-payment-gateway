import React from "react";

const Success = () => {
  return (
    <div style={styles.container}>
      <h2>✅ Payment Successful!</h2>
      <p>You will be redirected to home page in 3 seconds...</p>
    </div>
  );
};

const styles = {
  container: {
    padding: "50px",
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#2d7a78",
  },
};

export default Success;
