// import { UserInputError, PubSub } from "apollo-server-express";
// import axios from "axios";
// require("dotenv-flow").config();
// var parser = require("fast-xml-parser");
//
// export const pubsub = new PubSub();
//
// // const BOArray = [
// //   {
// //     id: "ab12dsd15s1d1s5",
// //     name: "Geneva",
// //     live: true,
// //     videoOptions: null,
// //     customDestination: null,
// //     protocol: "RTMP",
// //     state: "STREAMING",
// //     signal: "MED",
// //   },
// //   {
// //     id: "fsf151df51sf561",
// //     name: "London",
// //     live: false,
// //     videoOptions: null,
// //     customDestination: null,
// //     protocol: "RTMP",
// //     state: "OFFLINE",
// //     signal: "NONE",
// //   },
// // ];
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
//   //console.log(newData);
//   pubsub.publish("STREAMS_CHANGED", { streamsChanged: newData });
// }
//
// function RTMPStreamUpdate() {
//   return axios
//     .get(RTMPSERVER)
//     .then((e) => {
//       var result = parser.parse(e.data, {
//         attributeNamePrefix: "@_",
//         attrNodeName: "attr", //default is 'false'
//         textNodeName: "#text",
//         ignoreAttributes: true,
//         ignoreNameSpace: false,
//         allowBooleanAttributes: false,
//         parseNodeValue: true,
//         parseAttributeValue: false,
//         trimValues: true,
//         cdataTagName: "__cdata", //default is 'false'
//         cdataPositionChar: "\\c",
//         parseTrueNumberOnly: false,
//         arrayMode: false,
//       });
//       result = { rtmp: result.rtmp };
//
//       var newStream = result.rtmp.server.application.map((e: any) => {
//         if (Array.isArray(e.live.stream)) {
//           return e;
//         } else {
//           var newObj: any = e;
//           newObj.live.stream = [e.live.stream];
//           return newObj;
//         }
//       });
//       var newSpec = result;
//       newSpec.rtmp.server.application = newStream;
//       return newSpec;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
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

const resolvers: Resolvers = {
  Query: {
    helloThere: () => "General Kenobi!",
    streamKeys: () => getStreamKeys(),
  },
  Mutation: {
    addStreamKey: (_parent, args) => addStreamKey(args),
    deleteStreamKey: (_parent, args) => deleteStreamKey(args),
    editStreamKey: (_parent, args) => editStreamKey(args),
    genTempStreamKey: (_parent, args) => genStreamKey(args),
    addGenPwdStreamKey: (_parent, args) => addGenPwdStreamKey(args),
  },
};

export default resolvers;
