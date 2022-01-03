import dotEnvFlow from "dotenv-flow";

dotEnvFlow.config();
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
  pollStreamServers,
} from "./serverComponents/serverUtils";
import { authStream } from "./serverComponents/authStream";
import { exposeMetrics } from "./serverComponents/metrics";
import prom from "prom-client";

// Create express and Apollo handlers
const app = express();
const server = new ApolloServer(apolloServerConfig);

// Adding middleware and safety
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
server.applyMiddleware({ app });

// REST API routes
app.get("/", (req, res) => nginxJoinCheck(req, res));
app.get("/healthZ", (req, res) => healthZCheck(req, res));
app.post("/key-check", (req, res) => authStream(req, res));

// Metrics
if (process.env.PROMETHEUS_ENABLE === "true") {
  exposeMetrics();
  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", "text/plain; version=0.0.4");
    const metrics = await prom.register.metrics();
    res.status(200).send(metrics);
  })
}

// Create HTTP server and attach express
const httpServer = http.createServer(app);

// Add websocket capabilities to http servers
server.installSubscriptionHandlers(httpServer);

// Start HTTP servers
httpServer.listen(process.env.HTTP_PORT ?? 80, () => {
  console.log(`HTTP Server running on port ${process.env.HTTP_PORT ?? 80}`);
});

// Do it all again for https
if (process.env.DISABLE_SSL !== "true") {
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync("certs/server.key"),
      cert: fs.readFileSync("certs/server.cert"),
    },
    app
  );

  server.installSubscriptionHandlers(httpsServer);

  httpsServer.listen(process.env.HTTPS_PORT ?? 443, () => {
    console.log(
      `HTTPS Server running on port ${process.env.HTTPS_PORT ?? 443}`
    );
  });
}

setInterval(pollStreamServers, 1000);
