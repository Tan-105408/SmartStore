
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();

  const handleRegister = () => {
    if (!name || !email || !password || !storeName) {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhập đầy đủ các thông tin yêu cầu."
      );
      return;
    }

    const res = register(name, email, password, storeName);

    if (!res.success) {
      Alert.alert("Lỗi đăng ký", res.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0b1120" />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <View style={styles.backIconBox}>
            <Ionicons name="arrow-back" size={19} color="#cbd5e1" />
          </View>
          <Text style={styles.backText}>Quay lại</Text>
        </TouchableOpacity>

        {/* HEADER */}
        <View style={styles.headerContainer}>
          <View style={styles.headerBadge}>
            <Ionicons name="person-add-outline" size={15} color="#34d399" />
            <Text style={styles.headerBadgeText}>NEW ACCOUNT</Text>
          </View>

          <Text style={styles.title}>Tạo tài khoản</Text>
          <Text style={styles.subtitle}>
            Đăng ký để bắt đầu quản lý cửa hàng thông minh.
          </Text>
        </View>

        {/* FORM */}
        <View style={styles.formCard}>
          {/* SECTION 1 */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="person-outline" size={17} color="#60a5fa" />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
              <Text style={styles.sectionSubtitle}>Thông tin người quản lý</Text>
            </View>
          </View>

          <Text style={styles.inputLabel}>Họ và tên</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={19}
              color="#64748b"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập họ và tên"
              placeholderTextColor="#64748b"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* SECTION 2 */}
          <View style={[styles.sectionHeader, styles.secondSection]}>
            <View style={styles.sectionIcon}>
              <Ionicons name="storefront-outline" size={17} color="#fbbf24" />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Thông tin cửa hàng</Text>
              <Text style={styles.sectionSubtitle}>Định danh cửa hàng của bạn</Text>
            </View>
          </View>

          <Text style={styles.inputLabel}>Tên cửa hàng</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="business-outline"
              size={19}
              color="#64748b"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="VD: Smart Store - Chi nhánh 01"
              placeholderTextColor="#64748b"
              value={storeName}
              onChangeText={setStoreName}
            />
          </View>

          {/* SECTION 3 */}
          <View style={[styles.sectionHeader, styles.secondSection]}>
            <View style={styles.sectionIcon}>
              <Ionicons name="shield-checkmark-outline" size={17} color="#34d399" />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
              <Text style={styles.sectionSubtitle}>Thiết lập thông tin đăng nhập</Text>
            </View>
          </View>

          <Text style={styles.inputLabel}>Email liên hệ</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={19}
              color="#64748b"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.inputLabel}>Mật khẩu</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={19}
              color="#64748b"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Tạo mật khẩu"
              placeholderTextColor="#64748b"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#64748b"
              />
            </TouchableOpacity>
          </View>

          {/* REGISTER */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.registerButtonText}>TẠO TÀI KHOẢN</Text>
            <Ionicons name="arrow-forward" size={19} color="#06271e" />
          </TouchableOpacity>

          <View style={styles.securityNote}>
            <Ionicons name="shield-checkmark" size={15} color="#34d399" />
            <Text style={styles.securityText}>
              Thông tin của bạn được sử dụng để thiết lập hệ thống quản lý.
            </Text>
          </View>
        </View>

        {/* LOGIN LINK */}
        <View style={styles.loginPrompt}>
          <Text style={styles.promptText}>Đã có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.footerDot} />
          <Text style={styles.footerText}>SMARTSTORES IoT · VERSION 1.0.0</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#0b1120",
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 52,
    paddingBottom: 30,
  },

  // BACK
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    gap: 10,
  },

  backIconBox: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "#151f30",
    borderWidth: 1,
    borderColor: "#263449",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600",
  },

  // HEADER
  headerContainer: {
    marginBottom: 26,
  },

  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    alignSelf: "flex-start",
    backgroundColor: "rgba(52,211,153,0.08)",
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 13,
  },

  headerBadgeText: {
    color: "#34d399",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  title: {
    color: "#f8fafc",
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
  },

  // CARD
  formCard: {
    backgroundColor: "#121c2c",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#253449",
  },

  // SECTIONS
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginBottom: 19,
  },

  secondSection: {
    marginTop: 9,
    paddingTop: 19,
    borderTopWidth: 1,
    borderTopColor: "#243246",
  },

  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "#1b2739",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 3,
  },

  // INPUTS
  inputLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 2,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0b1120",
    borderRadius: 12,
    paddingHorizontal: 13,
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#263449",
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: "#f1f5f9",
    fontSize: 14,
  },

  eyeButton: {
    padding: 5,
  },

  // BUTTON
  registerButton: {
    backgroundColor: "#34d399",
    borderRadius: 12,
    height: 53,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 8,
  },

  registerButtonText: {
    color: "#06271e",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  // SECURITY
  securityNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 17,
    paddingHorizontal: 2,
  },

  securityText: {
    color: "#64748b",
    fontSize: 10,
    flex: 1,
    lineHeight: 16,
  },

  // LOGIN
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  promptText: {
    color: "#64748b",
    fontSize: 13,
  },

  loginText: {
    color: "#34d399",
    fontSize: 13,
    fontWeight: "800",
  },

  // FOOTER
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 30,
  },

  footerDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#334155",
  },

  footerText: {
    color: "#334155",
    fontSize: 9,
    letterSpacing: 0.5,
  },
});
