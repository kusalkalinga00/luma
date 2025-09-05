import {
  ANIMATION_CONFIG,
  COLORS,
  RADIUS_CONFIG,
  VISUAL_CONFIG,
} from "@/constants";
import {
  Blur,
  Canvas,
  RadialGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

type GradientPosition = "top" | "center" | "bottom";

interface GradientProps {
  position: GradientPosition;
  isSpeaking: boolean;
}

const getTargetY = (position: GradientPosition): number => {
  switch (position) {
    case "top":
      return 0;
    case "center":
      return VISUAL_CONFIG.center.y;
    case "bottom":
      return height;
    default:
      return VISUAL_CONFIG.center.y;
  }
};

const calculateRadiusBounds = (baseRadius: number) => {
  "worklet";
  return {
    min: baseRadius * RADIUS_CONFIG.minScale,
    max: baseRadius * RADIUS_CONFIG.maxScale,
  };
};

const calculateTargetRadius = (isSpeaking: boolean, baseRadius: number) => {
  "worklet";
  const { min, max } = calculateRadiusBounds(baseRadius);
  const scale = isSpeaking
    ? RADIUS_CONFIG.speakingScale
    : RADIUS_CONFIG.quietScale;

  return min + (max - min) * scale;
};

export function Gradient({ position, isSpeaking }: GradientProps) {
  const animatedY = useSharedValue(0);
  const radiusScale = useSharedValue(1);
  const baseRadiusValue = useSharedValue(RADIUS_CONFIG.baseRadius.default);
  const mountRadius = useSharedValue(0);
  const center = useDerivedValue(() => {
    return vec(VISUAL_CONFIG.center.x, animatedY.value);
  });

  const animatedRadius = useDerivedValue(() => {
    const { min, max } = calculateRadiusBounds(baseRadiusValue.value);
    const calculatedRadius = min + (max - min) * radiusScale.value;
    return mountRadius.value < calculatedRadius
      ? mountRadius.value
      : calculatedRadius;
  });

  useEffect(() => {
    const targetY = getTargetY(position);
    animatedY.value = withSpring(targetY, ANIMATION_CONFIG.spring);
  }, [position, animatedY]);

  useEffect(() => {
    animatedY.value = getTargetY(position);
  }, []);

  useEffect(() => {
    const targetRadius = calculateTargetRadius(
      isSpeaking,
      RADIUS_CONFIG.baseRadius.default
    );

    mountRadius.value = withTiming(targetRadius, {
      duration: ANIMATION_CONFIG.durations.MOUNT,
    });
  }, []);

  useEffect(() => {
    const duration = ANIMATION_CONFIG.durations.SPEAKING_TRANSITION;

    if (isSpeaking) {
      baseRadiusValue.value = withTiming(RADIUS_CONFIG.baseRadius.speaking);
      animatedY.value = withTiming(getTargetY("center"), { duration });
    } else {
      baseRadiusValue.value = withTiming(RADIUS_CONFIG.baseRadius.default);
      animatedY.value = withTiming(getTargetY(position), { duration });
    }
  }, [isSpeaking, animatedY, baseRadiusValue, position]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Canvas
        style={{
          flex: 1,
        }}
      >
        <Rect x={0} y={0} width={width} height={height}>
          <RadialGradient
            c={center}
            r={animatedRadius}
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
