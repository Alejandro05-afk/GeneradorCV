import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { PersonalInfo } from "../types/cv.types";

type FormData = PersonalInfo;

export default function PersonalInfoScreen() {
    const router = useRouter();
    const { cvData, updatePersonalInfo } = useCVContext();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<FormData>({
        defaultValues: cvData.personalInfo,
        mode: "onChange",
    });

    useEffect(() => {
        reset(cvData.personalInfo);
    }, [cvData.personalInfo, reset]);

    const onSubmit = (data: FormData) => {
        updatePersonalInfo(data);
        Alert.alert("Guardado", "Información personal actualizada correctamente.",[
            {
                text: "OK",
                onPress: () => router.back(),
            },
        ]);
    };

    const validateEmail = (value: string) => {
        if (!value) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || "Ingresa un correo electrónico válido";
    };

    const validatePhone = (value: string) => {
        if (!value) return true;
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length !== 10) {
            return "Debe tener exactamente 10 dígitos";
        }
        return true;
    };

    const validateTextOnly = (value: string) => {
        if (!value) return true;
        const textRegex = /^[^0-9]+$/;
        return textRegex.test(value) || "No se permiten números en este campo";
    };

    return(
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
                        required: { value: true, message: "El nombre completo es requerido" },
                        minLength: { value: 3, message: "Mínimo 3 caracteres" },
                        validate: validateTextOnly,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            label="Nombre Completo"
                            placeholder="Ej: Juan Pérez"
                            value={value || ""}
                            onChangeText={onChange}
                            onBlur={onBlur}
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
                        required: { value: true, message: "El correo electrónico es requerido" },
                        validate: validateEmail,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            label="Email"
                            placeholder="Ej: juan.perez@example.com"
                            value={value || ""}
                            onChangeText={onChange}
                            onBlur={onBlur}
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
                    rules={{ validate: validatePhone }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            label="Teléfono"
                            placeholder="Ej: +593 99 123 4567"
                            value={value || ""}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            keyboardType="phone-pad"
                            error={!!errors.phone}
                            errorMessage={errors.phone?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="location"
                    rules={{ validate: validateTextOnly }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            label="Ubicación"
                            placeholder="Ej: Quito, Ecuador"
                            value={value || ""}
                            onChangeText={onChange}
                            onBlur={onBlur}
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
                            value={value || ""}
                            onChangeText={onChange}
                            onBlur={onBlur}
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
                        disabled={!isDirty}
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
    container:{
        flex:1,
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
    content:{
        padding: 20,
        paddingBottom: 32,
    },
    buttonGroup: {
        marginTop: 8,
        gap: 8,
    }
});