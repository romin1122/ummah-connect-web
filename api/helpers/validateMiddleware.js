import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const validator = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, userInfo) => {
    if (err)
      return res
        .clearCookie('accessToken', {
          secure: true,
          sameSite: 'none',
        })
        .status(403);
    //handle invalid and what to do. Re login or whatnot
    else {
      req.user = { id: userInfo.id };
    }
  });

  next();
};
