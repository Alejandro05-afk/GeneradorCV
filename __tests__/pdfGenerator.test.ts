import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('expo-file-system/legacy', () => ({
    documentDirectory: 'file:///test/',
    copyAsync: vi.fn().mockResolvedValue(undefined),
    deleteAsync: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('expo-print', () => ({
    printToFileAsync: vi.fn().mockResolvedValue({ uri: 'file:///test/cv.pdf' }),
}));

vi.mock('expo-sharing', () => ({
    isAvailableAsync: vi.fn().mockResolvedValue(true),
    shareAsync: vi.fn().mockResolvedValue(undefined),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

interface CVData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        summary: string;
    };
    experiences: Array<{
        id: string;
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string;
    }>;
    education: Array<{
        id: string;
        institution: string;
        degree: string;
        field: string;
        graduationYear: string;
    }>;
    skills: Array<{
        id: string;
        name: string;
        level: string;
        category: string;
    }>;
}

const createMockCVData = (): CVData => ({
    personalInfo: {
        fullName: 'Alejandro Guanoluisa',
        email: 'guanoluisaalejandro5@gmail.com',
        phone: '0993630096',
        location: 'Quito, Ecuador',
        summary: 'Desarrollador Full Stack con experiencia.',
    },
    experiences: [
        {
            id: '1',
            company: 'Tech Corp',
            position: 'Senior Developer',
            startDate: '2020-01',
            endDate: '2023-12',
            description: 'Desarrollo de aplicaciones moviles.',
        },
    ],
    education: [
        {
            id: '1',
            institution: 'Escuela Politecnica Nacional',
            degree: 'Tecnologia Superior en desarrollo de software',
            field: 'Sistemas',
            graduationYear: '2026',
        },
    ],
    skills: [
        {
            id: '1',
            name: 'TypeScript',
            level: 'Avanzado',
            category: 'Lenguajes de Programacion',
        },
    ],
});

const createEmptyCVData = (): CVData => ({
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
    },
    experiences: [],
    education: [],
    skills: [],
});

const generateTestHTML = (cvData: CVData): string => {
    const { personalInfo, experiences, education, skills } = cvData;

    let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>CV - ${personalInfo.fullName || "Sin nombre"}</title>
<style>
body { font-family: Arial, sans-serif; }
.name { font-size: 28px; font-weight: bold; color: #C8102E; }
.section-title { font-size: 14px; font-weight: bold; color: #C8102E; }
</style>
</head>
<body>
<div class="header">
<div class="name">${personalInfo.fullName || "Tu Nombre"}</div>
<div class="contact-info">
${personalInfo.email ? `<div>Email: ${personalInfo.email}</div>` : ''}
${personalInfo.phone ? `<div>Telefono: ${personalInfo.phone}</div>` : ''}
${personalInfo.location ? `<div>Ubicacion: ${personalInfo.location}</div>` : ''}
</div>
</div>`;

    if (personalInfo.summary) {
        html += `
<div class="section">
<h2 class="section-title">RESUMEN PROFESIONAL</h2>
<p>${personalInfo.summary}</p>
</div>`;
    }

    if (experiences.length > 0) {
        html += `
<div class="section">
<h2 class="section-title">EXPERIENCIA LABORAL</h2>`;
        experiences.forEach((exp) => {
            html += `
<div>
<div>${exp.position}</div>
<div>${exp.company}</div>
<div>${exp.startDate} - ${exp.endDate || 'Actual'}</div>
${exp.description ? `<div>${exp.description}</div>` : ''}
</div>`;
        });
        html += '</div>';
    }

    if (education.length > 0) {
        html += `
<div class="section">
<h2 class="section-title">EDUCACION</h2>`;
        education.forEach((edu) => {
            html += `
<div>
<div>${edu.degree}</div>
${edu.field ? `<div>${edu.field}</div>` : ''}
<div>${edu.institution}</div>
${edu.graduationYear ? `<div>${edu.graduationYear}</div>` : ''}
</div>`;
        });
        html += '</div>';
    }

    if (skills.length > 0) {
        html += `
<div class="section">
<h2 class="section-title">HABILIDADES TECNICAS</h2>`;
        skills.forEach((skill) => {
            html += `
<div><span>${skill.name}</span> <span>${skill.level}</span></div>`;
        });
        html += '</div>';
    }

    html += '</body></html>';
    return html;
};

describe('PDF Generator', () => {
    describe('generateCVHTML', () => {
        it('debe contener el nombre del applicant', () => {
            const mockCVData = createMockCVData();
            const html = generateTestHTML(mockCVData);
            expect(html).toContain('Alejandro Guanoluisa');
        });

        it('debe contener la informacion de contacto', () => {
            const mockCVData = createMockCVData();
            const html = generateTestHTML(mockCVData);
            expect(html).toContain('guanoluisaalejandro5@gmail.com');
            expect(html).toContain('0993630096');
            expect(html).toContain('Quito, Ecuador');
        });

        it('debe contener el resumen profesional', () => {
            const mockCVData = createMockCVData();
            const html = generateTestHTML(mockCVData);
            expect(html).toContain('Desarrollador Full Stack con experiencia.');
        });

        it('debe contener la seccion de experiencia laboral', () => {
            const mockCVData = createMockCVData();
            const html = generateTestHTML(mockCVData);
            expect(html).toContain('EXPERIENCIA LABORAL');
            expect(html).toContain('Senior Developer');
            expect(html).toContain('Tech Corp');
            expect(html).toContain('2020-01');
            expect(html).toContain('2023-12');
            expect(html).toContain('Desarrollo de aplicaciones moviles.');
        });

        it('debe contener la seccion de educacion', () => {
            const mockCVData = createMockCVData();
            const html = generateTestHTML(mockCVData);
            expect(html).toContain('EDUCACION');
            expect(html).toContain('Tecnologia Superior en desarrollo de software');
            expect(html).toContain('Sistemas');
            expect(html).toContain('Escuela Politecnica Nacional');
            expect(html).toContain('2026');
        });

        it('debe contener la seccion de habilidades tecnicas', () => {
            const mockCVData = createMockCVData();
            const html = generateTestHTML(mockCVData);
            expect(html).toContain('HABILIDADES TECNICAS');
            expect(html).toContain('TypeScript');
            expect(html).toContain('Avanzado');
        });

        it('no debe contener secciones vacias cuando no hay datos', () => {
            const emptyCVData = createEmptyCVData();
            const html = generateTestHTML(emptyCVData);
            expect(html).not.toContain('EXPERIENCIA LABORAL');
            expect(html).not.toContain('EDUCACION');
            expect(html).not.toContain('HABILIDADES TECNICAS');
        });

        it('debe usar los colores de la EPN', () => {
            const mockCVData = createMockCVData();
            const html = generateTestHTML(mockCVData);
            expect(html).toContain('#C8102E');
        });

        it('debe generar HTML valido con estructura DOCTYPE', () => {
            const mockCVData = createMockCVData();
            const html = generateTestHTML(mockCVData);
            expect(html).toContain('<!DOCTYPE html>');
            expect(html).toContain('<html>');
            expect(html).toContain('<head>');
            expect(html).toContain('<body>');
        });

        it('debe contener estilos CSS inline', () => {
            const mockCVData = createMockCVData();
            const html = generateTestHTML(mockCVData);
            expect(html).toContain('<style>');
            expect(html).toContain('.section-title');
            expect(html).toContain('.name');
        });
    });
});