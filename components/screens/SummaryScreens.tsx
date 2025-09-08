import { ConversationResponse } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Gradient } from "../common/gradient";

export default function SummaryScreens() {
  const { conversationId } = useLocalSearchParams();
  const [conversation, setConversation] = useState<ConversationResponse>();

  useEffect(() => {
    getSummary();
  }, []);

  const getSummary = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/conversations?conversationId=${conversationId}`
    );

    const data: { conversation: ConversationResponse } = await response.json();
    setConversation(data.conversation);
  };

  return (
    <>
      <Gradient position="bottom" isSpeaking={false} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      >
        <Text>{conversation?.agent_id}</Text>
      </ScrollView>
    </>
  );
}
