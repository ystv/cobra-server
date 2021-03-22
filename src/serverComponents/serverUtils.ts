import {
  ApolloServerExpressConfig,
  makeExecutableSchema,
} from "apollo-server-express";
import { GraphQLSchema } from "graphql";
import resolvers from "../resolverMap";
import * as typeDefs from "../schema/schema.graphql";
import { Request, Response } from "express";
import { checkJWTCookie } from "./authGQL";

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as any, // eslint-disable-line
});

export const nginxJoinCheck = (req: Request, res: Response) => {
  res.status(200);
  res.send(
    "Hello! If you can see this, then NGINX has done an oopsie, please pray to whatever God or AI you favour and let's hope nothing else has toasted itself."
  );
  res.end();
};

export const healthZCheck = (req: Request, res: Response) => {
  res.status(200);
  res.end();
};

export const apolloServerConfig: ApolloServerExpressConfig = {
  schema,
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
  context: (req) => checkJWTCookie(req),
};
