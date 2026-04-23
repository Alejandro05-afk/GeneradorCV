import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useForm } from "@tanstack/react-form";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { PersonalInfo } from "../types/cv.types";

type FormData = PersonalInfo;

export default function PersonalInfoScreen() {
    const router = useRouter();
    const { cvData, updatePersonalInfo } = useCVContext();

    useEffect(() => {
        form.reset();
    }, [cvData.personalInfo]);

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
        defaultValues: cvData.personalInfo,
        onSubmit: ({ value }) => {
            updatePersonalInfo(value);
            Alert.alert("Guardado", "Información personal actualizada correctamente.", [
                {
                    text: "OK",
                    onPress: () => router.back(),
                },
            ]);
        },
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Información Personal</Text>
                <View style={styles.titleAccent} />
            </View>

            <View style={styles.content}>
                <form.Field
                    name="fullName"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value) return "El nombre completo es requerido";
                            if (value.length < 3) return "Mínimo 3 caracteres";
                            const textRegex = /^[^0-9]+$/;
                            return textRegex.test(value) ? undefined : "No se permiten números en este campo";
                        },
                    }}
                >
                    {(field) => (
                        <InputField
                            label="Nombre Completo"
                            placeholder="Ej: Juan Pérez"
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
                    name="email"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value) return "El correo electrónico es requerido";
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            return emailRegex.test(value) ? undefined : "Ingresa un correo electrónico válido";
                        },
                    }}
                >
                    {(field) => (
                        <InputField
                            label="Email"
                            placeholder="Ej: juan.perez@example.com"
                            value={field.state.value || ""}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={!!field.state.meta.errors.length}
                            errorMessage={field.state.meta.errors[0]}
                            required
                        />
                    )}
                </form.Field>

                <form.Field
                    name="phone"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value) return undefined;
                            const digitsOnly = value.replace(/\D/g, "");
                            if (digitsOnly.length !== 10) {
                                return "Debe tener exactamente 10 dígitos";
                            }
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <InputField
                            label="Teléfono"
                            placeholder="Ej: +593 99 123 4567"
                            value={field.state.value || ""}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            keyboardType="phone-pad"
                            error={!!field.state.meta.errors.length}
                            errorMessage={field.state.meta.errors[0]}
                        />
                    )}
                </form.Field>

                <form.Field
                    name="location"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value) return undefined;
                            const textRegex = /^[^0-9]+$/;
                            return textRegex.test(value) ? undefined : "No se permiten números en este campo";
                        },
                    }}
                >
                    {(field) => (
                        <InputField
                            label="Ubicación"
                            placeholder="Ej: Quito, Ecuador"
                            value={field.state.value || ""}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            error={!!field.state.meta.errors.length}
                            errorMessage={field.state.meta.errors[0]}
                        />
                    )}
                </form.Field>

                <form.Field name="summary">
                    {(field) => (
                        <InputField
                            label="Resumen Profesional"
                            placeholder="Una breve descripción de tu perfil profesional"
                            value={field.state.value || ""}
                            onChangeText={field.handleChange}
                            onBlur={field.handleBlur}
                            multiline
                            numberOfLines={4}
                            style={{ height: 100, textAlignVertical: "top" }}
                        />
                    )}
                </form.Field>

                <View style={styles.buttonGroup}>
                    <NavigationButton
                        tittle="Guardar Cambios"
                        onPress={form.handleSubmit}
                    />

                    <NavigationButton
                        tittle="Cancelar"
                        onPress={() => router.back()}
                        variant="secondary"
                    />
                </View>
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
    buttonGroup: {
        marginTop: 8,
        gap: 8,
    },
});