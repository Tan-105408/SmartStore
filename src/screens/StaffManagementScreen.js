
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../components/core/AppHeader";

export default function StaffManagementScreen({ navigation }) {
  const STAFFS = [
    { id: "1", name: "Nguyễn Văn A", role: "Quản lý ca", phone: "0901234567" },
    { id: "2", name: "Trần Thị B", role: "Nhân viên bán hàng", phone: "0909876543" },
  ];

  const [search, setSearch] = useState("");

  const filteredStaff = STAFFS.filter((staff) =>
    staff.name.toLowerCase().includes(search.toLowerCase()) ||
    staff.role.toLowerCase().includes(search.toLowerCase()) ||
    staff.phone.includes(search)
  );

  const getAvatarColor = (index) => {
    const colors = ["#34d399", "#60a5fa", "#a78bfa", "#fbbf24", "#fb7185"];
    return colors[index % colors.length];
  };

  const renderStaff = ({ item, index }) => {
    const avatarColor = getAvatarColor(index);

    return (
      <View style={styles.staffCard}>
        <View style={styles.staffTop}>
          <View style={[styles.avatar, { backgroundColor: `${avatarColor}18`, borderColor: `${avatarColor}40` }]}>
            <Text style={[styles.avatarText, { color: avatarColor }]}>
              {item.name.charAt(0)}
            </Text>
          </View>

          <View style={styles.staffInfo}>
            <Text style={styles.staffName} numberOfLines={1}>
              {item.name}
            </Text>

            <View style={styles.roleBadge}>
              <Ionicons
                name="briefcase-outline"
                size={11}
                color="#94a3b8"
              />
              <Text style={styles.roleText}>{item.role}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.moreButton}
            activeOpacity={0.7}
            onPress={() => {}}
          >
            <Ionicons name="ellipsis-vertical" size={18} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.staffFooter}>
          <View style={styles.contactInfo}>
            <Ionicons name="call-outline" size={15} color="#64748b" />
            <Text style={styles.phoneText}>{item.phone}</Text>
          </View>

          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Hoạt động</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Nhân Viên" onBack={() => navigation.goBack()} />

      <FlatList
        data={filteredStaff}
        keyExtractor={(item) => item.id}
        renderItem={renderStaff}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View style={styles.headerSection}>
              <View>
                <Text style={styles.pageTitle}>Đội ngũ nhân viên</Text>
                <Text style={styles.pageSubtitle}>
                  Quản lý nhân sự và phân quyền cửa hàng
                </Text>
              </View>

              <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
                <Ionicons name="person-add-outline" size={18} color="#06271e" />
              </TouchableOpacity>
            </View>

            {/* STATS */}
            <View style={styles.statsCard}>
              <View style={styles.statsIconBox}>
                <Ionicons name="people" size={22} color="#60a5fa" />
              </View>

              <View style={styles.statsInfo}>
                <Text style={styles.statsValue}>{STAFFS.length}</Text>
                <Text style={styles.statsLabel}>Tổng nhân viên</Text>
              </View>

              <View style={styles.statsDivider} />

              <View style={styles.statsRight}>
                <View style={styles.statsStatusDot} />
                <Text style={styles.statsStatusText}>Đang quản lý</Text>
              </View>
            </View>

            {/* SEARCH */}
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={19} color="#64748b" />
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm tên, vai trò, số điện thoại..."
                placeholderTextColor="#64748b"
                value={search}
                onChangeText={setSearch}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <Ionicons name="close-circle" size={18} color="#64748b" />
                </TouchableOpacity>
              )}
            </View>

            {/* LIST LABEL */}
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>DANH SÁCH NHÂN VIÊN</Text>
              <Text style={styles.listCount}>{filteredStaff.length} người</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={28} color="#475569" />
            <Text style={styles.emptyTitle}>Không tìm thấy nhân viên</Text>
            <Text style={styles.emptySubtitle}>
              Thử tìm kiếm bằng tên hoặc số điện thoại khác.
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Ionicons name="shield-checkmark-outline" size={15} color="#475569" />
            <Text style={styles.footerText}>STAFF MANAGEMENT · SMARTSTORES</Text>
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
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  listContent: {
    paddingBottom: 30,
  },

  // HEADER
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 20,
  },

  pageTitle: {
    color: "#f1f5f9",
    fontSize: 21,
    fontWeight: "900",
  },

  pageSubtitle: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 5,
  },

  addButton: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#34d399",
    alignItems: "center",
    justifyContent: "center",
  },

  // STATS
  statsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121c2c",
    borderWidth: 1,
    borderColor: "#263449",
    borderRadius: 16,
    padding: 15,
    marginBottom: 18,
  },

  statsIconBox: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "rgba(96,165,250,0.09)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  statsInfo: {
    flex: 1,
  },

  statsValue: {
    color: "#f1f5f9",
    fontSize: 23,
    fontWeight: "900",
  },

  statsLabel: {
    color: "#64748b",
    fontSize: 10,
    marginTop: 3,
  },

  statsDivider: {
    width: 1,
    height: 35,
    backgroundColor: "#263449",
    marginHorizontal: 12,
  },

  statsRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  statsStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#34d399",
  },

  statsStatusText: {
    color: "#34d399",
    fontSize: 10,
    fontWeight: "700",
  },

  // SEARCH
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121c2c",
    borderRadius: 12,
    height: 47,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: "#263449",
    gap: 10,
    marginBottom: 24,
  },

  searchInput: {
    flex: 1,
    color: "#f1f5f9",
    fontSize: 12,
  },

  // LIST HEADER
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  listTitle: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  listCount: {
    color: "#64748b",
    fontSize: 10,
  },

  // STAFF CARD
  staffCard: {
    backgroundColor: "#121c2c",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#263449",
  },

  staffTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 47,
    height: 47,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
  },

  avatarText: {
    fontSize: 19,
    fontWeight: "900",
  },

  staffInfo: {
    flex: 1,
  },

  staffName: {
    color: "#f1f5f9",
    fontSize: 14,
    fontWeight: "800",
  },

  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },

  roleText: {
    color: "#94a3b8",
    fontSize: 10,
  },

  moreButton: {
    width: 33,
    height: 33,
    borderRadius: 10,
    backgroundColor: "#1b2738",
    alignItems: "center",
    justifyContent: "center",
  },

  cardDivider: {
    height: 1,
    backgroundColor: "#243246",
    marginVertical: 13,
  },

  staffFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  phoneText: {
    color: "#94a3b8",
    fontSize: 11,
  },

  activeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(52,211,153,0.07)",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
  },

  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#34d399",
  },

  activeText: {
    color: "#34d399",
    fontSize: 9,
    fontWeight: "700",
  },

  // EMPTY
  emptyState: {
    alignItems: "center",
    paddingVertical: 45,
    paddingHorizontal: 20,
  },

  emptyTitle: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 14,
  },

  emptySubtitle: {
    color: "#475569",
    fontSize: 11,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 17,
  },

  // FOOTER
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 28,
    paddingTop: 17,
    borderTopWidth: 1,
    borderTopColor: "#1b2738",
  },

  footerText: {
    color: "#334155",
    fontSize: 9,
    letterSpacing: 0.8,
  },
});
