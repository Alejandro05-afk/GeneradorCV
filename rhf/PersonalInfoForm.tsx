import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { PersonalInfo } from "../types/cv.types";

type FormData = PersonalInfo;

export default function PersonalInfoFormRHF() {
    const router = useRouter();
    const { cvData, updatePersonalInfo } = useCVContext();

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: cvData.personalInfo,
    });

    useEffect(() => {
        reset(cvData.personalInfo);
    }, [cvData.personalInfo, reset]);

    useEffect(() => {
        Object.entries(cvData.personalInfo).forEach(([key, value]) => {
            setValue(key as keyof FormData, value);
        });
    }, [cvData.personalInfo, setValue]);

    const onSubmit = (data: FormData) => {
        updatePersonalInfo(data);
        Alert.alert("Guardado", "Información personal actualizada correctamente.", [
            {
                text: "OK",
                onPress: () => router.back(),
            },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Información Personal</Text>
                <View style={styles.titleAccent} />
            </View>

            <View style={styles.content}>
                <Controller
                    control={control}
                    name="fullName"
                    rules={{
                        required: "El nombre completo es requerido",
                        minLength: {
                            value: 3,
                            message: "Mínimo 3 caracteres",
                        },
                        validate: (value) => {
                            if (!value) return true;
                            const textRegex = /^[^0-9]+$/;
                            return textRegex.test(value) || "No se permiten números en este campo";
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            label="Nombre Completo"
                            placeholder="Ej: Juan Pérez"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={!!errors.fullName}
                            errorMessage={errors.fullName?.message}
                            required
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: "El correo electrónico es requerido",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingresa un correo electrónico válido",
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            label="Email"
                            placeholder="Ej: juan.perez@example.com"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={!!errors.email}
                            errorMessage={errors.email?.message}
                            required
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="phone"
                    rules={{
                        validate: (value) => {
                            if (!value) return true;
                            const digitsOnly = value.replace(/\D/g, "");
                            if (digitsOnly.length !== 10) {
                                return "Debe tener exactamente 10 dígitos";
                            }
                            return true;
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            label="Teléfono"
                            placeholder="Ej: +593 99 123 4567"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            keyboardType="phone-pad"
                            error={!!errors.phone}
                            errorMessage={errors.phone?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="location"
                    rules={{
                        validate: (value) => {
                            if (!value) return true;
                            const textRegex = /^[^0-9]+$/;
                            return textRegex.test(value) || "No se permiten números en este campo";
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            label="Ubicación"
                            placeholder="Ej: Quito, Ecuador"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={!!errors.location}
                            errorMessage={errors.location?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="summary"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            label="Resumen Profesional"
                            placeholder="Una breve descripción de tu perfil profesional"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            multiline
                            numberOfLines={4}
                            style={{ height: 100, textAlignVertical: "top" }}
                        />
                    )}
                />

                <View style={styles.buttonGroup}>
                    <NavigationButton
                        tittle="Guardar Cambios"
                        onPress={handleSubmit(onSubmit)}
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