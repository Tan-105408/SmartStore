
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function StatsCard({
  title,
  value,
  icon = "stats-chart-outline",
  colors = ["#44d7a8", "#10b981"],
  subtitle,
  style,
  compact = false,
}) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, compact && styles.compactCard, style]}
    >
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <Ionicons
            name={icon}
            size={compact ? 18 : 21}
            color="#ffffff"
          />
        </View>
      </View>

      {/* Main value */}
      <Text
        style={[styles.value, compact && styles.compactValue]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>

      {/* Title */}
      <Text style={styles.label} numberOfLines={2}>
        {title}
      </Text>

      {/* Optional subtitle */}
      {subtitle && (
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 140,
    padding: 16,
    borderRadius: 18,
    justifyContent: "space-between",
  },

  compactCard: {
    minHeight: 110,
    padding: 13,
    borderRadius: 15,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  value: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 12,
    letterSpacing: -0.5,
  },

  compactValue: {
    fontSize: 24,
    marginTop: 8,
  },

  label: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },

  subtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 10,
    marginTop: 5,
  },
});
