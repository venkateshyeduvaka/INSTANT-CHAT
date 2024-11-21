
const jwt = require("jsonwebtoken");

const generateAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECREATE_KEY, {
        expiresIn: "5d",
      });
    
      res.cookie("jwt_token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
};

module.exports = generateAndSetCookie;
