import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCVContext } from "../context/CVContext";

export default function HomeScreen() {
  const router = useRouter();
  const { cvData } = useCVContext();

  console.log("CV Data cargado:", cvData);

  const isPersonalInfoComplete =
    cvData.personalInfo.fullName && cvData.personalInfo.email;
  const hasExperience = cvData.experiences.length > 0;
  const hasEducation = cvData.education.length > 0;

  return (
    <ScrollView style={styles.container} scrollEnabled={true}>
      <View style={styles.header}>
        <Text style={styles.title}>Crea tu CV Profesional</Text>
        <View style={styles.titleAccent} />
      </View>

      {/* Personal Info Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionNumber}>1</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
            <Text style={[styles.status, isPersonalInfoComplete && styles.statusComplete]}>
              {isPersonalInfoComplete ? "✓ Completado" : "Pendiente"}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/personal-info")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionNumber}>2</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
            <Text style={[styles.status, hasExperience && styles.statusComplete]}>
              {hasExperience ? `✓ ${cvData.experiences.length} agregada(s)` : "Pendiente"}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/experience")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionNumber}>3</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Educación</Text>
            <Text style={[styles.status, hasEducation && styles.statusComplete]}>
              {hasEducation ? `✓ ${cvData.education.length} agregada(s)` : "Pendiente"}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/education")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Preview CTA */}
      <View style={styles.previewSection}>
        <TouchableOpacity
          style={styles.previewButton}
          onPress={() => router.push("/preview")}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, styles.previewButtonText]}>
            Ver Vista Previa del CV
          </Text>
        </TouchableOpacity>
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
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  sectionNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: "#C8102E",
    marginRight: 12,
    marginTop: -4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  status: {
    fontSize: 13,
    color: "#999999",
    fontWeight: "500",
  },
  statusComplete: {
    color: "#C8102E",
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    backgroundColor: "#C8102E",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  previewSection: {
    marginHorizontal: 20,
    marginBottom: 32,
    marginTop: 16,
  },
  previewButton: {
    backgroundColor: "#333333",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  previewButtonText: {
    fontWeight: "700",
  },
});


