import { ImageSourcePropType } from "react-native";

interface Session {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType | undefined;
}

export const sessions: Session[] = [
  {
    id: "1",
    title: "Morning Mindfulness",
    description:
      "Start your day with a short mindfulness meditation to set a positive tone.",
    image: require("@/assets/sessions/1.jpg"),
  },
  {
    id: "2",
    title: "Breathing Awareness",
    description: "Focus on your breath to calm your mind and reduce stress.",
    image: require("@/assets/sessions/2.jpg"),
  },
  {
    id: "3",
    title: "Body Scan",
    description:
      "A guided session to bring awareness to different parts of your body.",
    image: require("@/assets/sessions/3.jpg"),
  },
  {
    id: "4",
    title: "Gratitude Practice",
    description: "Reflect on things you are grateful for to boost your mood.",
    image: require("@/assets/sessions/4.jpg"),
  },
  {
    id: "5",
    title: "Evening Reflection",
    description: "Wind down your day with a mindful reflection and relaxation.",
    image: require("@/assets/sessions/5.jpg"),
  },
];
