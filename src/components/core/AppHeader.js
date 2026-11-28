
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AppHeader({
  title,
  onBack,
  rightElement,
}) {
  return (
    <View style={styles.header}>
      {/* Back button */}
      {onBack ? (
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={21}
            color="#e2e8f0"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftPlaceholder} />
      )}

      {/* Title */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Optional right action */}
      {rightElement ? (
        <View style={styles.rightElement}>
          {rightElement}
        </View>
      ) : (
        <View style={styles.rightPlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
    paddingHorizontal: 20,
    paddingTop: 10,
    minHeight: 48,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#172235",
    borderWidth: 1,
    borderColor: "#263449",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  leftPlaceholder: {
    width: 0,
  },

  title: {
    flex: 1,
    color: "#f1f5f9",
    fontSize: 21,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  rightElement: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  rightPlaceholder: {
    width: 4,
  },
});
