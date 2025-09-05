import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const COLORS = {
  primary: "#239BA7",
  primaryGrd: "#1E93AB",
  secondary: "#91ADC8",
  background: "#AED6CF",
  backgroundSecondary: "#FAFDD6",
  BackgroundGrd: "#DDF4E7",
  white: "#FFFFFF",
};

export const VISUAL_CONFIG = {
  blur: 9,
  center: {
    x: width / 2,
    y: height / 2,
  },
};
