import { ExpressContext } from "apollo-server-express";
import jwt from "jsonwebtoken";

export const checkJWTCookie = (req: ExpressContext) => {
  //let user = jwt.decode(req.req.cookies.token);
  //console.log(jwt.decode(req.req.cookies.token));

  // Return the authenticated user into the context
  return null;
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
