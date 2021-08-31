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
import { pubSub } from "./serverComponents/serverUtils";

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
  Subscription: {
    StreamAppsUpdate: {
      subscribe: () => pubSub.asyncIterator("StreamAppsUpdated"),
    },
  },
};

export default resolvers;
