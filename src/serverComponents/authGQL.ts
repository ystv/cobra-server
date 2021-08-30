import { AuthenticationError, ExpressContext } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { ExecutionParams } from "subscriptions-transport-ws";

const secret: string = process.env.JWT_SECRET || "";

export const checkJWTCookie = ({
  req,
  connection,
}: {
  req?: ExpressContext["req"];
  connection?: ExecutionParams | undefined;
}): jwtInterface => {
  let user: jwtInterface;
  let cookies = undefined;

  if (connection) {
    cookies = connection.context;
  } else if (req) {
    cookies = req.cookies;
  }

  // Check for cookie's existence
  if (cookies.token == undefined)
    throw new AuthenticationError("No token cookie provided");

  const token = cookies.token;

  // Decode/verify token cookie
  try {
    user = jwt.verify(token, secret) as jwtInterface;
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
