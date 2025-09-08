import { useConversation } from "@elevenlabs/react-native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const SessionScreen = () => {
  const conversation = useConversation({
    onConnect: () => console.log("Connected to conversation"),
    onDisconnect: () => console.log("Disconnected from conversation"),
    onMessage: (message) => console.log("Received message:", message),
    onError: (error) => console.error("Conversation error:", error),
    onModeChange: (mode) => console.log("Conversation mode changed:", mode),
    onStatusChange: (prop) =>
      console.log("Conversation status changed:", prop.status),
    onCanSendFeedbackChange: (prop) =>
      console.log("Can send feedback changed:", prop.canSendFeedback),
    onUnhandledClientToolCall: (params) =>
      console.log("Unhandled client tool call:", params),
  });

  const startConversation = async () => {
    try {
      await conversation.startSession({
        agentId: process.env.EXPO_PUBLIC_AGENT_ID,
        dynamicVariables: {
          user_name: "Kusal",
          session_title: "test",
        },
      });
      console.log("");
    } catch (error) {
      console.log("Failed to start conversation:", error);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.log("Failed to end conversation:", error);
    }
  };

  return (
    <View>
      <Text>Session Screen</Text>
      <Button title="Start Conversation" onPress={startConversation} />
      <Button
        title="End Conversation"
        color={"red"}
        onPress={endConversation}
      />
    </View>
  );
};

export default SessionScreen;

const styles = StyleSheet.create({});
