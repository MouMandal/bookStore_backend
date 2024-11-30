const express = require('express');
const User = require('./user_model');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET_KEY=process.env.JWT_SECRET;

router.post('/admin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });
        if (!admin) {
           return res.status(404).send({ message: "Admin is not found" });
        }
        if (admin.password != password) {
            return res.status(404).send({ message: "wrong password" });
        }

        const token = jwt.sign({ id: admin._id, username: admin.username, role: admin.role },JWT_SECRET_KEY, { expiresIn: '24h' });
        console.log("JWT_SECRET:", process.env.JWT_SECRET);


        return res.status(200).json({
            message: "Authentication Successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role,
            }
        })

    } catch (error) {
        console.log("Failed to login as admin", error);
        res.status(401).send({ message: "Failed to login as admin" });
    }
})

module.exports = router;