
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useMQTT } from "../context/MQTTContext";

export default function AnalyticsScreen() {
  const { logs } = useMQTT();

  const alertCount = logs.filter(
    (l) => l.type === "alert"
  ).length;

  const normalCount = logs.length - alertCount;
  const alertRate =
    logs.length > 0
      ? ((alertCount / logs.length) * 100).toFixed(1)
      : "0.0";

  const recentLogs = [...logs].slice(0, 5);

  const getLogColor = (type) => {
    return type === "alert" ? "#fb7185" : "#34d399";
  };

  const getLogIcon = (type) => {
    return type === "alert"
      ? "warning-outline"
      : "checkmark-circle-outline";
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recentLogs}
        keyExtractor={(item, index) =>
          item.id?.toString() || index.toString()
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>SMART STORES</Text>
                <Text style={styles.title}>Thống kê</Text>
                <Text style={styles.subtitle}>
                  Tổng quan hoạt động hệ thống
                </Text>
              </View>

              <View style={styles.headerIcon}>
                <Ionicons
                  name="analytics-outline"
                  size={24}
                  color="#34d399"
                />
              </View>
            </View>

            {/* SYSTEM OVERVIEW */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Tổng quan dữ liệu
              </Text>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>

            {/* MAIN STATS */}
            <View style={styles.statsRow}>
              <LinearGradient
                colors={["#123b35", "#102c2b"]}
                style={styles.statCard}
              >
                <View style={styles.statTop}>
                  <View style={[styles.iconBox, { backgroundColor: "#164e43" }]}>
                    <Ionicons
                      name="warning-outline"
                      size={20}
                      color="#34d399"
                    />
                  </View>
                  <Text style={styles.statCaption}>ALERTS</Text>
                </View>

                <Text style={styles.statValue}>{alertCount}</Text>
                <Text style={styles.statLabel}>Cảnh báo phát hiện</Text>

                <View style={styles.statBottom}>
                  <View style={styles.statLine}>
                    <View
                      style={[
                        styles.statLineFill,
                        {
                          width: `${Math.min(
                            Number(alertRate),
                            100
                          )}%`,
                          backgroundColor: "#34d399",
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.statFoot}>
                    {alertRate}% tổng sự kiện
                  </Text>
                </View>
              </LinearGradient>

              <LinearGradient
                colors={["#172c4c", "#121f38"]}
                style={styles.statCard}
              >
                <View style={styles.statTop}>
                  <View style={[styles.iconBox, { backgroundColor: "#1e3a65" }]}>
                    <Ionicons
                      name="pulse-outline"
                      size={20}
                      color="#60a5fa"
                    />
                  </View>
                  <Text style={styles.statCaption}>EVENTS</Text>
                </View>

                <Text style={styles.statValue}>{logs.length}</Text>
                <Text style={styles.statLabel}>Tổng sự kiện</Text>

                <View style={styles.statBottom}>
                  <View style={styles.statLine}>
                    <View
                      style={[
                        styles.statLineFill,
                        {
                          width: "100%",
                          backgroundColor: "#3b82f6",
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.statFoot}>
                    Dữ liệu MQTT ghi nhận
                  </Text>
                </View>
              </LinearGradient>
            </View>

            {/* SECONDARY STATS */}
            <View style={styles.secondaryRow}>
              <View style={styles.secondaryCard}>
                <View style={styles.secondaryIcon}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color="#34d399"
                  />
                </View>
                <View>
                  <Text style={styles.secondaryValue}>{normalCount}</Text>
                  <Text style={styles.secondaryLabel}>
                    Hoạt động bình thường
                  </Text>
                </View>
              </View>

              <View style={styles.secondaryCard}>
                <View style={styles.secondaryIcon}>
                  <Ionicons
                    name="stats-chart-outline"
                    size={18}
                    color="#a78bfa"
                  />
                </View>
                <View>
                  <Text style={styles.secondaryValue}>{alertRate}%</Text>
                  <Text style={styles.secondaryLabel}>
                    Tỷ lệ cảnh báo
                  </Text>
                </View>
              </View>
            </View>

            {/* RECENT ACTIVITY HEADER */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Hoạt động gần đây
              </Text>
              <Text style={styles.recentCount}>
                {logs.length} bản ghi
              </Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.logCard}>
            <View
              style={[
                styles.logIcon,
                {
                  backgroundColor:
                    item.type === "alert"
                      ? "rgba(251,113,133,0.12)"
                      : "rgba(52,211,153,0.12)",
                },
              ]}
            >
              <Ionicons
                name={getLogIcon(item.type)}
                size={19}
                color={getLogColor(item.type)}
              />
            </View>

            <View style={styles.logContent}>
              <Text style={styles.logTitle}>
                {item.type === "alert"
                  ? "Cảnh báo hệ thống"
                  : "Sự kiện hệ thống"}
              </Text>
              <Text style={styles.logDescription} numberOfLines={2}>
                {item.message || item.topic || "Không có mô tả"}
              </Text>
            </View>

            <View
              style={[
                styles.logTag,
                {
                  backgroundColor:
                    item.type === "alert"
                      ? "rgba(251,113,133,0.1)"
                      : "rgba(52,211,153,0.1)",
                },
              ]}
            >
              <Text
                style={[
                  styles.logTagText,
                  { color: getLogColor(item.type) },
                ]}
              >
                {item.type === "alert" ? "ALERT" : "NORMAL"}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons
              name="file-tray-outline"
              size={30}
              color="#475569"
            />
            <Text style={styles.emptyTitle}>Chưa có dữ liệu</Text>
            <Text style={styles.emptyText}>
              Các sự kiện từ hệ thống MQTT sẽ xuất hiện tại đây.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1120",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  eyebrow: {
    fontSize: 10,
    letterSpacing: 2.5,
    color: "#34d399",
    fontWeight: "800",
    marginBottom: 8,
  },

  title: {
    fontSize: 28,
    color: "#f8fafc",
    fontWeight: "800",
  },

  subtitle: {
    color: "#8290a7",
    fontSize: 13,
    marginTop: 5,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#142538",
    borderWidth: 1,
    borderColor: "#24384c",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e2e8f0",
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102b28",
    borderWidth: 1,
    borderColor: "#1b453b",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#34d399",
  },

  liveText: {
    fontSize: 9,
    color: "#34d399",
    fontWeight: "800",
    letterSpacing: 1,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
  },

  statCard: {
    flex: 1,
    minHeight: 190,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  statTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  statCaption: {
    color: "#64748b",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  statValue: {
    fontSize: 34,
    fontWeight: "800",
    color: "#f8fafc",
    marginTop: 18,
  },

  statLabel: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 2,
  },

  statBottom: {
    marginTop: "auto",
    paddingTop: 15,
  },

  statLine: {
    height: 4,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },

  statLineFill: {
    height: 4,
    borderRadius: 4,
  },

  statFoot: {
    fontSize: 9,
    color: "#64748b",
    marginTop: 7,
  },

  secondaryRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    marginBottom: 30,
  },

  secondaryCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#121b2b",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 15,
    padding: 13,
  },

  secondaryIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#1b2638",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryValue: {
    color: "#f1f5f9",
    fontSize: 17,
    fontWeight: "800",
  },

  secondaryLabel: {
    color: "#7f8ea5",
    fontSize: 9,
    marginTop: 2,
  },

  recentCount: {
    fontSize: 11,
    color: "#64748b",
  },

  logCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121b2b",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 15,
    padding: 13,
    marginBottom: 10,
  },

  logIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  logContent: {
    flex: 1,
  },

  logTitle: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "700",
  },

  logDescription: {
    color: "#718096",
    fontSize: 10,
    marginTop: 4,
  },

  logTag: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
    marginLeft: 8,
  },

  logTagText: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  emptyCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121b2b",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 18,
    padding: 30,
    marginTop: 5,
  },

  emptyTitle: {
    color: "#cbd5e1",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 12,
  },

  emptyText: {
    color: "#64748b",
    fontSize: 11,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 17,
  },
});
