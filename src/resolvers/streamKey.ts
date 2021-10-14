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
): void => {
  if (args.start) {
    const startDate = dayjs(args.start);
    if (!startDate.isValid()) {
      throw new UserInputError("Invalid start value");
    }
    args.start = startDate.toISOString();
  }
  if (args.end) {
    const endDate = dayjs(args.end);
    if (!endDate.isValid()) {
      throw new UserInputError("Invalid end value");
    }
    args.end = endDate.toISOString();
  }
};

export const addStreamKey = async (
  args: MutationAddStreamKeyArgs
): Promise<StreamKey> => {
  validateStreamKeyDates(args);
  await prisma.streamKeys.create({ data: args }).catch((err) => {
    console.log(err);
    throw new UserInputError("StreamKey probably already exists");
  });
  return args;
};

export const editStreamKey = async (
  args: MutationEditStreamKeyArgs
): Promise<StreamKey> => {
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

  return await prisma.streamKeys.findUnique({
    where: { streamKey: args.streamKey },
    rejectOnNotFound: true,
  });
};

export const deleteStreamKey = (
  args: MutationDeleteStreamKeyArgs
): Promise<boolean> => {
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

export const genStreamKey = async (
  args: MutationGenTempStreamKeyArgs
): Promise<StreamKey> => {
  let foundUnique = false;
  let genStreamKey = "";
  while (!foundUnique) {
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
): Promise<StreamKey> => {
  const genPwd = cryptoRandomString({
    length: 10,
    type: "alphanumeric",
  });
  return addStreamKey({ ...args, pwd: genPwd });
};
