import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: "ajudajfhjsafhui9043w5353i50jnf",
      user_email: user,
    },

    process.env.NEXT_PUBLIC_ANALYTICS_JWT_SECRET,
    {
      expiresIn: "1d", // 30d for 30 days
    }
  );
  return token;
};

export const isAuthentic = async (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = req?.headers?.authorization?.startsWith("Bearer");
  if (authorization && bearer) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Token is not valid" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Token is not suppiled!" });
  }
};
