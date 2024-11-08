import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const ShareOptions = () => (
    <View style={styles.shareOptionsContainer}>
      <TouchableOpacity
        style={styles.shareOption}
        onPress={() => {
          setShowShareOptions(false);
        }}
      >
        <Ionicons name="camera" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shareOption}
        onPress={() => {
          setShowShareOptions(false);
        }}
      >
        <Ionicons name="videocam" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shareOption}
        onPress={() => {
          setShowShareOptions(false);
        }}
      >
        <Ionicons name="document" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Reply to @Rohit Yadav"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => setShowShareOptions(!showShareOptions)}
        >
          <Ionicons name="attach" size={24} color="#666" />
        </TouchableOpacity>
        {showShareOptions && <ShareOptions />}
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#2B6BE6" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
    marginRight: 4,
  },
  shareOptionsContainer: {
    position: "absolute",
    bottom: "100%",
    right: 0,
    flexDirection: "row",
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 8,
  },
  shareOption: {
    padding: 8,
    marginHorizontal: 4,
  },
});
