import prom from "prom-client";
import { StreamApplications } from "src/generated/graphql";
import { pubSub } from "./serverUtils";

if (process.env.PROMETHEUS_NODE_METRICS_ENABLE === "true") {
    prom.collectDefaultMetrics({
        prefix: "cobra_"
    });
}

const metrics = {
    rtmpStreamBandwidthOut: new prom.Gauge({
        name: "cobra_rtmp_stream_bandwidth_out_bytes",
        help: "Current outgoing bandwidth of this stream",
        labelNames: ["app", "stream"]
    }),
    rtmpStreamBandwidthIn: new prom.Gauge({
        name: "cobra_rtmp_stream_bandwidth_in_bytes",
        help: "Current incoming bandwidth of this stream",
        labelNames: ["app", "stream"]
    }),
    rtmpStreamPublishers: new prom.Gauge({
        name: "cobra_rtmp_stream_publishers",
        help: "Currently connected publishers for this stream",
        labelNames: ["app", "stream"]
    }),
    rtmpStreamConsumers: new prom.Gauge({
        name: "cobra_rtmp_stream_consumers",
        help: "Currently connected non-producer clients for this stream",
        labelNames: ["app", "stream"]
    }),
    rtmpStreamUptime: new prom.Gauge({
        name: "cobra_rtmp_stream_uptime_seconds",
        help: "Number of seconds since the stream started",
        labelNames: ["app", "stream"]
    }),
    rtmpStreamBytesIn: new prom.Gauge({
        name: "cobra_rtmp_stream_bytes_in_total",
        help: "Total bytes received for this stream",
        labelNames: ["app", "stream"]
    }),
    rtmpStreamBytesOut: new prom.Gauge({
        name: "cobra_rtmp_stream_bytes_out_total",
        help: "Total bytes sent for this stream",
        labelNames: ["app", "stream"]
    })
}

export async function exposeMetrics() {
    const sub = await pubSub.subscribe("StreamAppsUpdated", ({ StreamAppsUpdate }: {StreamAppsUpdate: StreamApplications}) => {
        StreamAppsUpdate.rtmp.forEach(app => {
            if (!app) {
                return;
            }
            app.streams?.forEach(stream => {
                if (!stream) {
                    return;
                }
                metrics.rtmpStreamBandwidthOut.labels(app.name!, stream.name!).set(stream.bwOut!);
                metrics.rtmpStreamBandwidthIn.labels(app.name!, stream.name!).set(stream.bwIn!);
                metrics.rtmpStreamUptime.labels(app.name!, stream.name!).set(stream.time! / 1000);
                metrics.rtmpStreamBytesOut.labels(app.name!, stream.name!).set(stream.bytesOut!);
                metrics.rtmpStreamBytesIn.labels(app.name!, stream.name!).set(stream.bytesIn!);
                metrics.rtmpStreamPublishers.labels(app.name!, stream.name!).set(
                    stream.clients?.filter(x => !!x?.publishing).length || 0
                );
                metrics.rtmpStreamConsumers.labels(app.name!, stream.name!).set(
                    stream.clients?.filter(x => !x?.publishing).length || 0
                );
            });
        });
    });
    return () => pubSub.unsubscribe(sub);
}
