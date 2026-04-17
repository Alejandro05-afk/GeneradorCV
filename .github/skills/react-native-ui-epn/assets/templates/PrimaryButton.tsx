import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

interface PrimaryButtonProps {
  /** Button label text */
  label: string;
  /** Callback when button is pressed */
  onPress: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Show loading indicator */
  loading?: boolean;
  /** Custom styling for the button container */
  style?: ViewStyle;
  /** Custom styling for the text */
  textStyle?: TextStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * PrimaryButton Component
 * 
 * EPN-branded primary action button using Rojo Institucional (#C8102E)
 * Used for main CTAs like "Save", "Submit", "Continue"
 * 
 * @example
 * ```tsx
 * <PrimaryButton
 *   label="Save Changes"
 *   onPress={handleSave}
 *   loading={isSaving}
 * />
 * ```
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        (disabled || loading) && styles.buttonDisabled,
        style,
      ]}
      activeOpacity={0.8}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#C8102E', // Rojo Institucional EPN
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48, // Touch target minimum
  },
  buttonDisabled: {
    backgroundColor: '#999999',
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
