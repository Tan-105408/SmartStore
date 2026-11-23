
import mqtt from "mqtt";
import { MQTT_CONFIG } from "./mqttConfig";
import { TOPICS } from "./topics";

let client;

export function connectMQTT(onData, onConnectionChange) {
  const url = `wss://${MQTT_CONFIG.host}:${MQTT_CONFIG.port}/mqtt`;

  client = mqtt.connect(url, {
    username: MQTT_CONFIG.username,
    password: MQTT_CONFIG.password,
    clientId: MQTT_CONFIG.clientId,
    clean: true,
    reconnectPeriod: 3000,
    connectTimeout: 10000,
    protocolVersion: 4,
  });

  client.on("connect", () => {
    onConnectionChange?.(true);

    const topics = [
      TOPICS.temp,
      TOPICS.humidity,
      TOPICS.lightLevel,
      TOPICS.motion,
      TOPICS.doorStatus,
      TOPICS.lightStatus,
      TOPICS.alarmStatus,
      TOPICS.online,
    ];

    client.subscribe(topics, { qos: 0 });
  });

  client.on("message", (topic, message) => {
    const value = message.toString();
    onData?.(topic, value);
  });

  client.on("close", () => onConnectionChange?.(false));
  client.on("offline", () => onConnectionChange?.(false));
  client.on("error", (err) => console.log("MQTT error:", err.message));

  return client;
}

export function publishCommand(topic, value) {
  if (!client?.connected) {
    console.log("MQTT not connected");
    return false;
  }

  client.publish(topic, String(value), { qos: 0 });
  return true;
}

export function disconnectMQTT() {
  client?.end();
}