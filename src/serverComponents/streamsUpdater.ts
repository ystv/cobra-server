import axios from "axios";

// export function RTMPStreamUpdate() {
//   return axios
//     .get()
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

export const RTMPStreamUpdate = () =>
  process.env.RTMP_STAT
    ? axios
        .get(process.env.RTMP_STAT, {
          timeout: 300,
        })
        .then((e) => console.log(e.data))
    : ([] as SRTStream[]);

export const SRTStreamUpdate = () =>
  process.env.SRT_STAT
    ? axios
        .get(process.env.SRT_STAT, {
          timeout: 300,
        })
        .then((e) => e.data as SRTStream[])
    : ([] as SRTStream[]);

interface SRTStream {
  name: string;
  url: string;
  clients: number;
  created: string;
}
