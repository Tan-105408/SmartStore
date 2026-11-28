
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ControlButton({
  title,
  icon,
  onPress,
  active = false,
  color = "#44d7a8",
  subtitle,
  disabled = false,
  style,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected: active, disabled }}
      style={({ pressed }) => [
        styles.button,
        active && {
          backgroundColor: `${color}18`,
          borderColor: `${color}70`,
        },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {/* Icon */}
      <View
        style={[
          styles.iconBox,
          active && { backgroundColor: `${color}20` },
        ]}
      >
        <Ionicons
          name={icon}
          size={21}
          color={active ? color : "#94a3b8"}
        />
      </View>

      {/* Text */}
      <View style={styles.content}>
        <Text
          style={[
            styles.text,
            active && { color: color, fontWeight: "700" },
            disabled && styles.disabledText,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Active indicator */}
      <View
        style={[
          styles.indicator,
          active && {
            backgroundColor: color,
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121c2c",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#263449",
    gap: 10,
    marginVertical: 4,
    minHeight: 62,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  text: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "600",
  },

  subtitle: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 3,
  },

  indicator: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#334155",
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  disabled: {
    opacity: 0.4,
  },

  disabledText: {
    color: "#64748b",
  },
});
