import axios from "axios";
import { transform } from "camaro";
import {
  RtmpApplications,
  SrtStream,
  StreamApplications,
} from "../generated/graphql";

export const getStreamApplications = async () => {
  const newRTMPData = await RTMPStreamUpdate();
  const newSRTData = await SRTStreamUpdate();
  const newStreamsData: StreamApplications = {
    rtmp: newRTMPData ? newRTMPData.applications : [],
    srt: newSRTData ?? [],
  };
  return newStreamsData;
};

export const RTMPStreamUpdate = () =>
  process.env.RTMP_STAT
    ? axios
        .get(process.env.RTMP_STAT, {
          timeout: 300,
        })
        .then(async (e) => {
          const json: RTMPResponse = await transform(
            e.data,
            RTMPTransformObject
          );
          return json;
        })
        .catch((e) => {
          console.error(e);
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
              width: "number(meta/video/width)",
              height: "number(meta/video/height)",
              framerate: "number(meta/video/frame_rate)",
              codec: "meta/video/codec",
              profile: "meta/video/profile",
              compat: "meta/video/compat",
              level: "number(meta/video/level)",
            },
            audio: {
              codec: "meta/audio/codec",
              profile: "meta/audio/profile",
              channels: "number(meta/audio/channels)",
              sampleRate: "number(meta/audio/sample_rate)",
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
  bytesIn: number;
  bwOut: number;
  bytesOut: number;
  applications: RtmpApplications[];
  // applications: {
  //   name: string;
  //   streams: {
  //     name: string;
  //     time: number;
  //     bwIn: number;
  //     bytesIn: number;
  //     bwOut: number;
  //     bytesOut: number;
  //     bwAudio: number;
  //     bwVideo: number;
  //     clients: {
  //       id: number;
  //       address: string;
  //       time: number;
  //       flashVersion: string;
  //       dropped: number;
  //       avSync: number;
  //       timestamp: number;
  //       publishing: boolean;
  //       active: boolean;
  //     }[];
  //     meta: {
  //       video: {
  //         width: number;
  //         height: number;
  //         framerate: number;
  //         codec: string;
  //         profile: string;
  //         compat: string;
  //         level: number;
  //       };
  //       audio: {
  //         codec: string;
  //         profile: string;
  //         channels: number;
  //         sampleRate: number;
  //       };
  //     };
  //   }[];
  // }[];
}

export const SRTStreamUpdate = () =>
  process.env.SRT_STAT
    ? axios
        .get(process.env.SRT_STAT, {
          timeout: 300,
        })
        .then((e) => e.data as SrtStream[])
        .catch((e) => {
          console.error(e);
          return null;
        })
    : null;
