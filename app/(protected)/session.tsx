import SessionScreen from "@/components/screens/SessionScreen";
import { ScrollView } from "react-native";

export default function Session() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SessionScreen />
      {/* <Gradient position="top" isSpeaking={true} /> */}
    </ScrollView>
  );
}
