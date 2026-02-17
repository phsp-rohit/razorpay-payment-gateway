# Razorpay Universal Payment Gateway SDK

A reusable Razorpay Payment Gateway system that allows students and developers to integrate secure payments into any project (Flask, Django, MERN, PHP, or Static HTML) without writing backend payment logic.

This project provides a centralized secure backend and a simple frontend SDK for easy integration.

Repository:  
https://github.com/Rohitlakha/razorpay-payment-gateway

---

# Architecture Overview

```
Student Project (Flask / MERN / HTML / Django)
            ↓
     Razorpay SDK Script
            ↓
Central Payment Gateway Server (Node.js)
            ↓
       Razorpay Checkout
```

Students only need to include one script and call one function.

---

# Features

- Secure Razorpay integration  
- Reusable JavaScript SDK  
- Centralized backend server  
- No payment backend required in student projects  
- Easy integration with any frontend  
- Secure environment variable handling  
- Rate limiting protection  
- Helmet security enabled  
- Production-ready structure  

---

# Folder Structure

```
razorpay-payment-gateway/
│
├── backend/
│   ├── public/
│   │   └── razorpay-sdk.js
│   │
│   ├── routes/
│   │   ├── create-order.js
│   │   └── verify-payment.js
│   │
│   ├── middleware/
│   │   └── rateLimiter.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── examples/
│   └── flask-example/
│       ├── app.py
│       └── templates/
│
└── README.md
```

---

# Backend Installation Guide

## Step 1 — Clone repository

```bash
git clone https://github.com/Rohitlakha/razorpay-payment-gateway.git
```

---

## Step 2 — Open backend folder

```bash
cd razorpay-payment-gateway/backend
```

---

## Step 3 — Install dependencies

```bash
npm install
```

---

## Step 4 — Create .env file

Create a file named `.env`

```
PORT=4343

RAZORPAY_KEY_ID=rzp_test_your_key

RAZORPAY_KEY_SECRET=your_secret_key
```

Get keys from Razorpay Dashboard:  
https://dashboard.razorpay.com/

---

## Step 5 — Start server

```bash
npm start
```

Server will run at:

```
http://localhost:4343
```

SDK available at:

```
http://localhost:4343/sdk/razorpay-sdk.js
```

---

# How Students Integrate Into Their Projects

Students **DO NOT need backend payment logic.**

Only frontend integration is required.

---

# Step 1 — Add Razorpay Script

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

---

# Step 2 — Add Payment Gateway SDK

```html
<script src="http://localhost:4343/sdk/razorpay-sdk.js"></script>
```

---

# Step 3 — Add Payment Button

```html
<button onclick="pay()">Pay ₹500</button>
```

---

# Step 4 — Call Payment Function

```html
<script>
function pay() {
    RazorpayGateway.startPayment({
        amount: 500,
        backendUrl: "http://localhost:4343",
        successUrl: "http://localhost:5000/success",
        cancelUrl: "http://localhost:5000/cancel"
    });
}
</script>
```

---

# Flask Integration Example

Example Flask app:

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/success")
def success():
    return render_template("success.html")

@app.route("/cancel")
def cancel():
    return render_template("cancel.html")

app.run(port=5000)
```

---

# Test Mode Payment

Use Razorpay Test Mode.

### Test UPI
```
success@razorpay
```

### Test Card

```
Card Number: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
```

---

# How SDK Works

**Step 1**  
Student clicks payment button  

**Step 2**  
SDK sends request to backend  

**Step 3**  
Backend creates Razorpay order  

**Step 4**  
Razorpay Checkout opens  

**Step 5**  
Payment success or cancel redirect occurs  

---

# Security Features

- Secret keys stored in backend only  
- No secret exposed to frontend  
- Rate limiting protection  
- Helmet security headers  
- Environment variable protection  

---

# Deployment Guide (Production)

Deploy backend to:

- Render  
- Railway  
- AWS  
- VPS  

Example production SDK usage:

```html
<script src="https://yourdomain.com/sdk/razorpay-sdk.js"></script>
```

---

# Example Projects Supported

- Flask  
- Django  
- MERN Stack  
- PHP  
- Static HTML  

---

# 🚀 Razorpay Backend – Docker Setup Guide

This guide explains how to create and run the backend inside a Docker container.

------------------------------------------------------------
✅ PREREQUISITES
------------------------------------------------------------

1. Install Docker Desktop (Windows/Mac)
   OR
   Install Docker Engine (Ubuntu)

Check installation:

    docker --version
    docker info

------------------------------------------------------------
📁 STEP 1 — Go to Backend Folder
------------------------------------------------------------

Open terminal inside backend folder:

    cd razorpay-payment-gateway/backend

Make sure you see:

    package.json
    server.js

------------------------------------------------------------
📝 STEP 2 — Create Dockerfile
------------------------------------------------------------

Create a file named:

    Dockerfile

Add this content inside it:

------------------------------------------------------------

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]

------------------------------------------------------------

⚠ If your main file is app.js, replace:

    "server.js"

with:

    "app.js"

------------------------------------------------------------
🏗 STEP 3 — Build Docker Image
------------------------------------------------------------

Run this command inside backend folder:

    docker build -t razorpay-backend .

After build completes, check:

    docker images

You should see:

    razorpay-backend   latest

------------------------------------------------------------
▶ STEP 4 — Run Docker Container
------------------------------------------------------------

Run:

    docker run -d -p 5000:5000 --name razorpay-container razorpay-backend

Explanation:
    -d                 → Run in background
    -p 5000:5000       → Map port 5000
    --name             → Container name

------------------------------------------------------------
✅ STEP 5 — Check Container
------------------------------------------------------------

Check running containers:

    docker ps

If running, open in browser:

    http://localhost:5000

If on server:

    http://SERVER_IP:5000

------------------------------------------------------------
🛑 Docker Management Commands
------------------------------------------------------------

Stop container:

    docker stop razorpay-container

Start container:

    docker start razorpay-container

Remove container:

    docker rm razorpay-container

Remove image:

    docker rmi razorpay-backend

------------------------------------------------------------
🌐 How To Use Backend
------------------------------------------------------------

If frontend is local:

Replace:

    http://localhost:5000

With:

    http://SERVER_IP:5000

Now frontend will communicate with Docker backend.

------------------------------------------------------------
🎯 Result
------------------------------------------------------------

✔ Backend running inside Docker
✔ No need to install Node on server
✔ Ready for Ubuntu deployment
✔ Production friendly setup

------------------------------------------------------------
END OF GUIDE
------------------------------------------------------------


---

# Author


**Rohit Lakha**

GitHub:  
https://github.com/Rohitlakha

---

# License

MIT License

Free to use for educational and commercial projects.
