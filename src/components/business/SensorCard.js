
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SensorCard({
  title,
  value,
  unit,
  icon,
  color = "#44d7a8",
  subtitle,
  status,
}) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: `${color}18` }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          {status && (
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: color }]} />
              <Text style={[styles.statusText, { color }]}>
                {status}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Sensor value */}
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color }]} numberOfLines={1}>
          {value ?? "--"}
        </Text>

        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>

      {/* Optional description */}
      {subtitle && (
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#121c2c",
    borderRadius: 18,
    padding: 16,
    flex: 1,
    minWidth: "45%",
    borderWidth: 1,
    borderColor: "#263449",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  headerInfo: {
    flex: 1,
    gap: 4,
  },

  title: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },

  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
  },

  value: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  unit: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },

  subtitle: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 8,
  },
});
