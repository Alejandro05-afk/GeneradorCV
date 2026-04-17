# EPN Color Palette Reference

## Escuela Politécnica Nacional del Ecuador — Official Colors

The Escuela Politécnica Nacional del Ecuador has three core institutional colors that represent the school's values and identity. This document outlines how to use them effectively in the CV application.

---

## Primary Color: Rojo Institucional

**Hex Code**: `#C8102E`  
**RGB**: `200, 16, 46`  
**HSL**: `349°, 92%, 42%`

### Meaning
- **Energy**: Vibrant and dynamic
- **Strength**: Bold and confident
- **Tradition**: Represents institutional heritage and reputation

### Usage in UI

| Component | Usage |
|-----------|-------|
| **Primary Buttons** | Use for primary CTA (Call To Action) buttons |
| **Links & Interactive** | Use for active links or selected states |
| **Focus States** | Highlight focused input fields or selected items |
| **Accent Lines** | Subtle underlines or dividers for structure |
| **Icons** | For important, action-triggering icons |
| **Header Underline** | Title underlines to create visual hierarchy |

### Do's & Don'ts
✅ **Do:**
- Use for one primary action per screen
- Use sparingly to maintain impact
- Pair with white or dark gray backgrounds for maximum contrast
- Use in hover/active states for feedback

❌ **Don't:**
- Use for body text (hard to read)
- Use for secondary buttons (reserve for primary)
- Use as background for large areas (overwhelming)
- Mix with other bright colors (dilutes impact)

### CSS/React Native Usage

```typescript
// In constants/theme.ts
export const colors = {
  epnRed: '#C8102E',
  // ... other colors
};

// In a component
import { colors } from '@/constants/theme';

<Button style={{ backgroundColor: colors.epnRed }}>
  Primary Action
</Button>
```

---

## Secondary Color: Gris Oscuro / Negro

**Dark Gray**: `#333333`  
**RGB**: `51, 51, 51`  
**HSL**: `0°, 0%, 20%`

**Pure Black**: `#000000`  
**RGB**: `0, 0, 0`  
**HSL**: `0°, 0%, 0%`

### Meaning
- **Contrast**: Creates visual separation and structure
- **Readability**: Primary color for text and UI elements
- **Professionalism**: Dark colors suggest formality and reliability

### Usage in UI

| Component | Usage |
|-----------|-------|
| **Body Text** | Primary text color for paragraphs and descriptions |
| **Headings** | Titles and section headers |
| **Icons** | Standard icons and UI symbols |
| **Borders** | Component borders and dividers |
| **Disabled States** | Disabled buttons or inactive elements |
| **Secondary Buttons** | Outline or secondary action buttons |

### Preference Notes
- **`#333333`**: Slightly softer; better for readability on light backgrounds
- **`#000000`**: Maximum contrast; use when accessibility is critical

### CSS/React Native Usage

```typescript
// In constants/theme.ts
export const colors = {
  darkGray: '#333333',
  black: '#000000',
  // ... other colors
};

// In a component
<Text style={{ color: colors.darkGray }}>
  This is body text
</Text>
```

---

## Secondary Color: Blanco

**Hex Code**: `#FFFFFF`  
**RGB**: `255, 255, 255`  
**HSL**: `0°, 0%, 100%`

### Meaning
- **Clarity**: Clean, uncluttered visual space
- **Breathing Room**: Whitespace reduces cognitive load
- **Premium**: White backgrounds suggest quality and space

### Usage in UI

| Component | Usage |
|-----------|-------|
| **Backgrounds** | Main app background and screen backgrounds |
| **Card Backgrounds** | Content containers and elevated surfaces |
| **Input Fields** | Background for text inputs and forms |
| **Navigation Areas** | Clear separation of UI zones |
| **Whitespace** | Margins and padding for visual breathing room |

### Best Practices
- Don't use pure white everywhere — add subtle grays to create depth
- Use white with shadows or borders to define component boundaries
- Ensure text on white has sufficient contrast (dark gray or red)

### CSS/React Native Usage

```typescript
// In constants/theme.ts
export const colors = {
  white: '#FFFFFF',
  // ... other colors
};

// In a component
<View style={{ backgroundColor: colors.white, padding: 16 }}>
  <Text style={{ color: colors.darkGray }}>Content here</Text>
</View>
```

---

## Color Combinations & Contrast

### Recommended Combinations

| Background | Text/Icon | Contrast Ratio | WCAG Level |
|------------|-----------|----------------|-----------|
| White (#FFFFFF) | Red (#C8102E) | 6.02:1 | AAA |
| White (#FFFFFF) | Dark Gray (#333333) | 12.63:1 | AAA |
| Red (#C8102E) | White (#FFFFFF) | 6.02:1 | AAA |
| Dark Gray (#333333) | White (#FFFFFF) | 12.63:1 | AAA |
| Light Gray (#F5F5F5) | Dark Gray (#333333) | 11.36:1 | AAA |

All combinations meet **WCAG AAA** standards for accessibility.

### Avoid
❌ Red text on dark gray background (insufficient contrast)  
❌ Dark gray text on red background (creates visual tension)  
❌ Light text on white background (no contrast)

---

## Practical Examples

### Example 1: Primary Button
```typescript
<TouchableOpacity
  style={{
    backgroundColor: colors.epnRed, // #C8102E
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  }}
>
  <Text style={{ color: colors.white, fontWeight: '600' }}>
    Save Changes
  </Text>
</TouchableOpacity>
```

### Example 2: Card Component
```typescript
<View
  style={{
    backgroundColor: colors.white, // #FFFFFF
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE', // Very light gray for subtle border
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }}
>
  <Text style={{ color: colors.darkGray, fontSize: 16, fontWeight: '600' }}>
    Section Title
  </Text>
  <Text style={{ color: colors.darkGray, fontSize: 14, marginTop: 8 }}>
    Description text goes here
  </Text>
</View>
```

### Example 3: Form Input with Focus State
```typescript
<TextInput
  style={{
    backgroundColor: colors.white,
    borderWidth: isFocused ? 2 : 1,
    borderColor: isFocused ? colors.epnRed : '#CCCCCC',
    padding: 12,
    borderRadius: 6,
    color: colors.darkGray,
    fontSize: 16,
  }}
  placeholder="Enter your name"
  placeholderTextColor="#999999"
/>
```

---

## Implementation Checklist

When using the EPN color palette:

- [ ] Primary actions use Rojo Institucional (#C8102E)
- [ ] Body text uses Gris Oscuro (#333333)
- [ ] Backgrounds are clean white (#FFFFFF) or neutral gray
- [ ] All text has sufficient contrast (min. 4.5:1 for WCAG AA)
- [ ] Red is not overused (only for primary, high-importance elements)
- [ ] Component focus/active states are clearly visible with red
- [ ] Whitespace is used effectively to reduce visual clutter
- [ ] Icons and borders follow the dark gray standard
- [ ] Colors are defined in `constants/theme.ts` for centralized management
- [ ] No custom colors are added without approval (maintain brand consistency)

---

## Questions?

For guidance on applying these colors to specific components or screens, consult the main [SKILL.md](../SKILL.md) workflow or ask the development assistant.
