const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function jwtVerify(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            ok: false,
            message: "El token es requerido",
        });
    }
    jwt.verify(token, secret, (err, payload) => {
        if (err) {
            return res.status(401).send({
                ok: false,
                message: "Token vencido o inválido",
            });
        }
        req.user = payload.user;
        next();
    })
}

module.exports = jwtVerify;