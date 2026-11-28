
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FormInput({
  label,
  icon,
  error,
  isPassword = false,
  style,
  containerStyle,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Input wrapper */}
      <View
        style={[
          styles.inputWrapper,
          focused && styles.focused,
          error && styles.errorBorder,
        ]}
      >
        {/* Optional icon */}
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={focused ? "#34d399" : "#64748b"}
            style={styles.leftIcon}
          />
        )}

        {/* Text input */}
        <TextInput
          {...props}
          style={[styles.input, style]}
          placeholderTextColor="#64748b"
          secureTextEntry={isPassword && !showPassword}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
        />

        {/* Toggle password visibility */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.passwordToggle}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#64748b"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 2,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121c2c",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#263449",
    minHeight: 54,
  },

  focused: {
    borderColor: "#34d399",
  },

  errorBorder: {
    borderColor: "#fb7185",
  },

  leftIcon: {
    marginLeft: 15,
  },

  input: {
    flex: 1,
    color: "#f1f5f9",
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

  passwordToggle: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  errorText: {
    color: "#fb7185",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 3,
  },
});
