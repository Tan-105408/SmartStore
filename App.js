
import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";

import { connectMQTT, publishCommand, disconnectMQTT } from "./src/mqtt/mqttService";
import { TOPICS } from "./src/mqtt/topics";

export default function App() {
  const [connected, setConnected] = useState(false);

  const [data, setData] = useState({
    temp: "--",
    humidity: "--",
    lightLevel: "--",
    motion: "CLEAR",
    door: "CLOSED",
    light: "OFF",
    alarm: "OFF",
    online: "OFF",
  });

  useEffect(() => {
    connectMQTT((topic, value) => {
      setData((prev) => {
        if (topic === TOPICS.temp) return { ...prev, temp: value };
        if (topic === TOPICS.humidity) return { ...prev, humidity: value };
        if (topic === TOPICS.lightLevel) return { ...prev, lightLevel: value };
        if (topic === TOPICS.motion) return { ...prev, motion: value };
        if (topic === TOPICS.doorStatus) return { ...prev, door: value };
        if (topic === TOPICS.lightStatus) return { ...prev, light: value };
        if (topic === TOPICS.alarmStatus) return { ...prev, alarm: value };
        if (topic === TOPICS.online) return { ...prev, online: value };
        return prev;
      });
    }, setConnected);

    return () => disconnectMQTT();
  }, []);

  const send = (topic, value) => publishCommand(topic, value);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>SMART STORE</Text>

      <Text style={styles.connection}>
        MQTT: {connected ? "CONNECTED" : "DISCONNECTED"}
      </Text>

      <View style={styles.card}>
        <Text>Temperature: {data.temp} °C</Text>
        <Text>Humidity: {data.humidity} %</Text>
        <Text>Light Sensor: {data.lightLevel}</Text>
        <Text>Motion: {data.motion}</Text>
        <Text>ESP32: {data.online}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Store Control</Text>

        <Text>Door: {data.door}</Text>
        <Button title="OPEN DOOR" onPress={() => send(TOPICS.doorCmd, "OPEN")} />
        <Button title="CLOSE DOOR" onPress={() => send(TOPICS.doorCmd, "CLOSE")} />

        <Text style={{ marginTop: 12 }}>Light: {data.light}</Text>
        <Button title="LIGHT ON" onPress={() => send(TOPICS.lightCmd, "ON")} />
        <Button title="LIGHT OFF" onPress={() => send(TOPICS.lightCmd, "OFF")} />
        <Button title="AUTO LIGHT" onPress={() => send(TOPICS.lightCmd, "AUTO")} />

        <Text style={{ marginTop: 12 }}>Alarm: {data.alarm}</Text>
        <Button title="ALARM ON" onPress={() => send(TOPICS.alarmCmd, "ON")} />
        <Button title="ALARM OFF" onPress={() => send(TOPICS.alarmCmd, "OFF")} />

        <Button title="AUTO MODE" onPress={() => send(TOPICS.modeCmd, "AUTO")} />
        <Button title="MANUAL MODE" onPress={() => send(TOPICS.modeCmd, "MANUAL")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101827", padding: 20, paddingTop: 55 },
  title: { color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 12 },
  connection: { color: "#44d7a8", marginBottom: 20 },
  card: { backgroundColor: "#1e293b", padding: 18, borderRadius: 12, marginBottom: 16, gap: 8 },
  subtitle: { color: "#fff", fontWeight: "bold", fontSize: 20, marginBottom: 8 },
});