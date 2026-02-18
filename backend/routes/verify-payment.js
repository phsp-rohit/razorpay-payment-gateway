const express = require("express");
const fs = require("fs");
const path = require("path");

const verifySignature = require("../utils/verifySignature");

const router = express.Router();

/*
========================================
Ensure logs directory exists
========================================
*/

const logDir = path.join(__dirname, "../logs");

try {

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
    console.log("Logs directory created");
  }

} catch (err) {

  console.error("Log directory creation failed:", err);

}

const logFile = path.join(logDir, "payments.log");

/*
========================================
Verify Payment Route
========================================
*/

router.post("/", (req, res) => {

  try {

    const {

      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      projectId,
      amount,
      name,
      email,
      phone,          // ✅ Added (optional)
      description

    } = req.body;

    /*
    ========================================
    Validate Required Razorpay Fields
    ========================================
    */

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {

      console.warn("Missing payment fields");

      return res.status(400).json({
        success: false,
        error: "Missing payment data"
      });

    }

    /*
    ========================================
    Verify Razorpay Signature
    ========================================
    */

    const isValid = verifySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature
    });

    if (!isValid) {

      console.warn("Invalid signature:", razorpay_order_id);

      return res.status(400).json({
        success: false,
        error: "Invalid signature"
      });

    }

    /*
    ========================================
    Optional Phone Validation
    ========================================
    */

    let cleanPhone = "unknown";

    if (phone) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (phoneRegex.test(phone)) {
        cleanPhone = phone;
      }
    }

    /*
    ========================================
    Prepare Log Entry
    ========================================
    */

    const logEntry = {

      time: new Date().toISOString(),

      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,

      project: projectId || "unknown",
      amount: amount || 0,

      customer: name || "unknown",
      email: email || "unknown",
      phone: cleanPhone,      // ✅ Logged here

      description: description || "payment",

      ip:
        req.headers["x-forwarded-for"] ||
        req.ip

    };

    /*
    ========================================
    Write To File
    ========================================
    */

    try {

      fs.appendFileSync(
        logFile,
        JSON.stringify(logEntry) + "\n"
      );

    } catch (err) {

      console.error("Log write error:", err);

    }

    /*
    ========================================
    Console Log
    ========================================
    */

    console.log("=================================");
    console.log("Payment Verified Successfully");
    console.log(logEntry);
    console.log("=================================");

    /*
    ========================================
    Response
    ========================================
    */

    res.json({
      success: true,
      message: "Payment verified",
      order_id: razorpay_order_id
    });

  }
  catch (err) {

    console.error("Verification error:", err);

    res.status(500).json({
      success: false,
      error: "Verification failed"
    });

  }

});

module.exports = router;
