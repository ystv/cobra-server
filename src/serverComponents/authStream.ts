import { Request, Response } from "express";
import { prisma } from "../prisma";
import dayjs from "dayjs";
import { StreamKey } from "../generated/graphql";

function printKey(req: Request): string {
  return `key:${JSON.stringify(req.body.name)}${
    process.env.DEBUG_KEYS == "true"
      ? `, pwd:${JSON.stringify(req.body.pwd)}`
      : ""
  }`;
}

function printTime(): string {
  return dayjs().format("DD-MM-YYYY HH:mm:ss");
}

export const authStream = (req: Request, res: Response): void => {
  // FOR NOW IT SEEMS LIKE THIS BUG HAS BEEN SOLVED, BUT IF IT APPEARS AGAIN THIS SHOULD FIX IT
  // if (req.body.app == "srt") {
  //   // Temporary fix for NULL character bug with srtRelay
  //   const pwdString = String(req.body.pwd);
  //   req.body.pwd = pwdString.substr(0, pwdString.indexOf("\0"));
  // }

  // Allow playback without auth - only check publishing
  // Allows for future secure playback function using potentially scoped and unique keys
  switch (req.body.call) {
    case "publish":
      authPublishStream(req, res);
      break;
    default:
      res.sendStatus(200);
  }
};

function authPublishStream(req: Request, res: Response): void {
  compareStreamKeyWithDB(req.body).then((approved) => {
    approved ? res.sendStatus(202) : res.sendStatus(401);
    console.log(
      `${printTime()} | publish ${
        approved ? "ACCEPTED" : "DECLINED"
      } ${printKey(req)}`
    );
  });
}

async function compareStreamKeyWithDB(
  reqData: StreamRequest
): Promise<boolean> {
  // Check key name is provided
  if (reqData.name == null) return false;

  // Fetch key from DB
  return prisma.streamKeys
    .findUnique({
      where: { streamKey: reqData.name },
    })
    .then((key) => streamKeyDBvsReqChecker(key, reqData));
}

function streamKeyDBvsReqChecker(
  dbKey: StreamKey | null,
  reqData: StreamRequest
): boolean {
  // Check key exists
  if (dbKey == null) return false;

  // Check date
  if (dbKey.start !== null && dayjs().isBefore(dbKey.start as string))
    return false;

  if (dbKey.end !== null && dayjs().isAfter(dbKey.end as string)) return false;

  // Check password
  return dbKey.pwd == null || reqData.pwd == dbKey.pwd;
}

interface StreamRequest {
  name: string;
  pwd: string;
}
