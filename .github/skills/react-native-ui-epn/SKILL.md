---
name: react-native-ui-epn
description: 'Multi-step workflow for generating and improving React Native + Expo UI components using the Escuela Politécnica Nacional del Ecuador color palette. Use for: creating new screens, refactoring components, improving visual hierarchy, ensuring brand consistency, enhancing accessibility.'
argument-hint: 'Screen or component name to improve, or "audit" to review current UI'
---

# React Native UI Development with EPN Brand Colors

## When to Use

- **Creating new screens** or components in the CV application
- **Refactoring existing components** to match the institutional color palette
- **Improving visual hierarchy**, spacing, and typography
- **Ensuring consistent branding** across all UI elements
- **Enhancing accessibility** and user experience
- **Auditing current UI** against brand guidelines

## EPN Color Palette Reference

See [./references/epn-colors.md](./references/epn-colors.md) for detailed color specifications and usage guidelines.

**Quick Reference:**
- **Rojo Institucional**: `#C8102E` — Primary actions, emphasis, energy
- **Gris Oscuro/Negro**: `#333333` or `#000000` — Text, contrast, structure
- **Blanco**: `#FFFFFF` — Backgrounds, whitespace, clarity

## Step-by-Step Workflow

### 1. Analyze the Component/Screen

Ask these questions:
- What is the primary purpose? (navigation, input, display, action)
- What is the current visual hierarchy?
- What interactive elements exist?
- Where can the EPN red be used for emphasis without overwhelming?

### 2. Define the Visual Structure

Map out:
- **Primary actions** → Use Rojo Institucional (#C8102E)
- **Secondary actions** → Use Gris Oscuro (#333333) or subtle borders
- **Text content** → Dark gray (#333333) on white (#FFFFFF) or light backgrounds
- **Backgrounds** → White (#FFFFFF) or soft grays for depth
- **Accents/Highlights** → Red for focus states, hover, active states

### 3. Generate Component Code

Create/improve components with:
- **Spacing**: Use consistent 8px or 4px increments for gutters and padding
- **Typography**: Define font sizes, weights, and line heights for readability
- **Colors**: Apply the EPN palette using a centralized theme (see [constants/theme.ts](../../constants/theme.ts))
- **Responsiveness**: Ensure components adapt to different screen sizes
- **Accessibility**: Add `accessibilityLabel`, contrast ratios, touch targets (48px minimum)

### 4. Implement Using theme.ts

Reference the existing theme file to ensure consistency. Components should use exported colors and spacing from `constants/theme.ts`:

```typescript
import { useTheme } from '@/hooks/use-theme-color';

// Inside component:
const colors = useTheme();
// Use colors.red, colors.darkGray, colors.white, etc.
```

### 5. Visual Review & Testing

Checklist:
- [ ] EPN red is used for primary actions only
- [ ] Text contrast meets WCAG AA standards (4.5:1 for normal text)
- [ ] Buttons and touch targets are at least 48px × 48px
- [ ] Spacing is consistent with 8px grid
- [ ] Component works on both dark and light color schemes (if applicable)
- [ ] No visual elements are cut off on small screens
- [ ] Interactive elements have clear focus/active states

### 6. Document and Package

- Add JSDoc comments explaining component props and usage
- Export from appropriate barrel files if needed
- Test in the preview screen to see the final appearance
- Consider dark mode implications if the app supports it

## File Organization

- **Components**: `components/` — Reusable UI components
- **Screens/Pages**: `app/` — Full-screen views
- **Theme constants**: `constants/theme.ts` — Centralized color and spacing definitions
- **Styling helpers**: `hooks/use-theme-color.ts` — Theme color hook for reactive styling

## Example Workflow

**Scenario**: Create a new "Education" section header component

1. **Analyze**: Header needs to stand out, requires typography hierarchy, should use red for emphasis
2. **Define structure**: 
   - Title in bold Rojo Institucional
   - Subtitle in Gris Oscuro with smaller font
   - Small red accent line beneath
3. **Generate code**: Create `EducationHeader.tsx` with proper spacing and colors
4. **Implement**: Use `constants/theme.ts` for colors
5. **Review**: Verify contrast, spacing, responsiveness
6. **Test**: Check in preview and different screen sizes

## Quick Tips

- **Don't overuse red**: It's for emphasis. Use white and dark gray for most content.
- **Maintain whitespace**: Avoid cluttering the interface; let whitespace guide the eye.
- **Test accessibility**: Use a contrast checker tool to ensure readability.
- **Mobile-first**: Design for small screens first, then enhance for larger ones.
- **Consistent spacing**: Use the same padding/margin values throughout for cohesion.

## Component Templates

Ready-to-use components following the EPN design system:

- [PrimaryButton](./assets/templates/PrimaryButton.tsx) — Rojo Institucional CTA button
- [CardContainer](./assets/templates/CardContainer.tsx) — White card with shadow and border
- [FormInput](./assets/templates/FormInput.tsx) — Text input with focus state and validation
- [ScreenHeader](./assets/templates/ScreenHeader.tsx) — Screen title with accent line

See [./assets/templates/README.md](./assets/templates/README.md) for usage examples and integration guide.

## Related Resources

- [EPN Color Palette Details](./references/epn-colors.md)
- [Component Templates Guide](./assets/templates/README.md)
- Project theme file: [constants/theme.ts](../../constants/theme.ts)
- Color scheme hook: [hooks/use-theme-color.ts](../../hooks/use-theme-color.ts)
