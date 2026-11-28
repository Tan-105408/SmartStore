
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InfoRow({
  icon,
  label,
  value,
  iconColor = "#34d399",
  iconBackground,
  subtitle,
  onPress,
  showDivider = false,
  valueColor = "#f1f5f9",
  compact = false,
}) {
  const content = (
    <View style={[styles.row, compact && styles.compactRow]}>
      {/* Icon */}
      <View
        style={[
          styles.iconBox,
          compact && styles.compactIcon,
          {
            backgroundColor:
              iconBackground || `${iconColor}15`,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={compact ? 18 : 21}
          color={iconColor}
        />
      </View>

      {/* Information */}
      <View style={styles.info}>
        {!!label && <Text style={styles.label}>{label}</Text>}

        {!!value && (
          <Text style={[styles.value, { color: valueColor }]}>
            {value}
          </Text>
        )}

        {!!subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>

      {/* Optional arrow */}
      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={18}
          color="#64748b"
        />
      )}
    </View>
  );

  return (
    <View>
      {onPress ? (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          {content}
        </TouchableOpacity>
      ) : (
        content
      )}

      {showDivider && <View style={styles.divider} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 5,
    minHeight: 60,
  },

  compactRow: {
    minHeight: 48,
    gap: 12,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  compactIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
  },

  info: {
    flex: 1,
  },

  label: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 21,
  },

  subtitle: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },

  divider: {
    height: 1,
    backgroundColor: "#253449",
    marginLeft: 58,
  },
});
