import React from "react";

const Cart = ({ cart, setPage }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const payNow = async () => {
    if (!window.RazorpayGateway) {
      alert("Razorpay SDK not loaded!");
      return;
    }

    await window.RazorpayGateway.startPayment({
      amount: total,
      projectId: "grocery_project",
      name: "Customer",
      email: "customer@email.com",
      description: "Grocery Items",
      backendUrl: "http://localhost:5000",
      handler: function (response) {
        console.log("Payment Success:", response);
        setPage("success");

        // Auto return to shop after 3 seconds
        setTimeout(() => setPage("shop"), 3000);
      },
      modal: {
        ondismiss: function () {
          console.log("Payment cancelled");
          setPage("cancel");

          // Auto return to shop after 3 seconds
          setTimeout(() => setPage("shop"), 3000);
        },
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item, i) => (
        <p key={i}>
          {item.name} - ₹{item.price}
        </p>
      ))}

      <h3>Total: ₹{total}</h3>

      {cart.length > 0 && (
        <button
          style={{
            background: "#2d7a78",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={payNow}
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default Cart;
