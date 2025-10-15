# Innovoco Brand Color System

## Complete Color Palette - Fluent Design System

### Primary Colors

#### 1. Innovoco Blue (Data, Trust, Technology)
- **Primary (Core)**: `#0A58D0`
- **Light Variant (Pastel/Fluent)**: `#DBEAFE`
- **Mid Accent (Gradient bridge)**: `#93C5FD`
- **Dark Variant (Contrast/Accessibility)**: `#0B2C6F`
- **Dark Mode Primary**: `#3B82F6`
- **Dark Mode Accent**: `#60A5FA`

**Usage:**
- Hero CTAs, links, highlights
- Data/tech metaphors, structured visuals
- Stability + trust (data warehouse heritage)

#### 2. Innovoco Red (Action, Energy, Momentum)
- **Primary (Core)**: `#DC2626`
- **Light Variant (Pastel/Fluent)**: `#FECACA`
- **Mid Accent (Gradient bridge)**: `#F87171`
- **Dark Variant (Contrast/Accessibility)**: `#7F1D1D`
- **Dark Mode Primary**: `#EF4444`
- **Dark Mode Accent**: `#F87171`

**Usage:**
- Call-to-action emphasis
- Innovation & transformation cues
- Visual energy + urgency, balanced with calming blue

#### 3. Innovoco Purple (AI, Transformation, Innovation)
- **Primary (Core)**: `#8B5CF6`
- **Light Variant (Pastel/Fluent)**: `#EDE9FE`
- **Mid Accent (Gradient bridge)**: `#A78BFA` *(Hero gradient)*
- **Dark Variant (Contrast/Accessibility)**: `#5B21B6`
- **Dark Mode Primary**: `#A78BFA`
- **Dark Mode Accent**: `#C4B5FD`

**Usage:**
- AI/ML features and capabilities
- Transformation messaging
- Bridge between trust (blue) and action (red)
- Innovation without aggression

#### 4. Innovoco Magenta (Research, Creative Intelligence, Discovery)
- **Primary (Core)**: `#EC4899`
- **Light Variant (Pastel/Fluent)**: `#FDDDE6`
- **Mid Accent (Gradient bridge)**: `#F9A8D4`
- **Dark Variant (Contrast/Accessibility)**: `#BE185D`
- **Dark Mode Primary**: `#F472B6`
- **Dark Mode Accent**: `#F9A8D4`

**Usage:**
- Research and discovery features
- Creative intelligence and innovation
- Exploratory analytics and insights
- Evolution of red energy into creative exploration

### Supporting Colors

#### Trust Green (Compliance, Security, Success)
- **Primary (Core)**: `#0F766E`
- **Light Variant (Pastel/Fluent)**: `#D1FAE5`
- **Mid Accent (Gradient bridge)**: `#10B981`
- **Dark Variant (Contrast/Accessibility)**: `#064E3B`
- **Dark Mode Primary**: `#10B981`
- **Dark Mode Accent**: `#34D399`

**Usage:**
- Compliance & security visuals
- Positive outcome indicators
- Success metrics and achievements
- Trust indicators

### Neutral Colors

#### Light Mode
- **Background**: `#FFFFFF`
- **Surface**: `#F9FAFB`
- **Border**: `#E5E7EB`
- **Text Primary**: `#0B0F19`
- **Text Secondary**: `#6B7280`
- **Text Muted**: `#9CA3AF`

#### Dark Mode
- **Background**: `#0B0F19`
- **Surface**: `#1F2937`
- **Border**: `#374151`
- **Text Primary**: `#F9FAFB`
- **Text Secondary**: `#D1D5DB`
- **Text Muted**: `#9CA3AF`

## Gradient Combinations (Fluent Style)

### Hero/Primary Gradients

#### Light Mode
```css
/* AI Transformation (Current Hero) */
background: linear-gradient(to right, #93C5FD, #A78BFA, #F87171);

/* Full Spectrum (Bold) */
background: linear-gradient(to right, #0A58D0, #A78BFA, #DC2626);

/* Soft Background */
background: linear-gradient(135deg, #DBEAFE, #EDE9FE, #FECACA);
```

#### Dark Mode
```css
/* Primary Dark */
background: linear-gradient(to right, #3B82F6, #A78BFA, #EF4444);

/* Accent Dark */
background: linear-gradient(to right, #60A5FA, #C4B5FD, #F87171);
```

### Success/Trust Gradients
```css
/* Security/Compliance */
background: linear-gradient(to right, #0F766E, #10B981);

/* Soft Trust */
background: linear-gradient(to right, #D1FAE5, #93C5FD);
```

## Design Philosophy

### Original Brand Evolution
The brand colors have evolved from flat corporate colors to a modern Fluent Design-inspired system while maintaining core brand identity:

1. **Core Colors Preserved**: Original blue (#0A58D0) and red (#DC2626) remain as primary anchors
2. **Fluent Enhancement**: Added light, mid, and dark variants for depth and flexibility
3. **AI-Era Addition**: Purple introduced to represent AI/ML transformation
4. **Trust Reinforcement**: Green added for security and compliance messaging

### Visual Principles

#### Shift from Flat to Volumetric
- Soft gradients with depth replace flat colors
- Lighter, pastel tones create modern feel
- Subtle transitions between color stops

#### Gradient Applications
- **Hero Sections**: Multi-color gradients for visual interest
- **CTAs**: Single or dual-color gradients for focus
- **Backgrounds**: Soft pastel combinations for subtle depth

## Implementation Guidelines

### Button States
```css
/* Primary Button */
.btn-primary {
  background: #0A58D0; /* Light mode */
  background: #3B82F6; /* Dark mode */
}

/* Secondary Button */
.btn-secondary {
  background: #A78BFA; /* Both modes */
}

/* Success Button */
.btn-success {
  background: #10B981; /* Both modes */
}
```

### Text Colors
- **Headlines**: Use primary dark variants for maximum contrast
- **Body Text**: Use text secondary colors
- **Muted Text**: Use text muted for captions and metadata
- **Links**: Use mid accent blues

### Background Usage
1. **Large Surfaces**: Light variants (#DBEAFE, #FECACA, #EDE9FE)
2. **Cards/Sections**: Surface colors with subtle borders
3. **Overlays**: White/black with opacity (e.g., bg-white/70)
4. **Gradients**: Blend 2-3 colors maximum for clarity

## Accessibility Requirements

### Contrast Ratios
- **Normal Text**: Minimum 4.5:1 (WCAG AA)
- **Large Text**: Minimum 3:1 (WCAG AA)
- **Interactive Elements**: Minimum 3:1 against background

### Color Combinations
✅ **Accessible Combinations:**
- Dark variants on light backgrounds
- Light variants on dark backgrounds
- Primary colors for important actions

⚠️ **Avoid:**
- Light variants on white without borders
- Mid-tones for small text
- Gradient text on gradient backgrounds

## Usage in Code

### Tailwind CSS Classes
```jsx
// Blues
className="text-[#0A58D0]"     // Primary blue
className="bg-[#DBEAFE]"        // Light blue
className="border-[#93C5FD]"    // Mid blue

// Reds
className="text-[#DC2626]"      // Primary red
className="bg-[#FECACA]"        // Light red
className="border-[#F87171]"    // Mid red

// Purples
className="text-[#8B5CF6]"      // Primary purple
className="bg-[#EDE9FE]"        // Light purple
className="border-[#A78BFA]"    // Mid purple

// Greens
className="text-[#0F766E]"      // Primary green
className="bg-[#D1FAE5]"        // Light green
className="border-[#10B981]"    // Mid green

// Magentas
className="text-[#EC4899]"      // Primary magenta
className="bg-[#FDDDE6]"        // Light magenta
className="border-[#F9A8D4]"    // Mid magenta
```

### CSS Variables (Future Implementation)
```css
:root {
  /* Blues */
  --color-blue-primary: #0A58D0;
  --color-blue-light: #DBEAFE;
  --color-blue-mid: #93C5FD;
  --color-blue-dark: #0B2C6F;
  
  /* Reds */
  --color-red-primary: #DC2626;
  --color-red-light: #FECACA;
  --color-red-mid: #F87171;
  --color-red-dark: #7F1D1D;
  
  /* Purples */
  --color-purple-primary: #8B5CF6;
  --color-purple-light: #EDE9FE;
  --color-purple-mid: #A78BFA;
  --color-purple-dark: #5B21B6;
  
  /* Greens */
  --color-green-primary: #0F766E;
  --color-green-light: #D1FAE5;
  --color-green-mid: #10B981;
  --color-green-dark: #064E3B;
  
  /* Magentas */
  --color-magenta-primary: #EC4899;
  --color-magenta-light: #FDDDE6;
  --color-magenta-mid: #F9A8D4;
  --color-magenta-dark: #BE185D;
}
```

---

*Last Updated: December 2024*
*This color system represents Innovoco's evolution toward modern, fluent design while maintaining our established brand identity.*