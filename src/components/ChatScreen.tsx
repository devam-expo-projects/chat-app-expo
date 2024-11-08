import * as React from "react";
import { ObservableArray } from "@nativescript/core";
import { StyleSheet } from "react-nativescript";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { fetchChats } from "../services/chatService";
import { ChatMessage as ChatMessageType } from "../types/chat";

export function ChatScreen() {
  const [messages, setMessages] = React.useState<ChatMessageType[]>([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [chatInfo, setChatInfo] = React.useState({ from: "", to: "" });

  const loadChats = async (pageNum: number) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const data = await fetchChats(pageNum);
      if (pageNum === 0) {
        setChatInfo({ from: data.from, to: data.to });
      }
      setMessages(prev => [...prev, ...data.chats]);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadChats(0);
  }, []);

  const handleScroll = (args: any) => {
    const scrollView = args.object;
    if (scrollView.verticalOffset <= 0 && !loading) {
      loadChats(page + 1);
    }
  };

  const handleSend = (message: string) => {
    const newMessage: ChatMessageType = {
      id: Date.now().toString(),
      message,
      sender: {
        image: "~/assets/user-avatar.png",
        is_kyc_verified: true,
        self: true,
        user_id: "self"
      },
      time: new Date().toISOString()
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  return (
    <gridLayout rows="auto, *, auto">
      <ChatHeader
        row="0"
        from={chatInfo.from}
        to={chatInfo.to}
        onBack={() => console.log("Back pressed")}
        onMenu={() => console.log("Menu pressed")}
      />
      
      <scrollView
        row="1"
        onScroll={handleScroll}
        scrollBarIndicatorVisible={true}
      >
        <stackLayout>
          {loading && <activityIndicator busy={true} />}
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </stackLayout>
      </scrollView>

      <ChatInput
        row="2"
        onSend={handleSend}
      />
    </gridLayout>
  );
}