import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ChatMessage as ChatMessageType } from '../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isSelf = message.sender.self;

  return (
    <View style={[styles.container, isSelf ? styles.selfContainer : styles.otherContainer]}>
      {!isSelf && (
        <Image
          source={{ uri: message.sender.image }}
          style={styles.avatar}
        />
      )}
      <View style={[
        styles.messageBox,
        isSelf ? styles.selfMessage : styles.otherMessage,
        isSelf ? { marginLeft: 48 } : { marginRight: 48 }
      ]}>
        <Text style={[styles.messageText, isSelf ? styles.selfText : styles.otherText]}>
          {message.message}
        </Text>
        <Text style={[styles.timeText, isSelf ? styles.selfTimeText : styles.otherTimeText]}>
          {message.time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  selfContainer: {
    justifyContent: 'flex-end',
  },
  otherContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  messageBox: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  selfMessage: {
    backgroundColor: '#2B6BE6',
  },
  otherMessage: {
    backgroundColor: '#F2F2F2',
  },
  messageText: {
    fontSize: 16,
  },
  selfText: {
    color: 'white',
  },
  otherText: {
    color: 'black',
  },
  timeText: {
    fontSize: 12,
    marginTop: 4,
  },
  selfTimeText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherTimeText: {
    color: '#666',
  },
});