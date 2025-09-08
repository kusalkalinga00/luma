import { sessions } from "@/utils/sessions";
import { useSession } from "@clerk/clerk-expo";
import { useConversation } from "@elevenlabs/react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../common/Button";
import { Gradient } from "../common/gradient";

const SessionScreen = () => {
  const user = useSession();
  const { sessionId } = useLocalSearchParams();
  const session = sessions.find((s) => s.id === sessionId) ?? sessions[0];

  const [isStarting, setIsStarting] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const conversation = useConversation({
    onConnect: ({ conversationId }) => {
      setConversationId(conversationId);
    },
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
    if (isStarting) return;

    try {
      setIsStarting(true);
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
    } finally {
      setIsStarting(false);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.log("Failed to end conversation:", error);
    }
  };

  const canStart = conversation.status === "disconnected" && !isStarting;
  const canEnd = conversation.status === "connected";

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
        <Button
          onPress={canStart ? startConversation : endConversation}
          disabled={!canStart && !canEnd}
        >
          {canStart ? "Start Conversation" : "End Conversation"}
        </Button>
      </View>
    </>
  );
};

export default SessionScreen;

const styles = StyleSheet.create({});
