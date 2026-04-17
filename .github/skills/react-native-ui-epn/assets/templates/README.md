# Component Templates

This folder contains reusable React Native + Expo component templates that follow the EPN color palette and design guidelines.

## Available Templates

### 1. PrimaryButton
**File**: `PrimaryButton.tsx`

Primary action button using Rojo Institucional (#C8102E).

**Use for:**
- Main CTAs (Save, Submit, Continue, Create)
- Important user actions
- Form submissions

**Props:**
```typescript
interface PrimaryButtonProps {
  label: string;              // Button text
  onPress: () => void;        // Callback function
  disabled?: boolean;         // Disable state
  loading?: boolean;          // Show loading spinner
  style?: ViewStyle;          // Custom styles
  textStyle?: TextStyle;      // Custom text styles
  accessibilityLabel?: string; // a11y label
}
```

**Example:**
```tsx
import { PrimaryButton } from '@/.github/skills/react-native-ui-epn/assets/templates/PrimaryButton';

<PrimaryButton
  label="Save Profile"
  onPress={handleSave}
  loading={isSaving}
/>
```

---

### 2. CardContainer
**File**: `CardContainer.tsx`

White card component for displaying grouped content with subtle shadow and border.

**Use for:**
- Education sections
- Work experience entries
- Skill groups
- Any content grouping

**Props:**
```typescript
interface CardContainerProps {
  children: React.ReactNode;      // Card content
  style?: ViewStyle;              // Custom styles
  padding?: DimensionValue;       // Inner padding (default: 16)
  withBorder?: boolean;           // Show border (default: true)
  elevation?: number;             // Shadow depth (default: 2)
  accessibilityLabel?: string;    // a11y label
}
```

**Example:**
```tsx
import { CardContainer } from '@/.github/skills/react-native-ui-epn/assets/templates/CardContainer';

<CardContainer padding={16} withBorder>
  <Text style={styles.title}>Senior Developer</Text>
  <Text style={styles.company}>Tech Company Inc.</Text>
  <Text style={styles.dates}>2020 - Present</Text>
</CardContainer>
```

---

### 3. FormInput
**File**: `FormInput.tsx`

Text input with focus state highlighting, label, error handling, and helper text.

**Use for:**
- Text fields
- Email inputs
- Name fields
- Multiline text areas
- Any form input

**Props:**
```typescript
interface FormInputProps extends TextInputProps {
  label?: string;              // Input label
  placeholder?: string;        // Placeholder text
  error?: string;              // Error message
  helperText?: string;         // Helper text below input
  required?: boolean;          // Show required asterisk
  containerStyle?: ViewStyle;  // Custom container styles
  multiline?: boolean;         // Enable multiline
  numberOfLines?: number;      // Lines for multiline
  value?: string;              // Input value
  onChangeText?: (text: string) => void; // Change handler
}
```

**Example:**
```tsx
import { FormInput } from '@/.github/skills/react-native-ui-epn/assets/templates/FormInput';

<FormInput
  label="Email Address"
  placeholder="your.email@example.com"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  required
/>
```

---

### 4. ScreenHeader
**File**: `ScreenHeader.tsx`

Screen title header with visual hierarchy and optional accent line using Rojo Institucional.

**Use for:**
- Page/screen titles
- Section headers
- Major content divisions

**Props:**
```typescript
interface ScreenHeaderProps {
  title: string;              // Main title
  subtitle?: string;          // Optional subtitle
  withAccent?: boolean;       // Show red accent line (default: true)
  style?: ViewStyle;          // Custom styles
  titleStyle?: TextStyle;     // Custom title styles
  subtitleStyle?: TextStyle;  // Custom subtitle styles
}
```

**Example:**
```tsx
import { ScreenHeader } from '@/.github/skills/react-native-ui-epn/assets/templates/ScreenHeader';

<ScreenHeader
  title="Work Experience"
  subtitle="Your professional history"
  withAccent
/>
```

---

## Integration Guide

### Step 1: Copy the Template
```bash
# Copy template to your components folder
cp ./PrimaryButton.tsx ../../../components/
```

### Step 2: Import in Your Component
```tsx
import { PrimaryButton } from '@/components/PrimaryButton';
// or use the template path directly
import { PrimaryButton } from '@/.github/skills/react-native-ui-epn/assets/templates/PrimaryButton';
```

### Step 3: Use in Your Code
```tsx
<PrimaryButton label="Continue" onPress={handlePress} />
```

---

## Color Reference

All templates use the EPN color palette:
- **Primary Red**: `#C8102E` — Rojo Institucional
- **Dark Gray**: `#333333` — Text and contrast
- **White**: `#FFFFFF` — Background
- **Light Gray**: `#CCCCCC`, `#EEEEEE` — Borders and subtle elements

See [../references/epn-colors.md](../references/epn-colors.md) for full palette details.

---

## Customization

All components accept custom styling via `style`, `textStyle`, etc. props. Override any color by passing custom styles:

```tsx
<PrimaryButton
  label="Custom"
  onPress={handlePress}
  style={{ backgroundColor: '#333333' }} // Override red
/>
```

---

## Accessibility

All templates include:
- ✅ `accessibilityLabel` support
- ✅ Minimum touch targets (48px)
- ✅ WCAG AA contrast ratios
- ✅ Semantic roles and states
- ✅ Focus indicators

---

## Questions?

Refer to [../SKILL.md](../SKILL.md) for the full UI development workflow, or ask in chat.
