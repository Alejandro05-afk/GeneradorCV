# GeneradorCV — Agent Notes

## Stack
- **Framework**: Expo SDK 54 + expo-router (file-based routing)
- **Entry point**: `expo-router/entry` (package.json `main`)
- **TypeScript**: strict mode enabled
- **Path alias**: `@/*` → project root

## Dev Commands
```bash
npm install                    # Install deps
npx expo start                 # Dev server (default)
npx expo start --android       # Android
npx expo start --ios           # iOS
npx expo start --web           # Web
npx expo lint                  # ESLint (expo-config)
npm run reset-project          # Reset to blank app
```

## App Structure
- `app/` — File-based routes (index, personal-info, experience, education, preview)
- `context/CVContext.tsx` — CV state management (wrap root in `CVProvider`)
- `constants/theme.ts` — Colors object (light/dark)
- `hooks/use-theme-color.ts` — Theme color hook
- `components/` — Reusable UI components
- `types/cv.types.ts` — TypeScript types (CVData, PersonalInfo, Experience, Education)

## Navigation
Stack navigator defined in `app/_layout.tsx`. Header uses EPN red (#C8102E) with white text.

## EPN Brand Colors
- **Rojo Institucional**: `#C8102E` — primary actions, headers
- **Gris Oscuro/Negro**: `#333333` / `#000000` — text, contrast
- **Blanco**: `#FFFFFF` — backgrounds, whitespace

## UI Development
Use the `react-native-ui-epn` skill for UI work:
- `.github/skills/react-native-ui-epn/SKILL.md`
- Provides component templates and brand-consistent styling guidelines

## Build / Deploy
- `eas.json` configured for development, preview (APK), and production builds
- Project ID: `2b52ecde-cfc5-4444-8c12-374b513c1014`
- No tests in this project