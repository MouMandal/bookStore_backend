const express = require('express');
const Order = require('./order_model');
const router = express.Router();

//create order
router.post("/", async (req, res) => {
    try {
        const newOrder = await Order(req.body);
        const saveOrder = await newOrder.save();
        res.status(200).json({message:"order is done",saveOrder});
    } catch (error) {
        console.error("Error is occured", error);
        res.status(500).json({ message: "Failed to create order" });
    }
})















module.exports = router;