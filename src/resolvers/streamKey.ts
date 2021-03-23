import { prisma } from "../prisma";
import {
  MutationAddGenPwdStreamKeyArgs,
  MutationAddStreamKeyArgs,
  MutationDeleteStreamKeyArgs,
  MutationEditStreamKeyArgs,
  MutationGenTempStreamKeyArgs,
  StreamKey,
} from "../generated/graphql";
import dayjs from "dayjs";
import { UserInputError } from "apollo-server-express";
import cryptoRandomString from "crypto-random-string";

export const getStreamKeys = async (): Promise<StreamKey[]> =>
  prisma.streamKeys.findMany();

export const validateStreamKeyDates = (
  args: MutationAddStreamKeyArgs | MutationEditStreamKeyArgs
) => {
  if (args.start) {
    let startDate = dayjs(args.start);
    if (!startDate.isValid()) {
      throw new UserInputError("Invalid start value");
    }
    args.start = startDate.toISOString();
  }
  if (args.end) {
    let endDate = dayjs(args.end);
    if (!endDate.isValid()) {
      throw new UserInputError("Invalid end value");
    }
    args.end = endDate.toISOString();
  }
};

export const addStreamKey = async (args: MutationAddStreamKeyArgs) => {
  validateStreamKeyDates(args);
  await prisma.streamKeys.create({ data: args }).catch(() => {
    throw new UserInputError("StreamKey already exists");
  });
  return args;
};

export const editStreamKey = async (args: MutationEditStreamKeyArgs) => {
  validateStreamKeyDates(args);
  await prisma.streamKeys
    .update({
      where: {
        streamKey: args.streamKey,
      },
      data: args,
    })
    .catch(() => {
      throw new UserInputError("StreamKey does not exist");
    });
  return args;
};

export const deleteStreamKey = (args: MutationDeleteStreamKeyArgs) => {
  return prisma.streamKeys
    .delete({
      where: {
        streamKey: args.streamKey,
      },
    })
    .then(() => true)
    .catch(() => {
      throw new UserInputError("StreamKey does not exist");
    });
};

export const genStreamKey = async (args: MutationGenTempStreamKeyArgs) => {
  let foundUnique = false;
  let genStreamKey = "";
  while (foundUnique == false) {
    genStreamKey = cryptoRandomString({
      length: 24,
      type: "alphanumeric",
    });
    await prisma.streamKeys
      .findUnique({
        where: {
          streamKey: genStreamKey,
        },
        rejectOnNotFound: true,
      })
      .catch(() => {
        foundUnique = true;
      });
  }
  return addStreamKey({ ...args, streamKey: genStreamKey });
};

export const addGenPwdStreamKey = async (
  args: MutationAddGenPwdStreamKeyArgs
) => {
  let genPwd = cryptoRandomString({
    length: 10,
    type: "alphanumeric",
  });
  return addStreamKey({ ...args, pwd: genPwd });
};
