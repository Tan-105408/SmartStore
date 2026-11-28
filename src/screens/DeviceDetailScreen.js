
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../components/core/AppHeader";

export default function DeviceDetailScreen({ route, navigation }) {
  const { device } = route.params;
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <AppHeader
        title="Chi Tiết Thiết Bị"
        onBack={() => navigation.goBack()}
      />

      {/* DEVICE HERO */}
      <View style={styles.hero}>
        <View style={styles.heroGlow}>
          <View
            style={[
              styles.heroIcon,
              {
                borderColor: `${device.color}40`,
                backgroundColor: `${device.color}15`,
              },
            ]}
          >
            <Ionicons
              name={device.icon}
              size={38}
              color={device.color}
            />
          </View>
        </View>

        <Text style={styles.deviceName}>{device.name}</Text>

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Đang hoạt động</Text>
        </View>

        <Text style={styles.deviceValue}>{device.value}</Text>
        <Text style={styles.valueCaption}>Giá trị hiện tại</Text>
      </View>

      {/* STATUS CARD */}
      <View style={styles.statusCard}>
        <View style={styles.statusCardHeader}>
          <View style={styles.statusCardIcon}>
            <Ionicons
              name="pulse-outline"
              size={18}
              color="#34d399"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.statusCardTitle}>Device Status</Text>
            <Text style={styles.statusCardSubtitle}>
              Trạng thái thiết bị hiện tại
            </Text>
          </View>
          <Text style={styles.onlineLabel}>ONLINE</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statusInfoRow}>
          <View>
            <Text style={styles.infoLabel}>Thiết bị</Text>
            <Text style={styles.infoValue}>{device.name}</Text>
          </View>

          <View style={styles.statusInfoRight}>
            <Text style={styles.infoLabel}>Trạng thái</Text>
            <Text style={styles.infoValueGreen}>Hoạt động</Text>
          </View>
        </View>
      </View>

      {/* SETTINGS */}
      <Text style={styles.sectionTitle}>Cài đặt</Text>
      <Text style={styles.sectionSubtitle}>
        Tùy chỉnh hoạt động của thiết bị
      </Text>

      <View style={styles.settingsCard}>
        <View style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color="#60a5fa"
            />
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Thông báo</Text>
            <Text style={styles.settingDescription}>
              Nhận cảnh báo khi thiết bị có thay đổi
            </Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{
              false: "#334155",
              true: "#059669",
            }}
            thumbColor={notifications ? "#6ee7b7" : "#94a3b8"}
          />
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
          <View style={[styles.settingIcon, { backgroundColor: "#292440" }]}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#a78bfa"
            />
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Thông tin thiết bị</Text>
            <Text style={styles.settingDescription}>
              Xem thông tin và dữ liệu cảm biến
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#64748b"
          />
        </TouchableOpacity>
      </View>

      {/* DEVICE INFORMATION */}
      <Text style={styles.sectionTitle}>Thông tin</Text>

      <View style={styles.infoCard}>
        <InfoRow label="Tên thiết bị" value={device.name} />
        <View style={styles.divider} />
        <InfoRow label="Giá trị hiện tại" value={String(device.value ?? "--")} />
        <View style={styles.divider} />
        <InfoRow label="Loại thiết bị" value="IoT Sensor" />
        <View style={styles.divider} />
        <InfoRow label="Kết nối" value="MQTT" valueColor="#34d399" />
      </View>

      {/* DANGER ZONE */}
      <View style={styles.dangerCard}>
        <View style={styles.dangerHeader}>
          <Ionicons
            name="warning-outline"
            size={18}
            color="#f87171"
          />
          <Text style={styles.dangerTitle}>Danger Zone</Text>
        </View>

        <Text style={styles.dangerDescription}>
          Thao tác bên dưới sẽ rời khỏi trang chi tiết thiết bị.
          Hiện chưa thực hiện ngắt kết nối MQTT thực tế.
        </Text>

        <TouchableOpacity
          style={styles.dangerButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={17} color="#f87171" />
          <Text style={styles.dangerButtonText}>Quay lại danh sách</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Ionicons
          name="shield-checkmark-outline"
          size={14}
          color="#475569"
        />
        <Text style={styles.footerText}>SmartStores Device Management</Text>
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value, valueColor = "#cbd5e1" }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoRowLabel}>{label}</Text>
      <Text style={[styles.infoRowValue, { color: valueColor }]} numberOfLines={1}>
        {value}
      </Text>
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
    paddingTop: 55,
    paddingBottom: 35,
  },

  hero: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 28,
  },

  heroGlow: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.02)",
    marginBottom: 18,
  },

  heroIcon: {
    width: 92,
    height: 92,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  deviceName: {
    color: "#f8fafc",
    fontSize: 23,
    fontWeight: "800",
    textAlign: "center",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102a25",
    borderWidth: 1,
    borderColor: "#1b4439",
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 6,
    marginTop: 12,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#34d399",
    marginRight: 7,
  },

  statusText: {
    color: "#34d399",
    fontSize: 10,
    fontWeight: "700",
  },

  deviceValue: {
    color: "#f1f5f9",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 22,
  },

  valueCaption: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 3,
  },

  statusCard: {
    backgroundColor: "#121c2c",
    borderWidth: 1,
    borderColor: "#233146",
    borderRadius: 18,
    padding: 16,
  },

  statusCardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusCardIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#14352e",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  statusCardTitle: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "700",
  },

  statusCardSubtitle: {
    color: "#64748b",
    fontSize: 10,
    marginTop: 3,
  },

  onlineLabel: {
    color: "#34d399",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  divider: {
    height: 1,
    backgroundColor: "#223044",
    marginVertical: 14,
  },

  statusInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statusInfoRight: {
    alignItems: "flex-end",
  },

  infoLabel: {
    color: "#64748b",
    fontSize: 10,
  },

  infoValue: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },

  infoValueGreen: {
    color: "#34d399",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },

  sectionTitle: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 28,
  },

  sectionSubtitle: {
    color: "#718096",
    fontSize: 11,
    marginTop: 5,
    marginBottom: 14,
  },

  settingsCard: {
    backgroundColor: "#121c2c",
    borderWidth: 1,
    borderColor: "#233146",
    borderRadius: 18,
    paddingHorizontal: 14,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },

  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#172b43",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  settingInfo: {
    flex: 1,
    marginRight: 8,
  },

  settingTitle: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "700",
  },

  settingDescription: {
    color: "#718096",
    fontSize: 10,
    marginTop: 4,
    lineHeight: 15,
  },

  infoCard: {
    backgroundColor: "#121c2c",
    borderWidth: 1,
    borderColor: "#233146",
    borderRadius: 18,
    paddingHorizontal: 15,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
  },

  infoRowLabel: {
    color: "#718096",
    fontSize: 11,
  },

  infoRowValue: {
    fontSize: 11,
    fontWeight: "700",
    maxWidth: "55%",
    textAlign: "right",
  },

  dangerCard: {
    backgroundColor: "#1b1723",
    borderWidth: 1,
    borderColor: "#3b2632",
    borderRadius: 18,
    padding: 16,
    marginTop: 25,
  },

  dangerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dangerTitle: {
    color: "#f87171",
    fontSize: 13,
    fontWeight: "800",
  },

  dangerDescription: {
    color: "#93808b",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 10,
  },

  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(248,113,113,0.08)",
    borderWidth: 1,
    borderColor: "rgba(248,113,113,0.15)",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 15,
  },

  dangerButtonText: {
    color: "#f87171",
    fontSize: 12,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 28,
  },

  footerText: {
    color: "#475569",
    fontSize: 10,
  },
});
