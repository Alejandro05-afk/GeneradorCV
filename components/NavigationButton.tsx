import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface NavigationButtonProps {
    tittle: string;
    onPress: ()=> void;
    variant?: "primary" | "secondary" | "danger";
    style?: ViewStyle;
    disabled?: boolean;
    loading?: boolean;
}

export const NavigationButton = ({ 
    tittle, 
    onPress, 
    variant = "primary", 
    style,
    disabled = false,
    loading = false,
}: NavigationButtonProps) => {
        return (
            <TouchableOpacity
                style={[
                    styles.button, 
                    styles[variant], 
                    style,
                    (disabled || loading) && styles.disabled,
                ]}
                onPress={(disabled || loading) ? undefined : onPress}
                activeOpacity={0.8}
                disabled={disabled || loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color={variant === "secondary" ? "#C8102E" : "#FFFFFF"} />
                ) : (
                    <Text
                        style={[
                            styles.text,
                            variant === "secondary" && styles.textSecondary,
                            variant === "danger" && styles.textDanger,
                        ]}
                    >
                        {tittle}
                    </Text>
                )}
            </TouchableOpacity>
        );
    };

    const styles = StyleSheet.create({
        button: {
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 8,
            minHeight: 48,
        },
        primary: {
            backgroundColor: "#C8102E",
        },
        secondary:{
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: "#C8102E",
        },
        danger:{
            backgroundColor: "#D32F2F",
        },
        disabled: {
            opacity: 0.6,
        },
        text:{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "600",
            letterSpacing: 0.5,
        },
        textSecondary:{
            color: "#C8102E",
        },
        textDanger:{
            color: "#FFFFFF",
        },
    });