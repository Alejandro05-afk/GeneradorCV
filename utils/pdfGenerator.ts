import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { CVData } from "../types/cv.types";

const getSkillLevelColor = (level: string): string => {
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

const generateExperienceHTML = (experiences: CVData["experiences"]): string => {
  if (experiences.length === 0) return "";

  return `
    <div class="section">
      <h2 class="section-title">EXPERIENCIA LABORAL</h2>
      ${experiences
        .map(
          (exp) => `
        <div class="item">
          <div class="item-title">${exp.position}</div>
          <div class="item-subtitle">${exp.company}</div>
          <div class="item-date">${exp.startDate} - ${exp.endDate || "Actual"}</div>
          ${exp.description ? `<div class="item-description">${exp.description}</div>` : ""}
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

const generateEducationHTML = (education: CVData["education"]): string => {
  if (education.length === 0) return "";

  return `
    <div class="section">
      <h2 class="section-title">EDUCACIÓN</h2>
      ${education
        .map(
          (edu) => `
        <div class="item">
          <div class="item-title">${edu.degree}</div>
          ${edu.field ? `<div class="item-subtitle">${edu.field}</div>` : ""}
          <div class="item-institution">${edu.institution}</div>
          ${edu.graduationYear ? `<div class="item-date">${edu.graduationYear}</div>` : ""}
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

const generateSkillsHTML = (skills: CVData["skills"]): string => {
  if (skills.length === 0) return "";

  return `
    <div class="section">
      <h2 class="section-title">HABILIDADES TÉCNICAS</h2>
      <div class="skills-container">
        ${skills
          .map(
            (skill) => `
          <div class="skill-item">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-badge" style="background-color: ${getSkillLevelColor(skill.level)}">${skill.level}</span>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};

export const generateCVHTML = (cvData: CVData): string => {
  const { personalInfo, experiences, education, skills } = cvData;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>CV - ${personalInfo.fullName || "Sin nombre"}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          line-height: 1.5;
          color: #333;
          background: #fff;
          padding: 40px;
        }
        .header {
          border-bottom: 2px solid #C8102E;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .name {
          font-size: 28px;
          font-weight: bold;
          color: #C8102E;
          margin-bottom: 8px;
        }
        .contact-info { color: #666; font-size: 12px; }
        .contact-info div { margin-bottom: 2px; }
        .section { margin-bottom: 24px; }
        .section-title {
          font-size: 14px;
          font-weight: bold;
          color: #C8102E;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }
        .summary-text { font-size: 12px; color: #444; text-align: justify; }
        .item {
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #eee;
        }
        .item-title { font-size: 14px; font-weight: bold; color: #333; }
        .item-subtitle { font-size: 12px; color: #666; }
        .item-institution { font-size: 12px; color: #888; }
        .item-date { font-size: 11px; color: #999; font-style: italic; }
        .item-description { font-size: 11px; color: #555; margin-top: 4px; }
        .skills-container { display: flex; flex-wrap: wrap; }
        .skill-item {
          display: flex;
          align-items: center;
          background: #f5f5f5;
          padding: 6px 10px;
          border-radius: 4px;
          margin-right: 8px;
          margin-bottom: 8px;
        }
        .skill-name { font-size: 11px; font-weight: 600; color: #333; margin-right: 6px; }
        .skill-badge {
          font-size: 9px;
          font-weight: bold;
          color: #fff;
          padding: 2px 5px;
          border-radius: 3px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${personalInfo.fullName || "Tu Nombre"}</div>
        <div class="contact-info">
          ${personalInfo.email ? `<div>Email: ${personalInfo.email}</div>` : ""}
          ${personalInfo.phone ? `<div>Teléfono: ${personalInfo.phone}</div>` : ""}
          ${personalInfo.location ? `<div>Ubicación: ${personalInfo.location}</div>` : ""}
        </div>
      </div>
      ${personalInfo.summary ? `
        <div class="section">
          <h2 class="section-title">RESUMEN PROFESIONAL</h2>
          <p class="summary-text">${personalInfo.summary}</p>
        </div>
      ` : ""}
      ${generateExperienceHTML(experiences)}
      ${generateEducationHTML(education)}
      ${generateSkillsHTML(skills)}
    </body>
    </html>
  `;
};

const getFileName = (cvData: CVData): string => {
  const name = cvData.personalInfo.fullName || "CV";
  const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, "_");
  const timestamp = new Date().toISOString().split("T")[0];
  return `CV_${sanitizedName}_${timestamp}.pdf`;
};

// Genera el PDF y retorna el uri temporal
export const generatePDF = async (cvData: CVData): Promise<string> => {
  const html = generateCVHTML(cvData);
  const { uri } = await Print.printToFileAsync({ html, base64: false });
  return uri;
};

// Guarda/comparte el PDF usando el uri directo de printToFileAsync
export const generateAndSavePDF = async (cvData: CVData): Promise<string> => {
  const html = generateCVHTML(cvData);
  const { uri } = await Print.printToFileAsync({ html, base64: false });
  return uri;
};

// Comparte el PDF directamente
export const sharePDF = async (cvData: CVData): Promise<void> => {
  const isAvailable = await Sharing.isAvailableAsync();
  if (!isAvailable) {
    throw new Error("La función de compartir no está disponible en este dispositivo");
  }
  const html = generateCVHTML(cvData);
  const { uri } = await Print.printToFileAsync({ html, base64: false });
  await Sharing.shareAsync(uri, {
    mimeType: "application/pdf",
    dialogTitle: "Compartir CV",
    UTI: "com.adobe.pdf",
  });
};

// Genera y comparte el PDF
export const generateAndSharePDF = async (cvData: CVData): Promise<string> => {
  const html = generateCVHTML(cvData);
  const { uri } = await Print.printToFileAsync({ html, base64: false });
  await Sharing.shareAsync(uri, {
    mimeType: "application/pdf",
    dialogTitle: "Compartir CV",
    UTI: "com.adobe.pdf",
  });
  return uri;
};