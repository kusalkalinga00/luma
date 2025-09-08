import { COLORS } from "@/constants";
import { useState } from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

export default function Button({ children, ...props }: PressableProps) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      style={[styles.button, isPressed && styles.buttonPressed]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      {...props}
    >
      {typeof children === "string" ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.buttonPrimary,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 200,
  },
  text: {
    color: "white",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
