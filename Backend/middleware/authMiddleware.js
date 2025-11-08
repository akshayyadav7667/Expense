import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const { authorization } = req.headers;

  //   console.log(authorization);

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token , authorization denied" });
  }

  try {
    // console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);
    req.user = decoded.id;

    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
