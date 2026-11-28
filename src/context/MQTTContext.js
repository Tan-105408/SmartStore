import React, { createContext, useContext, useEffect, useState } from "react";
import { connectMQTT, publishCommand, disconnectMQTT } from "../mqtt/mqttService";
import { TOPICS } from "../mqtt/topics";

const MQTTContext = createContext(null);

export const MQTTProvider = ({ children }) => {
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
  const [logs, setLogs] = useState([]);

  const addLog = (event, type = "info") => {
    const newLog = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      time: new Date().toLocaleTimeString(),
      event,
      type,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 49)]); // Giữ tối đa 50 log gần nhất
  };

  useEffect(() => {
    connectMQTT((topic, value) => {
      setData((prev) => {
        let updated = { ...prev };
        if (topic === TOPICS.temp) {
          updated.temp = value;
          if (parseFloat(value) > 35) addLog(`Cảnh báo: Nhiệt độ cao (${value}°C)`, "alert");
        } else if (topic === TOPICS.humidity) {
          updated.humidity = value;
        } else if (topic === TOPICS.lightLevel) {
          updated.lightLevel = value;
        } else if (topic === TOPICS.motion) {
          updated.motion = value;
          if (value === "DETECTED") addLog("Phát hiện chuyển động tại cửa hàng!", "alert");
        } else if (topic === TOPICS.doorStatus) {
          updated.door = value;
          addLog(`Trạng thái cửa: ${value}`, "door");
        } else if (topic === TOPICS.lightStatus) {
          updated.light = value;
          addLog(`Trạng thái đèn: ${value}`, "light");
        } else if (topic === TOPICS.alarmStatus) {
          updated.alarm = value;
          addLog(`Còi báo động: ${value}`, "alert");
        } else if (topic === TOPICS.online) {
          updated.online = value;
          addLog(`ESP32 Gateway: ${value}`, "system");
        }
        return updated;
      });
    }, (status) => {
      setConnected(status);
      addLog(status ? "Đã kết nối MQTT Broker" : "Mất kết nối MQTT Broker", status ? "info" : "alert");
    });

    return () => disconnectMQTT();
  }, []);

  const send = (topic, value) => {
    const success = publishCommand(topic, value);
    if (success) {
      addLog(`Gửi lệnh [${topic}]: ${value}`, "system");
    }
    return success;
  };

  return (
    <MQTTContext.Provider value={{ connected, data, logs, send }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => {
  const context = useContext(MQTTContext);
  if (!context) {
    throw new Error("useMQTT must be used within an MQTTProvider");
  }
  return context;
};
