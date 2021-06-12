const verifyToken = require("../services/authService").verifyToken;

module.exports = async function (req, res, next) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).send("Access Denied");
    }
    try {
        const response = await verifyToken(token);
        if (response.status === "error") {
            return res.status(400).send(response.response.message);
        }
        else {
            return next();
        }
    } catch (error) {
        res.status(400).send("Request failed");
    }


}
