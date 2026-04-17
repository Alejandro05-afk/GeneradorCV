import React from 'react';
import {
    DimensionValue,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

interface CardContainerProps {
  /** Content to display inside the card */
  children: React.ReactNode;
  /** Custom container styling */
  style?: ViewStyle;
  /** Padding inside the card */
  padding?: DimensionValue;
  /** Show border or not */
  withBorder?: boolean;
  /** Shadow elevation level */
  elevation?: number;
  /** Accessibility label for the card */
  accessibilityLabel?: string;
}

/**
 * CardContainer Component
 * 
 * EPN-branded card component with white background and subtle styling
 * Perfect for displaying grouped content like education, experience, skills
 * 
 * @example
 * ```tsx
 * <CardContainer padding={16} withBorder>
 *   <Text style={styles.title}>Education</Text>
 *   <Text>Details go here</Text>
 * </CardContainer>
 * ```
 */
export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  style,
  padding = 16,
  withBorder = true,
  elevation = 2,
  accessibilityLabel,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          padding: padding as number,
          elevation: elevation,
        },
        withBorder && styles.cardBorder,
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', // Clean white background
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android elevation
    elevation: 3,
  },
  cardBorder: {
    borderWidth: 1,
    borderColor: '#EEEEEE', // Very light gray border
  },
});
