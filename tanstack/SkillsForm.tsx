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
import { useCVContext } from "../context/CVContext";
import { Skill, SkillLevel } from "../types/cv.types";

const SKILL_LEVELS: SkillLevel[] = ["Básico", "Intermedio", "Avanzado", "Experto"];

const SKILL_CATEGORIES = [
    "Lenguajes de Programación",
    "Frameworks/Librerías",
    "Bases de Datos",
    "Herramientas DevOps",
    "Diseño/UI",
    "Metodologías",
    "Idiomas",
    "Otros",
];

type FormData = Omit<Skill, "id">;

export default function SkillsScreen() {
    const router = useRouter();
    const { cvData, addSkill, deleteSkill } = useCVContext();

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
            name: "",
            level: "Intermedio",
            category: "Lenguajes de Programación",
        },
        onSubmit: ({ value }) => {
            const newSkill: Skill = {
                id: Date.now().toString(),
                ...value,
            };
            addSkill(newSkill);
            form.reset();
            Alert.alert("Éxito", "Habilidad agregada correctamente");
        },
    });

    const handleDelete = (id: string) => {
        Alert.alert("Confirmar", "¿Estás seguro de eliminar esta habilidad?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: () => deleteSkill(id),
            },
        ]);
    };

    const getLevelColor = (level: SkillLevel): string => {
        switch (level) {
            case "Básico":
                return "#4CAF50";
            case "Intermedio":
                return "#2196F3";
            case "Avanzado":
                return "#FF9800";
            case "Experto":
                return "#C8102E";
            default:
                return "#666666";
        }
    };

    const getLevelIndex = (level: SkillLevel): number => {
        return SKILL_LEVELS.indexOf(level);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Habilidades Técnicas</Text>
                <View style={styles.titleAccent} />
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionLabel}>Agregar Nueva Habilidad</Text>

                <form.Field
                    name="name"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value) return "La habilidad es requerida";
                            if (value.length < 2) return "Mínimo 2 caracteres";
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <InputField
                            label="Habilidad"
                            placeholder="Ej: TypeScript, React Native, PostgreSQL"
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
                    name="level"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value) return "El nivel es requerido";
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <>
                            <Text style={styles.fieldLabel}>Nivel</Text>
                            <View style={styles.levelContainer}>
                                {SKILL_LEVELS.map((level) => {
                                    const isSelected = field.state.value === level;
                                    const levelIndex = getLevelIndex(level);
                                    const selectedIndex = getLevelIndex(field.state.value as SkillLevel);
                                    const isActive = levelIndex <= selectedIndex;

                                    return (
                                        <TouchableOpacity
                                            key={level}
                                            style={[
                                                styles.levelButton,
                                                isSelected && styles.levelButtonSelected,
                                                !isSelected && isActive && styles.levelButtonActive,
                                            ]}
                                            onPress={() => field.handleChange(level)}
                                            accessibilityLabel={`Nivel ${level}`}
                                        >
                                            <Text
                                                style={[
                                                    styles.levelButtonText,
                                                    isSelected && styles.levelButtonTextSelected,
                                                    !isSelected && isActive && styles.levelButtonTextActive,
                                                ]}
                                            >
                                                {level}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </>
                    )}
                </form.Field>

                <form.Field
                    name="category"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value) return "La categoría es requerida";
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <>
                            <Text style={styles.fieldLabel}>Categoría</Text>
                            <View style={styles.categoryContainer}>
                                {SKILL_CATEGORIES.map((cat) => {
                                    const isSelected = field.state.value === cat;
                                    return (
                                        <TouchableOpacity
                                            key={cat}
                                            style={[
                                                styles.categoryButton,
                                                isSelected && styles.categoryButtonSelected,
                                            ]}
                                            onPress={() => field.handleChange(cat)}
                                            accessibilityLabel={`Categoría ${cat}`}
                                        >
                                            <Text
                                                style={[
                                                    styles.categoryButtonText,
                                                    isSelected && styles.categoryButtonTextSelected,
                                                ]}
                                                numberOfLines={1}
                                            >
                                                {cat}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </>
                    )}
                </form.Field>

                <NavigationButton
                    tittle="Agregar Habilidad"
                    onPress={form.handleSubmit}
                />

                {cvData.skills.length > 0 && (
                    <>
                        <Text style={styles.listTitle}>Habilidades Agregadas</Text>
                        {cvData.skills.map((skill) => (
                            <View key={skill.id} style={styles.card}>
                                <View style={styles.cardContent}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.cardName}>{skill.name}</Text>
                                        <View
                                            style={[
                                                styles.levelBadge,
                                                { backgroundColor: getLevelColor(skill.level) },
                                            ]}
                                        >
                                            <Text style={styles.levelBadgeText}>{skill.level}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.cardCategory}>{skill.category}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDelete(skill.id)}
                                    accessibilityLabel={`Eliminar ${skill.name}`}
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
    fieldLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#333333",
        marginBottom: 8,
        marginTop: 12,
    },
    levelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        padding: 4,
    },
    levelButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 2,
    },
    levelButtonSelected: {
        backgroundColor: "#C8102E",
    },
    levelButtonActive: {
        backgroundColor: "transparent",
    },
    levelButtonText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#999999",
    },
    levelButtonTextSelected: {
        color: "#FFFFFF",
    },
    levelButtonTextActive: {
        color: "#666666",
    },
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -4,
    },
    categoryButton: {
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 4,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "transparent",
    },
    categoryButtonSelected: {
        backgroundColor: "#C8102E",
        borderColor: "#C8102E",
    },
    categoryButtonText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#666666",
    },
    categoryButtonTextSelected: {
        color: "#FFFFFF",
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
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    cardName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333333",
        marginRight: 8,
    },
    levelBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    levelBadgeText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    cardCategory: {
        fontSize: 12,
        color: "#999999",
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