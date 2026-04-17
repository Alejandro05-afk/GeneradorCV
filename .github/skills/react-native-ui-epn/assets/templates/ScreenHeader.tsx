import React from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

interface ScreenHeaderProps {
  /** Main title of the screen */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Show accent line under title */
  withAccent?: boolean;
  /** Custom container styling */
  style?: ViewStyle;
  /** Custom title styling */
  titleStyle?: TextStyle;
  /** Custom subtitle styling */
  subtitleStyle?: TextStyle;
}

/**
 * ScreenHeader Component
 * 
 * EPN-branded screen header with visual hierarchy
 * Uses Rojo Institucional for title accent line
 * Perfect for screen titles in the CV app
 * 
 * @example
 * ```tsx
 * <ScreenHeader
 *   title="Work Experience"
 *   subtitle="Your professional background"
 *   withAccent
 * />
 * ```
 */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  withAccent = true,
  style,
  titleStyle,
  subtitleStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {withAccent && <View style={styles.accent} />}
      </View>

      {subtitle && (
        <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333', // Gris Oscuro
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  accent: {
    width: 48, // Red line under title
    height: 4,
    backgroundColor: '#C8102E', // Rojo Institucional
    borderRadius: 2,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 12,
    fontWeight: '400',
    lineHeight: 24,
  },
});
