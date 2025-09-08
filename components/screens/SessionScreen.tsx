import { sessions } from "@/utils/sessions";
import { useSession } from "@clerk/clerk-expo";
import { useConversation } from "@elevenlabs/react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../common/Button";
import { Gradient } from "../common/gradient";

const SessionScreen = () => {
  const user = useSession();

  const { sessionId } = useLocalSearchParams();

  const session = sessions.find((s) => s.id === sessionId) ?? sessions[0];

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
          user_name: user.session?.user.firstName || "User",
          session_title: session.title,
          session_description: session.description,
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
    <>
      <Gradient
        position="top"
        isSpeaking={
          conversation.status === "connected" ||
          conversation.status === "connecting"
        }
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          {session.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "medium",
            textAlign: "center",
            opacity: 0.5,
            paddingHorizontal: 10,
          }}
        >
          {session.description}
        </Text>
        <Button onPress={startConversation}>Start Conversation</Button>
        <Button onPress={endConversation}>End Conversation</Button>
      </View>
    </>
  );
};

export default SessionScreen;

const styles = StyleSheet.create({});
