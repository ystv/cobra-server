import {
  ApolloServerExpressConfig,
  makeExecutableSchema,
  PubSub,
} from "apollo-server-express";
import { GraphQLSchema } from "graphql";
import resolvers from "../resolverMap";
import * as typeDefs from "../schema/schema.graphql";
import { Request, Response } from "express";
import { getCredentialsFromReq, directiveHasScope } from "./authGQL";
import { getStreamApplications } from "../resolvers/streams";
import cookieString from "cookie";

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as any, // eslint-disable-line
  schemaDirectives: {
    hasScope: directiveHasScope,
  },
});

export const nginxJoinCheck = (req: Request, res: Response): void => {
  res.status(200);
  res.send(
    "Hello! If you can see this, then NGINX has done an oopsie, please pray to whatever God or AI you favour and let's hope nothing else has toasted itself."
  );
  res.end();
};

export const healthZCheck = (req: Request, res: Response): void => {
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
  context: ({ req, connection }) => getCredentialsFromReq({ req, connection }), //.req.cookies?.token),
  subscriptions: {
    onConnect: (connectionParams) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return connectionParams ?? {authToken: "can't find token"};
    },
  },
};

export const pubSub = new PubSub();

export async function pollStreamServers(): Promise<void> {
  await getStreamApplications();
}
