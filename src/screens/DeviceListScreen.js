
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMQTT } from "../context/MQTTContext";

export default function DeviceListScreen({ navigation }) {
  const { data, connected } = useMQTT();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const DEVICES = [
    {
      id: "1",
      name: "Cảm biến Nhiệt độ",
      type: "Sensor",
      value: `${data.temp ?? "--"}°C`,
      icon: "thermometer",
      color: "#f59e0b",
      category: "Sensor",
      description: "Theo dõi nhiệt độ môi trường",
    },
    {
      id: "2",
      name: "Độ ẩm Không khí",
      type: "Sensor",
      value: `${data.humidity ?? "--"}%`,
      icon: "water",
      color: "#3b82f6",
      category: "Sensor",
      description: "Giám sát độ ẩm không khí",
    },
    {
      id: "3",
      name: "Hệ thống Đèn",
      type: "Actuator",
      value: data.light ?? "--",
      icon: "bulb",
      color: "#eab308",
      category: "Actuator",
      description: "Điều khiển hệ thống chiếu sáng",
    },
    {
      id: "4",
      name: "Khóa Cửa Chính",
      type: "Security",
      value: data.door ?? "--",
      icon: "lock-closed",
      color: "#818cf8",
      category: "Actuator",
      description: "Kiểm soát trạng thái cửa ra vào",
    },
    {
      id: "5",
      name: "Còi Báo Động",
      type: "Alarm",
      value: data.alarm ?? "--",
      icon: "warning",
      color: "#f87171",
      category: "Actuator",
      description: "Cảnh báo khi phát hiện sự cố",
    },
    {
      id: "6",
      name: "ESP32 Gateway",
      type: "Gateway",
      value: data.online ?? (connected ? "Online" : "Offline"),
      icon: "wifi",
      color: "#34d399",
      category: "System",
      description: "Gateway giao tiếp MQTT",
    },
  ];

  const FILTERS = [
    { label: "Tất cả", value: "All" },
    { label: "Sensor", value: "Sensor" },
    { label: "Actuator", value: "Actuator" },
    { label: "System", value: "System" },
  ];

  const filteredDevices =
    selectedFilter === "All"
      ? DEVICES
      : DEVICES.filter((device) => device.category === selectedFilter);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.deviceCard}
      activeOpacity={0.75}
      onPress={() =>
        navigation.navigate("DeviceDetail", { device: item })
      }
    >
      {/* DEVICE ICON */}
      <View
        style={[
          styles.deviceIcon,
          { backgroundColor: `${item.color}15` },
        ]}
      >
        <Ionicons name={item.icon} size={23} color={item.color} />
      </View>

      {/* DEVICE INFORMATION */}
      <View style={styles.deviceInfo}>
        <View style={styles.deviceNameRow}>
          <Text style={styles.deviceName} numberOfLines={1}>
            {item.name}
          </Text>
        </View>

        <Text style={styles.deviceDescription} numberOfLines={1}>
          {item.description}
        </Text>

        <View style={styles.deviceMeta}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>

          <View style={styles.statusIndicator}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor:
                    connected ? "#34d399" : "#64748b",
                },
              ]}
            />
            <Text style={styles.statusText}>
              {connected ? "Connected" : "Offline"}
            </Text>
          </View>
        </View>
      </View>

      {/* VALUE */}
      <View style={styles.valueSection}>
        <Text style={[styles.value, { color: item.color }]} numberOfLines={1}>
          {String(item.value)}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={16}
          color="#475569"
          style={{ marginTop: 8, alignSelf: "flex-end" }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>SMART STORES</Text>
          <Text style={styles.headerTitle}>Thiết bị</Text>
          <Text style={styles.headerSubtitle}>
            Quản lý các thiết bị trong hệ thống
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="hardware-chip-outline"
            size={23}
            color="#60a5fa"
          />
        </View>
      </View>

      {/* SUMMARY CARD */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryTop}>
          <View style={styles.summaryIcon}>
            <Ionicons
              name="layers-outline"
              size={20}
              color="#60a5fa"
            />
          </View>
          <Text style={styles.summaryCaption}>TOTAL DEVICES</Text>
        </View>

        <View style={styles.summaryMain}>
          <Text style={styles.summaryNumber}>{DEVICES.length}</Text>
          <Text style={styles.summaryLabel}>Thiết bị đã đăng ký</Text>
        </View>

        <View style={styles.summaryFooter}>
          <View style={styles.summaryStat}>
            <View style={[styles.miniDot, styles.sensorDot]} />
            <Text style={styles.summaryStatText}>
              {DEVICES.filter((d) => d.category === "Sensor").length} Sensors
            </Text>
          </View>

          <View style={styles.summaryStat}>
            <View style={[styles.miniDot, styles.actuatorDot]} />
            <Text style={styles.summaryStatText}>
              {DEVICES.filter((d) => d.category === "Actuator").length} Actuators
            </Text>
          </View>

          <View style={styles.summaryStat}>
            <View style={[styles.miniDot, styles.systemDot]} />
            <Text style={styles.summaryStatText}>
              {DEVICES.filter((d) => d.category === "System").length} System
            </Text>
          </View>
        </View>
      </View>

      {/* DEVICE LIST HEADER */}
      <View style={styles.listHeader}>
        <View>
          <Text style={styles.sectionTitle}>Device Inventory</Text>
          <Text style={styles.sectionSubtitle}>
            Danh sách thiết bị hiện có
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>{filteredDevices.length}</Text>
        </View>
      </View>

      {/* FILTERS */}
      <View style={styles.filterContainer}>
        {FILTERS.map((filter) => {
          const active = selectedFilter === filter.value;

          return (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.filterButton,
                active && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  active && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <Ionicons
          name="shield-checkmark-outline"
          size={13}
          color="#475569"
        />
        <Text style={styles.footerText}>
          SmartStores Device Management
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1120",
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  eyebrow: {
    fontSize: 9,
    letterSpacing: 2.2,
    fontWeight: "800",
    color: "#34d399",
    marginBottom: 7,
  },

  headerTitle: {
    color: "#f8fafc",
    fontSize: 27,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#718096",
    fontSize: 11,
    marginTop: 5,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#14243a",
    borderWidth: 1,
    borderColor: "#24374d",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryCard: {
    backgroundColor: "#121d2d",
    borderWidth: 1,
    borderColor: "#223146",
    borderRadius: 20,
    padding: 17,
    marginBottom: 27,
  },

  summaryTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "#172b43",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryCaption: {
    color: "#64748b",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  summaryMain: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
    marginTop: 14,
  },

  summaryNumber: {
    color: "#f8fafc",
    fontSize: 32,
    fontWeight: "800",
  },

  summaryLabel: {
    color: "#94a3b8",
    fontSize: 11,
  },

  summaryFooter: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    borderTopWidth: 1,
    borderTopColor: "#223146",
    paddingTop: 14,
    marginTop: 15,
  },

  summaryStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  miniDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  sensorDot: {
    backgroundColor: "#60a5fa",
  },

  actuatorDot: {
    backgroundColor: "#f59e0b",
  },

  systemDot: {
    backgroundColor: "#34d399",
  },

  summaryStatText: {
    color: "#94a3b8",
    fontSize: 10,
  },

  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#64748b",
    fontSize: 10,
    marginTop: 4,
  },

  countBadge: {
    backgroundColor: "#172337",
    borderWidth: 1,
    borderColor: "#26364d",
    borderRadius: 9,
    minWidth: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  countText: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: "800",
  },

  filterContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 15,
  },

  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#121c2b",
    borderWidth: 1,
    borderColor: "#202d40",
  },

  filterButtonActive: {
    backgroundColor: "#16334b",
    borderColor: "#27516d",
  },

  filterText: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "600",
  },

  filterTextActive: {
    color: "#7dd3fc",
    fontWeight: "800",
  },

  list: {
    paddingBottom: 15,
    gap: 10,
  },

  deviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121c2c",
    borderWidth: 1,
    borderColor: "#223146",
    borderRadius: 17,
    padding: 13,
  },

  deviceIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  deviceInfo: {
    flex: 1,
    minWidth: 0,
  },

  deviceNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  deviceName: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "700",
  },

  deviceDescription: {
    color: "#64748b",
    fontSize: 9,
    marginTop: 4,
  },

  deviceMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginTop: 7,
    flexWrap: "wrap",
  },

  typeBadge: {
    backgroundColor: "#1b2738",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  typeText: {
    color: "#94a3b8",
    fontSize: 8,
    fontWeight: "700",
  },

  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },

  statusText: {
    color: "#64748b",
    fontSize: 8,
  },

  valueSection: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 8,
    maxWidth: 75,
  },

  value: {
    fontSize: 12,
    fontWeight: "800",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingTop: 12,
    paddingBottom: 12,
  },

  footerText: {
    color: "#475569",
    fontSize: 9,
  },
});
