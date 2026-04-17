import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { DatePickerInput } from "../components/DatePickerInput";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Experience } from "../types/cv.types";

type FormData = Omit<Experience, "id">;

export default function ExperienceScreen() {
  const router = useRouter();
  const { cvData, addExperience, deleteExperience } = useCVContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      ...data,
    };

    addExperience(newExperience);

    reset({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    Alert.alert("Éxito", "Experiencia agregada correctamente");
  };

  const validateTextOnly = (value: string) => {
    if (!value) return true;
    const textRegex = /^[^0-9]+$/;
    return textRegex.test(value) || "No se permiten números en este campo";
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta experiencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteExperience(id),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Experiencia Laboral</Text>
        <View style={styles.titleAccent} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionLabel}>Agregar Nueva Experiencia</Text>

        <Controller
          control={control}
          name="company"
          rules={{
            required: { value: true, message: "La empresa es requerida" },
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
            validate: validateTextOnly,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="Empresa"
              placeholder="Nombre de la empresa"
              value={value || ""}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.company}
              errorMessage={errors.company?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="position"
          rules={{
            required: { value: true, message: "El cargo es requerido" },
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
            validate: validateTextOnly,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="Cargo/Posición"
              placeholder="Tu posición en la empresa"
              value={value || ""}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.position}
              errorMessage={errors.position?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="startDate"
          rules={{
            required: { value: true, message: "La fecha de inicio es requerida" },
          }}
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              label="Fecha de Inicio"
              value={value || ""}
              onChange={onChange}
              placeholder="Seleccionar fecha de inicio"
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="endDate"
          rules={{}}
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              label="Fecha de Fin"
              value={value || ""}
              onChange={onChange}
              placeholder="Seleccionar fecha de fin (dejar vacío si actual)"
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{}}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="Descripción"
              placeholder="Describe tus responsabilidades y logros principales..."
              value={value || ""}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: "top" }}
            />
          )}
        />

        <NavigationButton
          tittle="Agregar Experiencia"
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty}
        />

        {cvData.experiences.length > 0 && (
          <>
            <Text style={styles.listTitle}>Experiencias Agregadas</Text>
            {cvData.experiences.map((exp) => (
              <View key={exp.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardPosition}>{exp.position}</Text>
                  <Text style={styles.cardCompany}>{exp.company}</Text>
                  <Text style={styles.cardDate}>
                    {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : "— Actual"}
                  </Text>
                  {exp.description && (
                    <Text style={styles.cardDescription} numberOfLines={2}>
                      {exp.description}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(exp.id)}
                  accessibilityLabel={`Eliminar ${exp.position}`}
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
  cardPosition: {
    fontSize: 16,
    fontWeight: "700",
    color: "#C8102E",
    marginBottom: 4,
  },
  cardCompany: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: "#999999",
    fontStyle: "italic",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 12,
    color: "#666666",
    lineHeight: 18,
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