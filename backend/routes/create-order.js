const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

const allowedProjects =
  require("../config/projects");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post("/", async (req, res) => {

  try {

    const {
      amount,
      projectId,
      name,
      email,
      phone,          // ✅ Added (optional)
      description
    } = req.body;

    /*
    ========================================
    Validate Project
    ========================================
    */

    if (!projectId || !allowedProjects[projectId]) {
      return res.status(400).json({
        success: false,
        error: "Invalid project"
      });
    }

    const project = allowedProjects[projectId];

    /*
    ========================================
    Validate Amount
    ========================================
    */

    const parsedAmount = Number(amount);

    if (
      isNaN(parsedAmount) ||
      parsedAmount < 1 ||
      parsedAmount > 1000000
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid amount"
      });
    }

    /*
    ========================================
    Validate Phone (Optional)
    ========================================
    */

    let cleanPhone = null;

    if (phone) {
      const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile validation
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          success: false,
          error: "Invalid phone number"
        });
      }
      cleanPhone = phone;
    }

    /*
    ========================================
    LOG Request (Important)
    ========================================
    */

    console.log("=================================");
    console.log("New Payment Request");
    console.log("Project:", projectId);
    console.log("Amount:", parsedAmount);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", cleanPhone);
    console.log("IP:", req.ip);
    console.log("=================================");

    /*
    ========================================
    Create Razorpay Order
    ========================================
    */

    const order =
      await razorpay.orders.create({

        amount: parsedAmount * 100, // paisa
        currency: "INR",

        receipt:
          "rcpt_" +
          projectId +
          "_" +
          Date.now(),

        notes: {
          projectId,
          customerName: name || "",
          customerEmail: email || "",
          customerPhone: cleanPhone || "",
          description: description || ""
        }

      });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      name: project.name,
      description: description || ""
    });

  }
  catch (err) {

    console.error("Create order error:", err);

    res.status(500).json({
      success: false,
      error: "Order creation failed"
    });

  }

});

module.exports = router;
