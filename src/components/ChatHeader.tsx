import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface ChatHeaderProps {
  from: string;
  to: string;
  onBack: () => void;
  onMenu: () => void;
}

export default function ChatHeader({
  from,
  to,
  onBack,
  onMenu,
}: ChatHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Trip 1</Text>
        </View>
        <MaterialCommunityIcons
          name="square-edit-outline"
          size={30}
          color="black"
        />
      </View>
      <View style={styles.header}>
        <View style={styles.tripDetails}>
          <View style={styles.locationRow}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.location}>{from}</Text>
          </View>
          <View style={styles.locationRow}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.location}>{to}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          {showMenu && (
            <View style={styles.menuContainer}>
              <TouchableOpacity style={[styles.menuItem, styles.borderBottom]}>
                <Ionicons name="people" size={20} color="#666" />
                <Text style={styles.menuText}>Members</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.menuItem, styles.borderBottom]}>
                <Ionicons name="share" size={20} color="#666" />
                <Text style={styles.menuText}>Share Number</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="warning" size={20} color="#666" />
                <Text style={styles.menuText}>Report</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    zIndex: 1000,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tripDetails: {
    marginTop: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  label: {
    width: 40,
    color: "#666",
  },
  location: {
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 16,
  },
  menuContainer: {
    position: "absolute",
    right: 10,
    top: 30,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 150,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
});
