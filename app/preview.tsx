import React, { useState } from "react";
import {
    Alert,
    ActivityIndicator,
    Button,
    StyleSheet,
    View,
} from "react-native";
import { useCVContext } from "@/context/CVContext";
import { CVPreview } from "@/components/CVPreview";
import { generateAndSharePDF, generateAndSavePDF } from "@/utils/pdfGenerator";

export default function PreviewScreen() {
    const { cvData } = useCVContext();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSharePDF = async () => {
        try {
            setIsGenerating(true);
            await generateAndSharePDF(cvData);
        } catch (error) {
            Alert.alert("Error", "No se pudo generar el PDF");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSavePDF = async () => {
        try {
            setIsGenerating(true);
            const uri = await generateAndSavePDF(cvData);
            const fileName = uri.split("/").pop() || "CV.pdf";
            Alert.alert(
                "PDF Guardado",
                `Tu CV se ha guardado como:\n${fileName}\n\nPuedes encontrarlo en la carpeta de la app.`,
                [{ text: "OK" }]
            );
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el PDF");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <View style={styles.container}>
            <CVPreview cvData={cvData} />
            <View style={styles.buttonContainer}>
                <Button
                    title={isGenerating ? "Generando..." : "Compartir PDF"}
                    onPress={handleSharePDF}
                    disabled={isGenerating}
                    color="#C8102E"
                />
                {isGenerating && <ActivityIndicator style={styles.loader} />}
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Guardar en Dispositivo"
                    onPress={handleSavePDF}
                    disabled={isGenerating}
                    color="#333333"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    loader: {
        marginTop: 10,
    },
});