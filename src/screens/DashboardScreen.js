
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { useMQTT } from "../context/MQTTContext";
import { TOPICS } from "../mqtt/topics";

import AppHeader from "../components/core/AppHeader";
import SensorCard from "../components/business/SensorCard";
import ControlButton from "../components/controls/ControlButton";

export default function DashboardScreen({ navigation }) {
  const { connected, data, send } = useMQTT();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* HEADER */}
      <LinearGradient
        colors={["#172b42", "#101a2c", "#0b1120"]}
        style={styles.headerGradient}
      >
        <AppHeader title="Smart Store" />

        <View style={styles.headerInfo}>
          <View>
            <Text style={styles.eyebrow}>
              SMART MONITORING SYSTEM
            </Text>

            <Text style={styles.heading}>Dashboard</Text>

            <Text style={styles.headerSubtitle}>
              Theo dõi và quản lý cửa hàng
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="storefront-outline"
              size={25}
              color="#34d399"
            />
          </View>
        </View>

        {/* MQTT STATUS */}
        <View
          style={[
            styles.connectionCard,
            {
              borderColor: connected
                ? "rgba(52,211,153,0.18)"
                : "rgba(248,113,113,0.2)",
            },
          ]}
        >
          <View style={styles.connectionLeft}>
            <View
              style={[
                styles.connectionDot,
                {
                  backgroundColor: connected
                    ? "#34d399"
                    : "#f87171",
                },
              ]}
            />

            <View>
              <Text style={styles.connectionTitle}>
                {connected
                  ? "Hệ thống trực tuyến"
                  : "Mất kết nối"}
              </Text>

              <Text style={styles.connectionSubtitle}>
                MQTT Broker ·{" "}
                {connected ? "Connected" : "Disconnected"}
              </Text>
            </View>
          </View>

          <Ionicons
            name={connected ? "wifi" : "wifi-outline"}
            size={20}
            color={connected ? "#34d399" : "#f87171"}
          />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* MONITORING */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Environment
            </Text>

            <Text style={styles.sectionSubtitle}>
              Dữ liệu cảm biến thời gian thực
            </Text>
          </View>

          <View style={styles.liveBadge}>
            <View
              style={[
                styles.liveDot,
                {
                  backgroundColor: connected
                    ? "#34d399"
                    : "#64748b",
                },
              ]}
            />

            <Text style={styles.liveText}>
              {connected ? "LIVE" : "OFFLINE"}
            </Text>
          </View>
        </View>

        {/* SENSOR GRID */}
        <View style={styles.sensorGrid}>
          <SensorCard
            title="Temperature"
            value={data.temp}
            unit="°C"
            icon="thermometer"
            color="#f59e0b"
          />

          <SensorCard
            title="Humidity"
            value={data.humidity}
            unit="%"
            icon="water"
            color="#3b82f6"
          />

          <SensorCard
            title="Light Level"
            value={data.lightLevel}
            icon="sunny"
            color="#eab308"
          />

          <SensorCard
            title="Motion"
            value={data.motion}
            icon="walk"
            color="#f43f5e"
          />
        </View>

        {/* CONTROL HUB */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Control Hub
            </Text>

            <Text style={styles.sectionSubtitle}>
              Điều khiển thiết bị từ xa
            </Text>
          </View>

          <View style={styles.controlIcon}>
            <Ionicons
              name="hardware-chip-outline"
              size={18}
              color="#60a5fa"
            />
          </View>
        </View>

        <View style={styles.controlPanel}>
          {/* DOOR CONTROL */}
          <View style={styles.controlHeading}>
            <Ionicons
              name="door-outline"
              size={18}
              color="#60a5fa"
            />

            <Text style={styles.controlGroupTitle}>
              Door Control
            </Text>
          </View>

          <View style={styles.controlGrid}>
            <ControlButton
              title="Open Door"
              icon="lock-open"
              onPress={() => send(TOPICS.doorCmd, "OPEN")}
              color="#10b981"
            />

            <ControlButton
              title="Close Door"
              icon="lock-closed"
              onPress={() => send(TOPICS.doorCmd, "CLOSE")}
              color="#64748b"
            />
          </View>

          <View style={styles.panelDivider} />

          {/* LIGHTING CONTROL */}
          <View style={styles.controlHeading}>
            <Ionicons
              name="bulb-outline"
              size={18}
              color="#fbbf24"
            />

            <Text style={styles.controlGroupTitle}>
              Lighting Control
            </Text>
          </View>

          <View style={styles.controlGrid}>
            <ControlButton
              title="Light On"
              icon="bulb"
              onPress={() => send(TOPICS.lightCmd, "ON")}
              color="#f59e0b"
            />

            <ControlButton
              title="Light Off"
              icon="bulb-outline"
              onPress={() => send(TOPICS.lightCmd, "OFF")}
              color="#64748b"
            />
          </View>
        </View>

        {/* MANAGEMENT */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Management
            </Text>

            <Text style={styles.sectionSubtitle}>
              Quản lý và phân tích hệ thống
            </Text>
          </View>
        </View>

        <View style={styles.managementCard}>
          {/* DEVICES */}
          <TouchableOpacity
            style={styles.managementItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("DeviceList")}
          >
            <View style={styles.managementIcon}>
              <Ionicons
                name="hardware-chip-outline"
                size={21}
                color="#60a5fa"
              />
            </View>

            <View style={styles.managementInfo}>
              <Text style={styles.managementTitle}>
                Devices
              </Text>

              <Text style={styles.managementDescription}>
                Danh sách thiết bị IoT
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#64748b"
            />
          </TouchableOpacity>

          <View style={styles.managementDivider} />

          {/* ANALYTICS */}
          <TouchableOpacity
            style={styles.managementItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Analytics")}
          >
            <View
              style={[
                styles.managementIcon,
                {
                  backgroundColor: "rgba(52,211,153,0.1)",
                },
              ]}
            >
              <Ionicons
                name="analytics-outline"
                size={21}
                color="#34d399"
              />
            </View>

            <View style={styles.managementInfo}>
              <Text style={styles.managementTitle}>
                Analytics
              </Text>

              <Text style={styles.managementDescription}>
                Báo cáo và thống kê sự kiện
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#64748b"
            />
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={14}
            color="#475569"
          />

          <Text style={styles.footerText}>
            SmartStores IoT Management
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1120",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
  },

  eyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#34d399",
    fontWeight: "800",
    marginBottom: 7,
  },

  heading: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 5,
  },

  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "rgba(52,211,153,0.08)",
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  connectionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.035)",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  connectionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  connectionDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 11,
  },

  connectionTitle: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "700",
  },

  connectionSubtitle: {
    color: "#64748b",
    fontSize: 10,
    marginTop: 3,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#718096",
    fontSize: 11,
    marginTop: 4,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#112a27",
    borderWidth: 1,
    borderColor: "#1c453b",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  liveText: {
    color: "#34d399",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  sensorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  controlIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: "#14243a",
    alignItems: "center",
    justifyContent: "center",
  },

  controlPanel: {
    backgroundColor: "#111b2b",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 20,
    padding: 15,
  },

  controlHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },

  controlGroupTitle: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "700",
  },

  controlGrid: {
    gap: 10,
  },

  panelDivider: {
    height: 1,
    backgroundColor: "#1e293b",
    marginVertical: 18,
  },

  managementCard: {
    backgroundColor: "#111b2b",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 18,
    paddingHorizontal: 14,
  },

  managementItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  managementIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "rgba(59,130,246,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  managementInfo: {
    flex: 1,
  },

  managementTitle: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "700",
  },

  managementDescription: {
    color: "#718096",
    fontSize: 10,
    marginTop: 4,
  },

  managementDivider: {
    height: 1,
    backgroundColor: "#1e293b",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 30,
    marginBottom: 10,
  },

  footerText: {
    color: "#475569",
    fontSize: 10,
    letterSpacing: 0.4,
  },
});
