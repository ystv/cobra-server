import { ExpressContext, SchemaDirectiveVisitor } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { ExecutionParams } from "subscriptions-transport-ws";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { AuthScopes } from "../generated/graphql";

const secret: string = process.env.JWT_SECRET || "";

// Retrieves and validates credentials from a request
export const getCredentialsFromReq = ({
  req,
  connection,
}: {
  req?: ExpressContext["req"];
  connection?: ExecutionParams | undefined;
}): authInterface => {
  // Get cookies
  let cookies;
  if (connection) {
    cookies = connection.context;
  } else if (req) {
    cookies = req.cookies;
  }

  // Get user auth
  const cookieUserToken = cookies.token;
  let user;

  if (cookieUserToken)
    try {
      user = jwt.verify(cookieUserToken, secret) as jwtInterface;
    } catch {
      // throw new AuthenticationError("Invalid token");
    }

  // Get ASP auth
  const cookieAspKey = cookies.token;
  let asp = undefined;
  if (cookieAspKey)
    try {
      //Check asp ID key
    } catch {
      // throw new AuthenticationError("Invalid token");
    }

  // Return the authenticated user into the context
  return { user, asp };
};

interface jwtInterface extends jwt.JwtPayload {
  id: number;
  perms: jwtPermsInterface[];
}

interface jwtPermsInterface {
  id: number;
  name: string;
}

interface authInterface {
  user?: jwtInterface;
  asp?: string;
}

// Checks if the validated credentials have scope to access a field
export class directiveHasScope extends SchemaDirectiveVisitor {
  visitFieldDefinition(
    field: GraphQLField<any, any>
  ): GraphQLField<any, any> | void | null {
    // Typecast scopes array
    const scope: [AuthScopes] = this.args.scope.map(
      (e: string) => (<any>AuthScopes)[e]
    );

    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const context = args[2] as authInterface;
      // console.log(context);

      // If guests are allowed then resolve immediately
      if (scope.find((value) => value == AuthScopes.Guest))
        return resolve.apply(this, args);

      if (userHasScope(context, scope)) {
        return resolve.apply(this, args);
      } else {
        throw new Error("Not authorized");
      }
    };
  }
}

function userHasScope(context: authInterface, scope: [AuthScopes]) {
  if (context.user) {
    // If a user token exists, always allow SuperUsers, then check for COBRA permission,
    // then see if standard users are allowed.

    if (context.user.perms.find((e) => e.name === "SuperUser")) return true;

    if (
      context.user.perms.find((e) => e.name === "COBRA") &&
      scope.find((e) => e === AuthScopes.Admin)
    )
      return true;

    if (scope.find((e) => e === AuthScopes.User)) return true;
  }

  // if (context.asp && scope.find((e) => e === AuthScopes.Asp)) return true;

  return false;
}
