const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET;

const VerifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token is not provided" });
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "invalid credientials" });
        }
        req.user = user;
        next();
    })

}
module.exports = VerifyAdminToken;