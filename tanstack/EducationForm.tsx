import { useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useForm } from "@tanstack/react-form";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { YearPickerInput } from "../components/YearPickerInput";
import { useCVContext } from "../context/CVContext";
import { Education } from "../types/cv.types";

type FormData = Omit<Education, "id">;

const validateTextOnly = (value: string) => {
    if (!value) return true;
    const textRegex = /^[^0-9]+$/;
    return textRegex.test(value) || "No se permiten números en este campo";
};

const validateYear = (value: string) => {
    if (!value) return true;
    const year = parseInt(value, 10);
    if (isNaN(year)) return "Ingresa un año válido";
    if (year < 1900 || year > new Date().getFullYear() + 10) {
        return `Ingresa un año entre 1900 y ${new Date().getFullYear() + 10}`;
    }
    return true;
};

export default function EducationScreen() {
    const router = useRouter();
    const { cvData, addEducation, deleteEducation } = useCVContext();

    const form = useForm<
        FormData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
    >({
        defaultValues: {
            institution: "",
            degree: "",
            field: "",
            graduationYear: "",
        },
        onSubmit: ({ value }) => {
            const newEducation: Education = {
                id: Date.now().toString(),
                ...value,
            };
            addEducation(newEducation);
            form.reset();
            Alert.alert("Éxito", "Educación agregada correctamente");
        },
    });

    const handleDelete = (id: string) => {
        Alert.alert("Confirmar", "¿Estás seguro de eliminar esta educación?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: () => deleteEducation(id),
            },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Educación</Text>
                <View style={styles.titleAccent} />
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionLabel}>Agregar Nueva Educación</Text>

                <form.Field
                    name="institution"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value) return "La institución es requerida";
                            if (value.length < 2) return "Mínimo 2 caracteres";
                            return validateTextOnly(value) as string | undefined;
                        },
                    }}
                >
                    {(field) => (
                        <InputField
                            label="Institución"
                            placeholder="Nombre de la universidad/institución"
                            value={field.state.value || ""}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            error={!!field.state.meta.errors.length}
                            errorMessage={field.state.meta.errors[0]}
                            required
                        />
                    )}
                </form.Field>

                <form.Field
                    name="degree"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value) return "El título/grado es requerido";
                            if (value.length < 2) return "Mínimo 2 caracteres";
                            return validateTextOnly(value) as string | undefined;
                        },
                    }}
                >
                    {(field) => (
                        <InputField
                            label="Título/Grado"
                            placeholder="Ej: Licenciatura, Maestría"
                            value={field.state.value || ""}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            error={!!field.state.meta.errors.length}
                            errorMessage={field.state.meta.errors[0]}
                            required
                        />
                    )}
                </form.Field>

                <form.Field
                    name="field"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value) return undefined;
                            return validateTextOnly(value) as string | undefined;
                        },
                    }}
                >
                    {(field) => (
                        <InputField
                            label="Área de Estudio"
                            placeholder="Ej: Ingeniería en Sistemas"
                            value={field.state.value || ""}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            error={!!field.state.meta.errors.length}
                            errorMessage={field.state.meta.errors[0]}
                        />
                    )}
                </form.Field>

                <form.Field
                    name="graduationYear"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value) return undefined;
                            return validateYear(value) as string | undefined;
                        },
                    }}
                >
                    {(field) => (
                        <YearPickerInput
                            label="Año de Graduación"
                            value={field.state.value || ""}
                            onChange={field.handleChange}
                            placeholder="Seleccionar año"
                            minYear={1950}
                            maxYear={new Date().getFullYear() + 10}
                            error={!!field.state.meta.errors.length}
                            errorMessage={field.state.meta.errors[0]}
                        />
                    )}
                </form.Field>

                <NavigationButton
                    tittle="Agregar Educación"
                    onPress={form.handleSubmit}
                />

                {cvData.education.length > 0 && (
                    <>
                        <Text style={styles.listTitle}>Educación Agregada</Text>
                        {cvData.education.map((edu) => (
                            <View key={edu.id} style={styles.card}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardDegree}>{edu.degree}</Text>
                                    {edu.field && <Text style={styles.cardField}>{edu.field}</Text>}
                                    <Text style={styles.cardInstitution}>{edu.institution}</Text>
                                    <Text style={styles.cardYear}>{edu.graduationYear}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDelete(edu.id)}
                                    accessibilityLabel={`Eliminar ${edu.degree}`}
                                >
                                    <Text style={styles.deleteButtonText}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </>
                )}

                <NavigationButton
                    tittle="Volver al Inicio"
                    onPress={() => router.back()}
                    variant="secondary"
                    style={{ marginTop: 16 }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#333333",
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    titleAccent: {
        width: 48,
        height: 4,
        backgroundColor: "#C8102E",
        borderRadius: 2,
    },
    content: {
        padding: 20,
        paddingBottom: 32,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#666666",
        marginBottom: 16,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333333",
        marginTop: 28,
        marginBottom: 16,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "flex-start",
        borderWidth: 1,
        borderColor: "#EEEEEE",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardContent: {
        flex: 1,
    },
    cardDegree: {
        fontSize: 16,
        fontWeight: "700",
        color: "#C8102E",
        marginBottom: 4,
    },
    cardField: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333333",
        marginBottom: 4,
    },
    cardInstitution: {
        fontSize: 13,
        color: "#666666",
        marginBottom: 4,
        fontWeight: "500",
    },
    cardYear: {
        fontSize: 12,
        color: "#999999",
        fontStyle: "italic",
    },
    deleteButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#D32F2F",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 12,
        marginTop: 2,
    },
    deleteButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 24,
    },
});