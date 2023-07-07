import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer xxxxx
    const decode = jwt.verify(token, process.env.SECRETE);
    req.user = decode;
    next();
  } else {
    res.status(401).json({ message: "No Token" });
  }
};
