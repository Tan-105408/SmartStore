
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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("admin@smartstore.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = () => {
    const res = login(email, password);
    if (!res.success) {
      Alert.alert("Lỗi đăng nhập", res.message);
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
        {/* HEADER / BRAND */}
        <View style={styles.headerContainer}>
          <View style={styles.brandIconOuter}>
            <View style={styles.brandIconInner}>
              <Ionicons
                name="storefront"
                size={38}
                color="#34d399"
              />
            </View>
            <View style={styles.brandBadge}>
              <Ionicons name="hardware-chip" size={14} color="#0b1120" />
            </View>
          </View>

          <Text style={styles.appTitle}>SMARTSTORES</Text>
          <Text style={styles.appSubtitle}>SMART RETAIL MANAGEMENT</Text>

          <View style={styles.brandDivider}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerDot} />
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.description}>
            Hệ thống quản lý cửa hàng thông minh
          </Text>
        </View>

        {/* LOGIN CARD */}
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <View>
              <Text style={styles.formTitle}>Chào mừng trở lại</Text>
              <Text style={styles.formSubtitle}>
                Đăng nhập để truy cập hệ thống
              </Text>
            </View>

            <View style={styles.formHeaderIcon}>
              <Ionicons name="person-outline" size={20} color="#34d399" />
            </View>
          </View>

          {/* EMAIL */}
          <Text style={styles.inputLabel}>Tài khoản</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={19}
              color="#64748b"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email / Tên tài khoản"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* PASSWORD */}
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
              placeholder="Nhập mật khẩu"
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

          {/* FORGOT PASSWORD */}
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate("ForgotPassword")}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.loginButtonText}>ĐĂNG NHẬP HỆ THỐNG</Text>
            <Ionicons name="arrow-forward" size={19} color="#06271e" />
          </TouchableOpacity>

          {/* REGISTER */}
          <View style={styles.registerDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.registerDividerText}>HOẶC</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.registerPrompt}>
            <Text style={styles.promptText}>Chưa có tài khoản? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              activeOpacity={0.7}
            >
              <Text style={styles.registerText}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SYSTEM STATUS */}
        <View style={styles.systemStatus}>
          <View style={styles.systemStatusIcon}>
            <Ionicons name="shield-checkmark-outline" size={17} color="#34d399" />
          </View>

          <View style={styles.systemStatusContent}>
            <Text style={styles.systemStatusTitle}>Secure Access</Text>
            <Text style={styles.systemStatusSubtitle}>
              Hệ thống quản lý truy cập an toàn
            </Text>
          </View>

          <View style={styles.systemStatusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>READY</Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SMARTSTORES IoT</Text>
          <Text style={styles.footerVersion}>VERSION 1.0.0 · EXPO REACT NATIVE</Text>
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
    paddingHorizontal: 24,
    paddingTop: 65,
    paddingBottom: 30,
    justifyContent: "center",
  },

  // BRAND
  headerContainer: {
    alignItems: "center",
    marginBottom: 35,
  },

  brandIconOuter: {
    width: 94,
    height: 94,
    borderRadius: 30,
    backgroundColor: "rgba(52,211,153,0.07)",
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  brandIconInner: {
    width: 72,
    height: 72,
    borderRadius: 23,
    backgroundColor: "#142a2a",
    alignItems: "center",
    justifyContent: "center",
  },

  brandBadge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "#34d399",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#0b1120",
  },

  appTitle: {
    color: "#f8fafc",
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: 2,
  },

  appSubtitle: {
    color: "#34d399",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 3,
    marginTop: 7,
  },

  brandDivider: {
    flexDirection: "row",
    alignItems: "center",
    width: 110,
    marginTop: 20,
    marginBottom: 14,
    gap: 10,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#263449",
  },

  dividerDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#34d399",
  },

  description: {
    color: "#94a3b8",
    fontSize: 13,
  },

  // FORM
  formCard: {
    backgroundColor: "#121c2c",
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: "#253449",
  },

  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },

  formTitle: {
    color: "#f1f5f9",
    fontSize: 21,
    fontWeight: "800",
  },

  formSubtitle: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 6,
  },

  formHeaderIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "rgba(52,211,153,0.08)",
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  inputLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 9,
    marginLeft: 2,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0b1120",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#263449",
  },

  inputIcon: {
    marginRight: 11,
  },

  input: {
    flex: 1,
    color: "#f1f5f9",
    fontSize: 14,
  },

  eyeButton: {
    padding: 5,
  },

  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -5,
    marginBottom: 20,
  },

  forgotPasswordText: {
    color: "#34d399",
    fontSize: 12,
    fontWeight: "600",
  },

  // BUTTON
  loginButton: {
    backgroundColor: "#34d399",
    borderRadius: 13,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 3,
  },

  loginButtonText: {
    color: "#06271e",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.6,
  },

  // REGISTER
  registerDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 24,
    marginBottom: 18,
  },

  registerDividerText: {
    color: "#475569",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  registerPrompt: {
    flexDirection: "row",
    justifyContent: "center",
  },

  promptText: {
    color: "#64748b",
    fontSize: 13,
  },

  registerText: {
    color: "#34d399",
    fontSize: 13,
    fontWeight: "800",
  },

  // STATUS
  systemStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101a29",
    borderWidth: 1,
    borderColor: "#1e2c3e",
    borderRadius: 14,
    padding: 13,
    marginTop: 18,
  },

  systemStatusIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "rgba(52,211,153,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  systemStatusContent: {
    flex: 1,
  },

  systemStatusTitle: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "700",
  },

  systemStatusSubtitle: {
    color: "#64748b",
    fontSize: 10,
    marginTop: 3,
  },

  systemStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(52,211,153,0.07)",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 5,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#34d399",
  },

  statusText: {
    color: "#34d399",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // FOOTER
  footer: {
    alignItems: "center",
    marginTop: 30,
  },

  footerText: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },

  footerVersion: {
    color: "#334155",
    fontSize: 9,
    marginTop: 6,
    letterSpacing: 0.5,
  },
});
