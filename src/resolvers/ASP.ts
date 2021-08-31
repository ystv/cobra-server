//   {
//     id: "fsf151df51sf561",
//     name: "London",
//     live: false,
//     videoOptions: null,
//     customDestination: null,
//     protocol: "RTMP",
//     state: "OFFLINE",
//     signal: "NONE",
//   },

import { prisma } from "../prisma";
import { Asp, AspState, QueryAspArgs } from "../generated/graphql";
import NodeCache from "node-cache";

// Create live memory cache and populate with DB data to reduce disk read usage
const ASPCache = new NodeCache();
prisma.aSPs.findMany().then((e) =>
  e.map((e) =>
    ASPCache.set<Asp>(e.name, { currentState: AspState.Offline, ...e })
  )
);

export const getASPs = (): Asp[] =>
  Object.values(ASPCache.mget<Asp>(ASPCache.keys()));

export const getASP = ({ name }: QueryAspArgs): Asp | null =>
  ASPCache.get<Asp>(name) ?? null;
