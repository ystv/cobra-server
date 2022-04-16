// noinspection SpellCheckingInspection

import axios from "axios";
import { transform } from "camaro";
import {
  RtmpApplications,
  SrtStream,
  StreamApplications,
} from "../generated/graphql";
import { pubSub } from "../serverComponents/serverUtils";

export const getStreamApplications = async (): Promise<StreamApplications> => {
  const newRTMPData = await RTMPStreamUpdate();
  const newSRTData = await SRTStreamUpdate();
  const newStreamsData: StreamApplications = {
    rtmp: newRTMPData ? newRTMPData.applications : [],
    srt: newSRTData ?? [],
  };
  await pubSub.publish("StreamAppsUpdated", {
    StreamAppsUpdate: newStreamsData,
  });
  return newStreamsData;
};

export const RTMPStreamUpdate = (): Promise<RTMPResponse | null> | null =>
  process.env.RTMP_ENABLE == "true" && process.env.RTMP_STAT
    ? axios
        .get(process.env.RTMP_STAT, {
          timeout: 500,
        })
        .then(async (e) => {
          let json: RTMPResponse = await transform(e.data, RTMPTransformObject);
          return json;
        })
        .catch(() => {
          console.error("No RTMP");
          return null;
        })
    : null;

const RTMPTransformObject = {
  nginxVersion: "rtmp/nginx_version",
  nginxRTMPVersion: "rtmp/nginx_rtmp_version",
  built: "rtmp/built",
  pid: "number(rtmp/pid)",
  uptime: "number(rtmp/uptime)",
  nAccepted: "number(rtmp/naccepted)",
  bwIn: "number(rtmp/bw_in)",
  bytesIn: "number(rtmp/bytes_in)",
  bwOut: "number(rtmp/bw_out)",
  bytesOut: "number(rtmp/bytes_out)",
  applications: [
    "rtmp/server/application",
    {
      name: "name",
      streams: [
        "live/stream",
        {
          name: "name",
          time: "number(time)",
          bwIn: "number(bw_in)",
          bytesIn: "number(bytes_in)",
          bwOut: "number(bw_out)",
          bytesOut: "number(bytes_out)",
          bwAudio: "number(bw_audio)",
          bwVideo: "number(bw_video)",
          clients: [
            "client",
            {
              id: "number(id)",
              address: "address",
              time: "number(time)",
              flashVersion: "flashver",
              dropped: "number(dropped)",
              avSync: "number(avsync)",
              timestamp: "number(timestamp)",
              publishing: "boolean(publishing)",
              active: "boolean(active)",
            },
          ],
          meta: {
            video: {
              width: "sum(meta/video/width)",
              height: "sum(meta/video/height)",
              framerate: "sum(meta/video/frame_rate)",
              codec: "meta/video/codec",
              profile: "meta/video/profile",
              compat: "meta/video/compat",
              level: "sum(meta/video/level)",
            },
            audio: {
              codec: "meta/audio/codec",
              profile: "meta/audio/profile",
              channels: "sum(meta/audio/channels)",
              sampleRate: "sum(meta/audio/sample_rate)",
            },
          },
        },
      ],
    },
  ],
};

interface RTMPResponse {
  nginxVersion: string;
  nginxRTMPVersion: string;
  built: string;
  pid: number;
  uptime: number;
  nAccepted: number;
  bwIn: number;
  bytesIn: string;
  bwOut: number;
  bytesOut: string;
  applications: RtmpApplications[];
}

export const SRTStreamUpdate = (): Promise<SrtStream[] | null> | null =>
  process.env.SRT_ENABLE == "true" && process.env.SRT_STAT
    ? axios
        .get(process.env.SRT_STAT, {
          timeout: 500,
        })
        .then((e) => e.data as SrtStream[])
        .catch(() => {
          console.error("No SRT");
          return null;
        })
    : null;
