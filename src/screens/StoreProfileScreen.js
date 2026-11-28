
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import AppHeader from "../components/core/AppHeader";

export default function StoreProfileScreen({ navigation }) {
  const { user } = useAuth();

  const storeName = user?.storeName || "SmartStore Main";

  return (
    <View style={styles.container}>
      <AppHeader
        title="Cửa Hàng"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Store identity */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.storeIcon}>
              <Ionicons name="storefront" size={30} color="#34d399" />
            </View>

            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Đang hoạt động</Text>
            </View>
          </View>

          <Text style={styles.storeLabel}>STORE PROFILE</Text>
          <Text style={styles.storeName}>{storeName}</Text>
          <Text style={styles.storeSubtitle}>
            Thông tin chi tiết chi nhánh của bạn
          </Text>

          <View style={styles.heroDivider} />

          <View style={styles.storeFooter}>
            <Ionicons name="shield-checkmark" size={16} color="#34d399" />
            <Text style={styles.storeFooterText}>Chi nhánh được quản lý</Text>
          </View>
        </View>

        {/* Information section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
          <Text style={styles.sectionSubtitle}>DETAILS</Text>
        </View>

        <View style={styles.infoCard}>
          {/* Store name */}
          <View style={styles.infoRow}>
            <View style={[styles.infoIcon, { backgroundColor: "#34d39915" }]}>
              <Ionicons name="storefront-outline" size={20} color="#34d399" />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Tên chi nhánh</Text>
              <Text style={styles.infoValue}>{storeName}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Address */}
          <View style={styles.infoRow}>
            <View style={[styles.infoIcon, { backgroundColor: "#3b82f615" }]}>
              <Ionicons name="location-outline" size={20} color="#60a5fa" />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Địa chỉ</Text>
              <Text style={styles.infoValue}>
                123 Nguyễn Văn Cừ, Quận 5, TP.HCM
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Operating hours */}
          <View style={styles.infoRow}>
            <View style={[styles.infoIcon, { backgroundColor: "#f59e0b15" }]}>
              <Ionicons name="time-outline" size={20} color="#fbbf24" />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Giờ hoạt động</Text>
              <Text style={styles.infoValue}>08:00 - 22:00</Text>
              <Text style={styles.infoSubValue}>Thứ 2 - Chủ nhật</Text>
            </View>
          </View>
        </View>

        {/* Operational status */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trạng thái cửa hàng</Text>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusCardIcon}>
            <Ionicons name="checkmark-circle" size={22} color="#34d399" />
          </View>

          <View style={styles.statusCardContent}>
            <Text style={styles.statusCardTitle}>Hoạt động bình thường</Text>
            <Text style={styles.statusCardDescription}>
              Cửa hàng sẵn sàng vận hành trong khung giờ đã thiết lập.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#64748b" />
        </View>

        {/* Bottom note */}
        <View style={styles.noteCard}>
          <Ionicons name="information-circle-outline" size={18} color="#64748b" />
          <Text style={styles.noteText}>
            Thông tin chi nhánh được sử dụng để quản lý và theo dõi hoạt động
            cửa hàng trên hệ thống SmartStores.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1120",
    paddingTop: 55,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },

  // Hero card
  heroCard: {
    backgroundColor: "#121c2c",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#263449",
    padding: 20,
    marginTop: 8,
  },

  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  storeIcon: {
    width: 58,
    height: 58,
    borderRadius: 17,
    backgroundColor: "#34d39915",
    borderWidth: 1,
    borderColor: "#34d39930",
    alignItems: "center",
    justifyContent: "center",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34d39912",
    borderWidth: 1,
    borderColor: "#34d39925",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#34d399",
  },

  statusText: {
    color: "#34d399",
    fontSize: 11,
    fontWeight: "600",
  },

  storeLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 8,
  },

  storeName: {
    color: "#f1f5f9",
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 6,
  },

  storeSubtitle: {
    color: "#94a3b8",
    fontSize: 13,
    lineHeight: 20,
  },

  heroDivider: {
    height: 1,
    backgroundColor: "#253449",
    marginVertical: 18,
  },

  storeFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  storeFooterText: {
    color: "#94a3b8",
    fontSize: 12,
  },

  // Section headers
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 26,
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#e2e8f0",
    fontSize: 15,
    fontWeight: "700",
  },

  sectionSubtitle: {
    color: "#475569",
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: "700",
  },

  // Information card
  infoCard: {
    backgroundColor: "#121c2c",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#253449",
    paddingHorizontal: 16,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    gap: 14,
  },

  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: "#64748b",
    fontSize: 12,
    marginBottom: 5,
  },

  infoValue: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 21,
  },

  infoSubValue: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#253449",
    marginLeft: 58,
  },

  // Status card
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121c2c",
    borderWidth: 1,
    borderColor: "#253449",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },

  statusCardIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#34d39912",
    alignItems: "center",
    justifyContent: "center",
  },

  statusCardContent: {
    flex: 1,
  },

  statusCardTitle: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 5,
  },

  statusCardDescription: {
    color: "#64748b",
    fontSize: 11,
    lineHeight: 17,
  },

  // Note
  noteCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#101827",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
    gap: 10,
  },

  noteText: {
    flex: 1,
    color: "#64748b",
    fontSize: 11,
    lineHeight: 18,
  },
});
