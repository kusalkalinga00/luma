import { COLORS, VISUAL_CONFIG } from "@/constants";
import {
  Blur,
  Canvas,
  RadialGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import { Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("screen");

export function Gradient() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Canvas
        style={{
          flex: 1,
        }}
      >
        <Rect x={0} y={0} width={width} height={height}>
          <RadialGradient
            c={vec(128, 128)}
            r={128}
            colors={[
              COLORS.primaryGrd,
              COLORS.primary,
              COLORS.BackgroundGrd,
              COLORS.white,
            ]}
          />
          <Blur blur={VISUAL_CONFIG.blur} mode={"clamp"} />
        </Rect>
      </Canvas>
    </View>
  );
}
