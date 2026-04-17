import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface YearPickerInputProps {
    label: string;
    value?: string;
    onChange: (year: string) => void;
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
    minYear?: number;
    maxYear?: number;
}

export const YearPickerInput = ({
    label,
    value,
    onChange,
    placeholder = "Seleccionar año",
    error,
    errorMessage,
    minYear = 1950,
    maxYear = new Date().getFullYear() + 10,
}: YearPickerInputProps) => {
    const [showPicker, setShowPicker] = useState(false);
    const [tempDate, setTempDate] = useState<Date>(
        value ? new Date(`${value}-01-01`) : new Date()
    );

    const handleChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === "android") {
            setShowPicker(false);
        }
        if (selectedDate) {
            setTempDate(selectedDate);
            onChange(selectedDate.getFullYear().toString());
        }
    };

    const handleConfirm = () => {
        onChange(tempDate.getFullYear().toString());
        setShowPicker(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={[styles.input, error && styles.inputError]}
                onPress={() => setShowPicker(true)}
            >
                <Text style={[styles.inputText, !value && styles.placeholder]}>
                    {value || placeholder}
                </Text>
            </TouchableOpacity>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
            
            {showPicker && Platform.OS === "ios" && (
                <Modal
                    transparent
                    animationType="slide"
                    visible={showPicker}
                    onRequestClose={() => setShowPicker(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={() => setShowPicker(false)}>
                                    <Text style={styles.cancelText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleConfirm}>
                                    <Text style={styles.doneText}>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                value={tempDate}
                                mode="date"
                                display="spinner"
                                onChange={handleChange}
                                minimumDate={new Date(`${minYear}-01-01`)}
                                maximumDate={new Date(`${maxYear}-12-31`)}
                                textColor="#000000"
                                style={styles.picker}
                            />
                        </View>
                    </View>
                </Modal>
            )}
            
            {showPicker && Platform.OS === "android" && (
                <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                    minimumDate={new Date(`${minYear}-01-01`)}
                    maximumDate={new Date(`${maxYear}-12-31`)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    inputError: {
        borderColor: "#e74c3c",
    },
    inputText: {
        fontSize: 16,
        color: "#333",
    },
    placeholder: {
        color: "#999",
    },
    errorText: {
        color: "#e74c3c",
        fontSize: 12,
        marginTop: 4,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    cancelText: {
        fontSize: 16,
        color: "#666",
    },
    doneText: {
        fontSize: 16,
        color: "#3498db",
        fontWeight: "600",
    },
    picker: {
        height: 200,
    },
});