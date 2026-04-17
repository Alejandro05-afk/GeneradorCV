import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from 'react-native';

interface FormInputProps extends TextInputProps {
  /** Input label shown above the field */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message if validation fails */
  error?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Whether field is required */
  required?: boolean;
  /** Container styling */
  containerStyle?: ViewStyle;
  /** Make input multiline */
  multiline?: boolean;
  /** Number of lines for multiline input */
  numberOfLines?: number;
}

/**
 * FormInput Component
 * 
 * EPN-branded text input with focus state highlighting using Rojo Institucional
 * Includes label, error, and helper text support
 * 
 * @example
 * ```tsx
 * <FormInput
 *   label="Full Name"
 *   placeholder="Enter your name"
 *   value={name}
 *   onChangeText={setName}
 *   required
 * />
 * ```
 */
export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  error,
  helperText,
  required = false,
  containerStyle,
  multiline = false,
  numberOfLines = 1,
  value,
  onChangeText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.requiredAsterisk}>*</Text>}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          multiline && styles.inputMultiline,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={!props.editable === false}
        accessibilityLabel={label || placeholder}
        {...props}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333', // Gris Oscuro
    marginBottom: 8,
  },
  requiredAsterisk: {
    color: '#C8102E', // Rojo Institucional
    fontWeight: 'bold',
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FFFFFF',
    minHeight: 48, // Touch target minimum
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: '#C8102E', // Rojo Institucional on focus
  },
  inputError: {
    borderColor: '#D32F2F', // Error red
  },
  inputMultiline: {
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 12,
    color: '#D32F2F',
    marginTop: 4,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
});
