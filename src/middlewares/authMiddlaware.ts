import { Request, NextFunction, Response } from "express";
import { Jwt, JwtPayload, verify } from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cookie } = req.headers;
  if (!cookie) return res.status(401).json({ message: "token is required!" });

  const splitCookie = cookie.split("=");

  if (splitCookie[0] != process.env.KEY_TOKEN) {
    return res.status(401).json({ message: "badly key token" });
  }

  verify(splitCookie[1], process.env.SECRET_TOKEN, (error, decoded) => {
    if (error)
      throw res.status(401).json({ message: error.message || "token error!" });

    const { id } = decoded as JwtPayload;
    req.userID = id;

    return next();
  });
}
