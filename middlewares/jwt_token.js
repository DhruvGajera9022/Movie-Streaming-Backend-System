const JWT = require("jsonwebtoken");
require("dotenv").config();


const JWTMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Access denied. No token provided.'
        });
    }

    const decoded = JWT.verify(token, process.env.TOKEN_SECRET);
    req.userId = decoded.id;
    next();
};



module.exports = {
    JWTMiddleware,
}