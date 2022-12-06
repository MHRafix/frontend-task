import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      user_email: user,
    },

    process.env.NEXT_PUBLIC_ANALYTICS_JWT_ACCESS_SECRET,
    {
      expiresIn: "15m", // 900s for 15 min
    }
  );
  return token;
};

export const generateRefToken = (user) => {
  const token = jwt.sign(
    {
      user_email: user,
    },

    process.env.NEXT_PUBLIC_ANALYTICS_JWT_REFRESH_SECRET
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
        res.json({ message: "Token is not valid" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.json({ message: "Token is not suppiled!" });
  }
};
