
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

export default function HistoryScreen() {
  const { logs } = useMQTT();
  const [filter, setFilter] = useState("all");

  const alertCount = logs.filter((item) => item.type === "alert").length;

  const filteredLogs =
    filter === "alerts"
      ? logs.filter((item) => item.type === "alert")
      : logs;

  const getLogIcon = (item) => {
    if (item.type === "alert") return "warning-outline";
    if (item.type === "door") return "lock-closed-outline";
    if (item.type === "light") return "bulb-outline";
    return "document-text-outline";
  };

  const getLogColor = (item) => {
    if (item.type === "alert") return "#fb7185";
    if (item.type === "door") return "#60a5fa";
    if (item.type === "light") return "#fbbf24";
    return "#34d399";
  };

  const getLogCategory = (item) => {
    if (item.type === "alert") return "ALERT";
    if (item.type === "door") return "DOOR";
    if (item.type === "light") return "LIGHT";
    return "EVENT";
  };

  const renderItem = ({ item, index }) => {
    const isAlert = item.type === "alert";
    const color = getLogColor(item);

    return (
      <View style={styles.timelineItem}>
        {/* TIMELINE */}
        <View style={styles.timeline}>
          <View
            style={[
              styles.timelineDot,
              {
                backgroundColor: color,
                shadowColor: color,
              },
            ]}
          />

          {index !== filteredLogs.length - 1 && (
            <View style={styles.timelineLine} />
          )}
        </View>

        {/* EVENT CARD */}
        <View
          style={[
            styles.logCard,
            isAlert && styles.alertCard,
          ]}
        >
          <View style={styles.cardTop}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: `${color}15` },
              ]}
            >
              <Ionicons
                name={getLogIcon(item)}
                size={19}
                color={color}
              />
            </View>

            <View style={styles.logContent}>
              <Text style={styles.logEvent} numberOfLines={2}>
                {item.event || item.message || "Sự kiện hệ thống"}
              </Text>

              <Text style={styles.logTime}>
                {item.time || "Không có thời gian"}
              </Text>
            </View>

            <View
              style={[
                styles.typeBadge,
                { backgroundColor: `${color}12` },
              ]}
            >
              <Text style={[styles.typeBadgeText, { color }]}>
                {getLogCategory(item)}
              </Text>
            </View>
          </View>

          {isAlert && (
            <View style={styles.alertFooter}>
              <Ionicons
                name="alert-circle-outline"
                size={13}
                color="#fb7185"
              />
              <Text style={styles.alertFooterText}>
                Cần chú ý sự kiện này
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>SMART STORES</Text>
          <Text style={styles.title}>Activity Log</Text>
          <Text style={styles.subtitle}>
            Theo dõi lịch sử hoạt động hệ thống
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="time-outline"
            size={23}
            color="#a78bfa"
          />
        </View>
      </View>

      {/* SUMMARY */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons
              name="list-outline"
              size={18}
              color="#60a5fa"
            />
          </View>
          <Text style={styles.summaryLabel}>TOTAL EVENTS</Text>
          <Text style={styles.summaryValue}>{logs.length}</Text>
          <Text style={styles.summaryCaption}>Tổng sự kiện ghi nhận</Text>
        </View>

        <View style={[styles.summaryCard, styles.alertSummaryCard]}>
          <View style={styles.alertSummaryIcon}>
            <Ionicons
              name="warning-outline"
              size={18}
              color="#fb7185"
            />
          </View>
          <Text style={styles.summaryLabel}>ALERTS</Text>
          <Text style={[styles.summaryValue, { color: "#fb7185" }]}>
            {alertCount}
          </Text>
          <Text style={styles.summaryCaption}>Cảnh báo hệ thống</Text>
        </View>
      </View>

      {/* LIST HEADER */}
      <View style={styles.listHeader}>
        <View>
          <Text style={styles.sectionTitle}>Event Timeline</Text>
          <Text style={styles.sectionSubtitle}>
            Nhật ký hoạt động gần đây
          </Text>
        </View>
      </View>

      {/* FILTERS */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          onPress={() => setFilter("all")}
          style={[
            styles.filterButton,
            filter === "all" && styles.filterActive,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.filterTextActive,
            ]}
          >
            Tất cả ({logs.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilter("alerts")}
          style={[
            styles.filterButton,
            filter === "alerts" && styles.alertFilterActive,
          ]}
        >
          <Ionicons
            name="warning-outline"
            size={13}
            color={filter === "alerts" ? "#fb7185" : "#64748b"}
          />
          <Text
            style={[
              styles.filterText,
              filter === "alerts" && styles.alertFilterTextActive,
            ]}
          >
            Cảnh báo ({alertCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* TIMELINE LIST */}
      <FlatList
        data={filteredLogs}
        keyExtractor={(item, index) =>
          item.id?.toString() || index.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="file-tray-outline"
                size={28}
                color="#64748b"
              />
            </View>

            <Text style={styles.emptyTitle}>
              {filter === "alerts"
                ? "Không có cảnh báo"
                : "Chưa có lịch sử"}
            </Text>

            <Text style={styles.emptyDescription}>
              {filter === "alerts"
                ? "Hệ thống chưa ghi nhận cảnh báo nào."
                : "Các sự kiện MQTT sẽ được hiển thị tại đây khi phát sinh."}
            </Text>

            {filter === "alerts" && (
              <TouchableOpacity
                style={styles.resetFilter}
                onPress={() => setFilter("all")}
              >
                <Text style={styles.resetFilterText}>
                  Xem tất cả sự kiện
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <Ionicons
          name="shield-checkmark-outline"
          size={13}
          color="#475569"
        />
        <Text style={styles.footerText}>
          SmartStores Event Monitoring
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
    marginBottom: 23,
  },

  eyebrow: {
    color: "#a78bfa",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2.2,
    marginBottom: 7,
  },

  title: {
    color: "#f8fafc",
    fontSize: 27,
    fontWeight: "800",
  },

  subtitle: {
    color: "#718096",
    fontSize: 11,
    marginTop: 5,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#201c38",
    borderWidth: 1,
    borderColor: "#342c4e",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 27,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#121c2c",
    borderWidth: 1,
    borderColor: "#223146",
    borderRadius: 18,
    padding: 14,
  },

  alertSummaryCard: {
    backgroundColor: "#1b1725",
    borderColor: "#382638",
  },

  summaryIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: "#172b43",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  alertSummaryIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: "#34202b",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  summaryLabel: {
    color: "#64748b",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
  },

  summaryValue: {
    color: "#f1f5f9",
    fontSize: 27,
    fontWeight: "800",
    marginTop: 6,
  },

  summaryCaption: {
    color: "#718096",
    fontSize: 9,
    marginTop: 4,
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

  filterRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 18,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#121c2b",
    borderWidth: 1,
    borderColor: "#223146",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  filterActive: {
    backgroundColor: "#172c42",
    borderColor: "#294763",
  },

  alertFilterActive: {
    backgroundColor: "#291b27",
    borderColor: "#583040",
  },

  filterText: {
    color: "#718096",
    fontSize: 10,
    fontWeight: "700",
  },

  filterTextActive: {
    color: "#93c5fd",
  },

  alertFilterTextActive: {
    color: "#fb7185",
  },

  list: {
    paddingBottom: 15,
  },

  timelineItem: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 85,
  },

  timeline: {
    width: 24,
    alignItems: "center",
  },

  timelineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginTop: 21,
    zIndex: 1,
    shadowOpacity: 0.45,
    shadowRadius: 5,
  },

  timelineLine: {
    flex: 1,
    width: 1,
    backgroundColor: "#263448",
    marginTop: 5,
    marginBottom: -2,
  },

  logCard: {
    flex: 1,
    backgroundColor: "#121c2c",
    borderWidth: 1,
    borderColor: "#223146",
    borderRadius: 15,
    padding: 13,
    marginBottom: 11,
  },

  alertCard: {
    backgroundColor: "#191824",
    borderColor: "rgba(251,113,133,0.22)",
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 39,
    height: 39,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  logContent: {
    flex: 1,
    minWidth: 0,
  },

  logEvent: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "700",
  },

  logTime: {
    color: "#64748b",
    fontSize: 10,
    marginTop: 5,
  },

  typeBadge: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 6,
    marginLeft: 7,
  },

  typeBadgeText: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  alertFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(251,113,133,0.12)",
    marginTop: 11,
    paddingTop: 10,
  },

  alertFooterText: {
    color: "#fb7185",
    fontSize: 9,
    fontWeight: "600",
  },

  emptyCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121c2c",
    borderWidth: 1,
    borderColor: "#223146",
    borderRadius: 18,
    padding: 25,
    marginTop: 10,
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#1b2738",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 15,
  },

  emptyDescription: {
    color: "#64748b",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 16,
    marginTop: 6,
  },

  resetFilter: {
    backgroundColor: "#172b42",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginTop: 15,
  },

  resetFilterText: {
    color: "#60a5fa",
    fontSize: 10,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
  },

  footerText: {
    color: "#475569",
    fontSize: 9,
  },
});
