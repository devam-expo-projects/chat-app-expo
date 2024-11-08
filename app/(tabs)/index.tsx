import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ChatHeader from "../../src/components/ChatHeader";
import ChatMessage from "../../src/components/ChatMessage";
import ChatInput from "../../src/components/ChatInput";
import { ChatMessage as ChatMessageType } from "../../src/types/chat";
import { fetchChats } from "../../src/services/chatService";

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chatInfo, setChatInfo] = useState({ from: "", to: "" });

  const loadChats = async (pageNum: number) => {
    if (loading) return;

    setLoading(true);
    try {
      const data = await fetchChats(pageNum);
      if (pageNum === 0) {
        setChatInfo({ from: data.from, to: data.to });
      }
      setMessages((prev) => [...prev, ...data.chats]);
      setPage(pageNum);
    } catch (error) {
      console.error("Error loading chats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChats(0);
  }, []);

  const handleSend = (message: string) => {
    const newMessage: ChatMessageType = {
      id: Date.now().toString(),
      message,
      sender: {
        image: "https://example.com/avatar.png",
        is_kyc_verified: true,
        self: true,
        user_id: "self",
      },
      time: new Date().toISOString(),
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ChatHeader
        from={chatInfo.from}
        to={chatInfo.to}
        onBack={() => {}}
        onMenu={() => {}}
      />
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        keyExtractor={(item) => item.id}
        inverted
        onEndReached={() => loadChats(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        contentContainerStyle={styles.messageList}
      />
      <ChatInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 15,
  },
  messageList: {
    paddingVertical: 16,
  },
});
