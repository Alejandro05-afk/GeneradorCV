import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface InputFieldProps {
    label: string;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    multiline?: boolean;
    numberOfLines?: number;
    style?: object;
}

export const InputField = ({ label, error, errorMessage, required = false, ...props}: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
                {required && <Text style={styles.requiredAsterisk}>*</Text>}
            </Text>
            <TextInput
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    error && styles.inputError
                ]}
                placeholderTextColor="#999999"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label:{
        fontSize: 14,
        fontWeight: "600",
        color: "#333333",
        marginBottom: 8,
    },
    requiredAsterisk: {
        color: "#C8102E",
        fontWeight: "bold",
        marginLeft: 2,
    },
    input:{
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#FFFFFF",
        color: "#333333",
        minHeight: 48,
    },
    inputFocused:{
        borderWidth: 2,
        borderColor: "#C8102E",
    },
    inputError:{
        borderColor: "#D32F2F",
    },
    errorText:{
        color: "#D32F2F",
        fontSize:12,
        marginTop: 4,
        fontWeight: "500",
    },
});