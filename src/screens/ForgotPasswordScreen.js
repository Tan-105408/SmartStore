
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      Alert.alert("Lỗi", "Vui lòng nhập Email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      Alert.alert("Email không hợp lệ", "Vui lòng nhập địa chỉ Email chính xác.");
      return;
    }

    Alert.alert(
      "Thành công",
      "Mã xác thực khôi phục mật khẩu đã được gửi đến email của bạn.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#e2e8f0" />
        </TouchableOpacity>

        {/* HERO */}
        <View style={styles.hero}>
          <LinearGradient
            colors={["#164e43", "#12342f", "#142536"]}
            style={styles.heroGradient}
          >
            <View style={styles.heroIcon}>
              <Ionicons
                name="lock-closed-outline"
                size={34}
                color="#34d399"
              />
            </View>

            <View style={styles.heroDecor1} />
            <View style={styles.heroDecor2} />
          </LinearGradient>
        </View>

        {/* TITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.eyebrow}>ACCOUNT RECOVERY</Text>

          <Text style={styles.title}>Quên mật khẩu?</Text>

          <Text style={styles.subtitle}>
            Đừng lo lắng. Hãy nhập email liên kết với tài khoản của bạn,
            chúng tôi sẽ hướng dẫn bạn khôi phục quyền truy cập.
          </Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <Text style={styles.label}>Địa chỉ Email</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#64748b"
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              placeholderTextColor="#526176"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
            />

            {email.length > 0 && (
              <TouchableOpacity onPress={() => setEmail("")}>
                <Ionicons
                  name="close-circle"
                  size={18}
                  color="#64748b"
                />
              </TouchableOpacity>
            )}
          </View>

          {/* SUBMIT BUTTON */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleReset}
            style={styles.buttonWrapper}
          >
            <LinearGradient
              colors={["#34d399", "#10b981"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Gửi mã xác thực</Text>
              <Ionicons
                name="arrow-forward"
                size={19}
                color="#06251e"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* SECURITY INFO */}
        <View style={styles.securityCard}>
          <View style={styles.securityIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={19}
              color="#34d399"
            />
          </View>

          <View style={styles.securityInfo}>
            <Text style={styles.securityTitle}>Bảo mật tài khoản</Text>
            <Text style={styles.securityText}>
              Thông tin của bạn được bảo vệ. Mã xác thực chỉ được gửi
              đến địa chỉ email đã đăng ký.
            </Text>
          </View>
        </View>

        {/* BACK TO LOGIN */}
        <View style={styles.bottomSection}>
          <Text style={styles.bottomText}>Bạn đã nhớ mật khẩu?</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>SMART STORES</Text>
          <View style={styles.footerLine} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1120",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 30,
  },

  backButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#151f30",
    borderWidth: 1,
    borderColor: "#263448",
    alignItems: "center",
    justifyContent: "center",
  },

  hero: {
    alignItems: "center",
    marginTop: 35,
    marginBottom: 30,
  },

  heroGradient: {
    width: 120,
    height: 120,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.15)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  heroIcon: {
    width: 76,
    height: 76,
    borderRadius: 25,
    backgroundColor: "rgba(52,211,153,0.09)",
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.18)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  heroDecor1: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.08)",
    top: -45,
    right: -35,
  },

  heroDecor2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.08)",
    bottom: -35,
    left: -25,
  },

  titleSection: {
    marginBottom: 30,
  },

  eyebrow: {
    color: "#34d399",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 10,
  },

  title: {
    color: "#f8fafc",
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  subtitle: {
    color: "#8492a8",
    fontSize: 13,
    lineHeight: 21,
    marginTop: 12,
  },

  form: {
    marginBottom: 25,
  },

  label: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121c2c",
    borderWidth: 1,
    borderColor: "#263449",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 56,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    color: "#f1f5f9",
    fontSize: 14,
  },

  buttonWrapper: {
    marginTop: 18,
    borderRadius: 15,
    overflow: "hidden",
  },

  button: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  buttonText: {
    color: "#06251e",
    fontSize: 14,
    fontWeight: "800",
  },

  securityCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#11231f",
    borderWidth: 1,
    borderColor: "#1c3932",
    borderRadius: 16,
    padding: 15,
  },

  securityIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: "#18342e",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  securityInfo: {
    flex: 1,
  },

  securityTitle: {
    color: "#d1fae5",
    fontSize: 12,
    fontWeight: "700",
  },

  securityText: {
    color: "#7f9b91",
    fontSize: 10,
    lineHeight: 16,
    marginTop: 5,
  },

  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    gap: 5,
  },

  bottomText: {
    color: "#64748b",
    fontSize: 12,
  },

  loginText: {
    color: "#34d399",
    fontSize: 12,
    fontWeight: "800",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 35,
  },

  footerLine: {
    width: 35,
    height: 1,
    backgroundColor: "#243044",
  },

  footerText: {
    color: "#475569",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },
});
