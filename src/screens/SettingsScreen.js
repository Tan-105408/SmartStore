
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import AppHeader from "../components/core/AppHeader";

export default function SettingsScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Xác nhận đăng xuất", "Bạn có chắc muốn đăng xuất khỏi SmartStores?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", onPress: logout, style: "destructive" },
    ]);
  };

  const getInitial = (name) => {
    return name?.trim()?.charAt(0)?.toUpperCase() || "U";
  };

  const MenuItem = ({ icon, color, title, subtitle, onPress, danger }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.menuIconBox,
          { backgroundColor: `${color}15` },
        ]}
      >
        <Ionicons name={icon} size={20} color={color} />
      </View>

      <View style={styles.menuInfo}>
        <Text style={[styles.menuText, danger && styles.dangerText]}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        ) : null}
      </View>

      {!danger && (
        <Ionicons name="chevron-forward" size={18} color="#475569" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Cài Đặt" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* PROFILE */}
        <Text style={styles.sectionLabel}>TÀI KHOẢN</Text>

        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitial(user?.name)}</Text>
              </View>
              <View style={styles.onlineDot} />
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.userName} numberOfLines={1}>
                {user?.name || "Người dùng"}
              </Text>

              <View style={styles.roleBadge}>
                <Ionicons name="shield-checkmark" size={12} color="#34d399" />
                <Text style={styles.roleText}>{user?.role || "User"}</Text>
              </View>
            </View>

            <View style={styles.profileArrow}>
              <Ionicons name="person-outline" size={18} color="#64748b" />
            </View>
          </View>

          <View style={styles.profileDivider} />

          <View style={styles.storeInfo}>
            <View style={styles.storeIcon}>
              <Ionicons name="storefront-outline" size={16} color="#60a5fa" />
            </View>
            <View style={styles.storeTextContainer}>
              <Text style={styles.storeLabel}>CỬA HÀNG HIỆN TẠI</Text>
              <Text style={styles.storeName} numberOfLines={1}>
                {user?.storeName || "Chưa thiết lập cửa hàng"}
              </Text>
            </View>
            <View style={styles.storeIndicator}>
              <View style={styles.storeDot} />
            </View>
          </View>
        </View>

        {/* STORE MANAGEMENT */}
        <Text style={styles.sectionLabel}>QUẢN LÝ CỬA HÀNG</Text>

        <View style={styles.menuContainer}>
          <MenuItem
            icon="storefront-outline"
            color="#60a5fa"
            title="Thông tin cửa hàng"
            subtitle="Tên, thông tin và cấu hình cửa hàng"
            onPress={() => navigation.navigate("StoreProfile")}
          />

          <View style={styles.menuDivider} />

          <MenuItem
            icon="people-outline"
            color="#a78bfa"
            title="Quản lý nhân viên"
            subtitle="Tài khoản và quyền truy cập nhân viên"
            onPress={() => navigation.navigate("StaffManagement")}
          />
        </View>

        {/* SECURITY */}
        <Text style={styles.sectionLabel}>TÀI KHOẢN & BẢO MẬT</Text>

        <View style={styles.menuContainer}>
          <MenuItem
            icon="shield-checkmark-outline"
            color="#34d399"
            title="Bảo mật & Quyền riêng tư"
            subtitle="Kiểm soát bảo mật tài khoản"
            onPress={() => {}}
          />
        </View>

        {/* LOGOUT */}
        <Text style={styles.sectionLabel}>THAO TÁC</Text>

        <TouchableOpacity
          style={styles.logoutCard}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <View style={styles.logoutIconBox}>
            <Ionicons name="log-out-outline" size={20} color="#f87171" />
          </View>

          <View style={styles.logoutInfo}>
            <Text style={styles.logoutTitle}>Đăng xuất</Text>
            <Text style={styles.logoutSubtitle}>
              Kết thúc phiên đăng nhập hiện tại
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#7f3b42" />
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <Ionicons name="storefront" size={15} color="#34d399" />
            <Text style={styles.footerBrand}>SMARTSTORES</Text>
          </View>

          <Text style={styles.version}>IoT MANAGEMENT SYSTEM · v1.0.0</Text>
          <Text style={styles.footerCopyright}>Smart Retail · Built with Expo</Text>
        </View>
      </ScrollView>
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

  scrollContent: {
    paddingBottom: 30,
  },

  sectionLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginTop: 24,
    marginBottom: 11,
    marginLeft: 3,
  },

  // PROFILE
  profileCard: {
    backgroundColor: "#121c2c",
    borderRadius: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: "#263449",
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarWrapper: {
    position: "relative",
    marginRight: 13,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: "#163b35",
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#34d399",
    fontSize: 22,
    fontWeight: "900",
  },

  onlineDot: {
    position: "absolute",
    right: -3,
    bottom: -3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#34d399",
    borderWidth: 3,
    borderColor: "#121c2c",
  },

  profileInfo: {
    flex: 1,
  },

  userName: {
    color: "#f1f5f9",
    fontSize: 17,
    fontWeight: "800",
  },

  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 5,
    backgroundColor: "rgba(52,211,153,0.08)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
  },

  roleText: {
    color: "#34d399",
    fontSize: 10,
    fontWeight: "700",
  },

  profileArrow: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#1b2738",
    alignItems: "center",
    justifyContent: "center",
  },

  profileDivider: {
    height: 1,
    backgroundColor: "#243246",
    marginVertical: 16,
  },

  storeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  storeIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(96,165,250,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  storeTextContainer: {
    flex: 1,
  },

  storeLabel: {
    color: "#64748b",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  storeName: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },

  storeIndicator: {
    width: 25,
    height: 25,
    borderRadius: 8,
    backgroundColor: "rgba(52,211,153,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },

  storeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#34d399",
  },

  // MENU
  menuContainer: {
    backgroundColor: "#121c2c",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#263449",
    overflow: "hidden",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },

  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  menuInfo: {
    flex: 1,
  },

  menuText: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "700",
  },

  menuSubtitle: {
    color: "#64748b",
    fontSize: 10,
    marginTop: 4,
  },

  menuDivider: {
    height: 1,
    backgroundColor: "#243246",
    marginLeft: 66,
  },

  dangerText: {
    color: "#f87171",
  },

  // LOGOUT
  logoutCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239,68,68,0.04)",
    borderRadius: 15,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.15)",
    gap: 12,
  },

  logoutIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(239,68,68,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutInfo: {
    flex: 1,
  },

  logoutTitle: {
    color: "#f87171",
    fontSize: 13,
    fontWeight: "800",
  },

  logoutSubtitle: {
    color: "#64748b",
    fontSize: 10,
    marginTop: 4,
  },

  // FOOTER
  footer: {
    alignItems: "center",
    marginTop: 36,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#1b2738",
  },

  footerLogo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  footerBrand: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  version: {
    color: "#475569",
    fontSize: 9,
    letterSpacing: 0.8,
    marginTop: 8,
  },

  footerCopyright: {
    color: "#334155",
    fontSize: 9,
    marginTop: 5,
  },
});
