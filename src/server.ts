// import express from "express";
// var cookieParser = require("cookie-parser");
// var cookieString = require("cookie");
//
//
// const server = new ApolloServer({
//   subscriptions: {
//     onConnect: (connectionParams: any, webSocket, context) => {
//       let cookieObj = cookieString.parse(context.request.headers.cookie);
//       let wsCookie = cookieObj.token;
//       if (wsCookie) {
//         return checkAuthCookie(wsCookie);
//       }
//
//       throw new Error("Missing cookie in socket!");
//     },
//   },
// });
//
// setInterval(pollStreamServers, 1000);
//

import express from "express";
import fs from "fs";
import http from "http";
import https from "https";
import { ApolloServer } from "apollo-server-express";
import "graphql-import-node";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  apolloServerConfig,
  healthZCheck,
  nginxJoinCheck,
  schema,
} from "./serverComponents/serverUtils";
import { authStream } from "./serverComponents/authStream";
import { checkJWTCookie } from "./serverComponents/authGQL";

// Create express and Apollo handlers
const app = express();
const server = new ApolloServer(apolloServerConfig);

// Adding middleware and safety
app.use("*", cors());
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
server.applyMiddleware({ app });

// REST API routes
app.get("/", (req, res) => nginxJoinCheck(req, res));
app.get("/healthZ", (req, res) => healthZCheck(req, res));
app.post("/key-check", (req, res) => authStream(req, res));

// Create HTTP server and attach express
const httpServer = http.createServer(app);
const httpsServer = https.createServer(
  {
    key: fs.readFileSync("certs/server.key"),
    cert: fs.readFileSync("certs/server.cert"),
  },
  app
);

// Add websocket capabilities to http servers
server.installSubscriptionHandlers(httpServer);
server.installSubscriptionHandlers(httpsServer);

// Start HTTP servers
httpServer.listen(80, () => {
  console.log("HTTP Server running on port 80");
});

httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});
