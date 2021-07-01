import { AuthenticationError, ExpressContext } from "apollo-server-express";
import jwt from "jsonwebtoken";

export const checkJWTCookie = (req: ExpressContext): jwtInterface => {
  let user: jwtInterface;
  const secret: string = process.env.JWT_SECRET || "";

  // Check for cookie's existence
  if (req.req.cookies.token == undefined)
    throw new AuthenticationError("No token cookie provided");

  // Decode/verify token cookie
  try {
    user = jwt.verify(req.req.cookies.token, secret) as jwtInterface;
  } catch {
    throw new AuthenticationError("Invalid token");
  }

  // For now only accept SuperUsers to the API
  if (user.perms.find((o) => o.name === "SuperUser") == undefined)
    throw new AuthenticationError("Incorrect Permissions");

  // Return the authenticated user into the context
  return user;
};

interface jwtInterface extends jwt.JwtPayload {
  id: number;
  perms: jwtPermsInterface[];
}

interface jwtPermsInterface {
  id: number;
  name: string;
}
