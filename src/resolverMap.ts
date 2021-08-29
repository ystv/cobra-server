// const BOArray = [
//   {
//     id: "ab12dsd15s1d1s5",
//     name: "Geneva",
//     live: true,
//     videoOptions: null,
//     customDestination: null,
//     protocol: "RTMP",
//     state: "STREAMING",
//     signal: "MED",
//   },
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
// ];
//
// const resolverMap: IResolvers = {
//   Subscription: {
//     streamsChanged: {
//       subscribe: () => pubsub.asyncIterator("STREAMS_CHANGED"),
//     },
//   },
// };
// export default resolverMap;
//
// }
//
//
// export async function pollStreamServers() {
//   let newData = await RTMPStreamUpdate();
//   pubsub.publish("STREAMS_CHANGED", { streamsChanged: newData });
// }

import { Resolvers } from "./generated/graphql";
import {
  addGenPwdStreamKey,
  addStreamKey,
  deleteStreamKey,
  editStreamKey,
  genStreamKey,
  getStreamKeys,
} from "./resolvers/streamKey";
import { getStreamApplications } from "./resolvers/streams";

const resolvers: Resolvers = {
  Query: {
    helloThere: () => "General Kenobi!",

    // streamKeys
    streamKeys: () => getStreamKeys(),

    // streams
    streamApps: () => getStreamApplications(),
  },
  Mutation: {
    // streamKeys
    addStreamKey: (_parent, args) => addStreamKey(args),
    deleteStreamKey: (_parent, args) => deleteStreamKey(args),
    editStreamKey: (_parent, args) => editStreamKey(args),
    genTempStreamKey: (_parent, args) => genStreamKey(args),
    addGenPwdStreamKey: (_parent, args) => addGenPwdStreamKey(args),
  },
};

export default resolvers;
