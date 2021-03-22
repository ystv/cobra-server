import { ExpressContext } from "apollo-server-express";
import jwt from "jsonwebtoken";

export const checkJWTCookie = (req: ExpressContext): boolean => {
  console.log(jwt.decode(req.req.cookies.token));

  // Return the authenticated user into the context
  return false;
};

// function checkAuthCookie(token: any) {
//   try {
//     var decoded: any = jwt.verify(token, secret);
//     if (decoded.perms.find((o: any) => o.name === "SuperUser") == undefined)
//       throw new AuthenticationError("Incorrect Permissions");
//     return { user: decoded };
//   } catch (error) {
//     throw new AuthenticationError("Couldn't authenticate socket cookie");
//   }
// }
