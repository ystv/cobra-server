import {
  AuthenticationError,
  ExpressContext,
  SchemaDirectiveVisitor,
} from "apollo-server-express";
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
}): jwtInterface => {
  // Get cookies
  let cookies;
  if (connection) {
    cookies = connection.context;
  } else if (req) {
    cookies = req.cookies;
  }

  const token = cookies.token;

  let user: jwtInterface;

  // Decode/verify token cookie
  try {
    user = jwt.verify(token, secret) as jwtInterface;
  } catch {
    throw new AuthenticationError("Invalid token");
  }

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

// Checks if the validated credentials have scope to access a field
export class directiveHasScope extends SchemaDirectiveVisitor {
  visitFieldDefinition(
    field: GraphQLField<any, any>
  ): GraphQLField<any, any> | void | null {
    const scope: [AuthScopes] = this.args.scope.map(
      (e: string) => (<any>AuthScopes)[e]
    );

    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const context = args[2];
      // console.log(context);
      const token = context.perms; //context.headers.authorization;

      if (scope.find((value) => value == AuthScopes.Guest))
        return resolve.apply(this, args);

      if (!token) {
        throw new Error("Auth token not found");
      }

      if (userHasScope(scope)) {
        return resolve.apply(this, args);
      } else {
        throw new Error("Not authorized");
      }
    };
  }
}

function userHasScope(scope: [AuthScopes]) {
  return true;
}
