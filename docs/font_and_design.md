# UI Design System

> **Design Philosophy:**  
> **Minimal. Intelligent. Premium.**
>
> The interface should feel like a blend of **Linear, Notion, Stripe, Vercel, Apple, and GitHub**—clean, modern, and highly professional.
>
> Focus on:
> - Minimalism over decoration
> - Excellent typography
> - High contrast
> - Consistent spacing
> - Smooth micro-interactions
> - A premium SaaS experience
>
> Users should immediately think:
>
> > *"This feels like a polished, enterprise-grade product."*

---

# Theme

## Primary Theme

Dark Mode (Default)

Avoid using pure black (`#000000`).

Instead use:

```css
Background: #0A0A0A
```

This reduces eye strain and creates a more premium appearance.

---

## Surface Colors

### Primary Surface

```css
#111111
```

Used for:

- Cards
- Panels
- Modals

---

### Elevated Surface

```css
#171717
```

Used for:

- Dropdowns
- Floating panels
- Hover states

---

### Borders

```css
#262626
```

Borders should remain subtle.

Avoid heavy outlines.

---

# Color Palette

## Primary Accent

Instead of using the common AI blue, use Emerald Green.

```css
Primary:      #10B981
Primary Light:#34D399
```

Used for:

- Primary buttons
- Progress bars
- Graphs
- Active states
- Success indicators

---

## Gradient

```text
#10B981
      ↓
#34D399
```

Use consistently for:

- Charts
- Graphs
- Progress indicators
- Highlights

---

## Status Colors

### Success

```css
#10B981
```

---

### Error

```css
#EF4444
```

---

### Warning

```css
#F59E0B
```

---

### Information

```css
#3B82F6
```

---

# Typography

## Font Family

### Headings

```
Space Grotesk
```

Reasons:

- Modern
- Technical
- Strong personality
- Excellent for AI products

Weight:

```
600
700
```

---

### Body

```
Inter
```

Reasons:

- Extremely readable
- Industry standard
- Used by premium SaaS products

Weights:

```
400
500
600
```

---

# Typography Scale

## Hero

```
64px
700
```

---

## Main Heading (H1)

```
48px
700
```

---

## Section Heading (H2)

```
36px
700
```

---

## Dashboard Heading

```
30px
600
```

---

## Card Title

```
24px
600
```

---

## Subtitle

```
20px
500
```

---

## Body

```
16px
400
```

---

## Small Text

```
14px
```

---

## Caption

```
12px
```

---

# Text Colors

## Primary

```css
#FAFAFA
```

---

## Secondary

```css
#B3B3B3
```

---

## Muted

```css
#737373
```

---

## Disabled

```css
#525252
```

---

# Line Height

## Heading

```
110%
```

---

## Body

```
160%
```

---

# Letter Spacing

## Heading

```
-0.03em
```

---

## Body

```
0
```

---

# Border Radius

## Cards

```
18px
```

---

## Buttons

```
14px
```

---

## Inputs

```
12px
```

---

## Badges

```
999px
```

Fully rounded.

---

# Shadows

Avoid heavy shadows.

Preferred:

```css
0 8px 24px rgba(0,0,0,.22)
```

or

```css
0 0 0 1px rgba(255,255,255,.04)
```

---

# Spacing System

Use an 8-point spacing system.

```
4
8
12
16
20
24
32
40
48
64
80
96
128
```

Never introduce arbitrary spacing values.

---

# Buttons

## Primary

- Emerald gradient
- White text

---

## Secondary

- Transparent
- Border only

---

## Ghost

- Text only
- No background

---

## Hover Animation

```
Scale: 1.02
Duration: 250ms
```

Subtle interactions only.

---

# Inputs

Background

```css
#171717
```

Border

```css
#262626
```

Focus

```
2px Emerald Border
```

---

# Cards

Padding

```
24px
```

Border Radius

```
18px
```

Border

```
1px Solid
```

Avoid excessive elevation.

---

# Navigation Bar

Height

```
72px
```

Layout

```
Logo
Navigation
Profile
```

Background

Transparent

Blur

```css
backdrop-filter: blur(20px);
```

---

# Sidebar

Collapsed

```
80px
```

Expanded

```
280px
```

Rounded edges.

---

# Charts & Graphs

Use a monochromatic style.

Gradient

```
Dark Emerald
        ↓
Light Emerald
```

Avoid multiple unrelated colors.

---

# Icons

Use:

```
Lucide Icons
```

Stroke Width

```
1.75
```

Maintain consistency throughout the application.

---

# Animations

Library

```
Framer Motion
```

Duration

```
250ms
```

Recommended Effects

- Fade
- Slide (8px)
- Scale (1.02)
- Smooth Spring

Avoid exaggerated or playful animations.

---

# Blur Effects

Cards

```css
blur(10px)
```

Navbar

```css
blur(20px)
```

Use sparingly.

---

# Responsive Grid

Desktop

```
12 Columns
```

Tablet

```
8 Columns
```

Mobile

```
4 Columns
```

---

# Dashboard Layout

```
Navbar

↓

Hero Statistics

↓

Quick Actions

↓

Recent Activity

↓

Comparison Cards

↓

AI Insights

↓

Performance Graph

↓

History
```

---

# Component Standards

Every reusable component should include:

- 18px border radius
- 1px subtle border
- Consistent padding
- Hover animation
- Focus state
- Loading skeleton
- Empty state
- Error state
- Responsive layout
- Keyboard accessibility
- Dark mode support

---

# Design Tokens

```ts
export const colors = {
  background: "#0A0A0A",
  surface: "#111111",
  surfaceElevated: "#171717",

  border: "#262626",

  primary: "#10B981",
  primaryLight: "#34D399",

  textPrimary: "#FAFAFA",
  textSecondary: "#B3B3B3",
  textMuted: "#737373",

  danger: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
};
```

---

# Overall Design Direction

Most AI products today rely on blue gradients, glowing effects, and chat-centric interfaces. This project should instead embrace the aesthetic of a modern research workspace.

Key principles:

- 95% grayscale interface
- Single emerald accent color
- Large whitespace
- Strong typography
- Minimal visual noise
- Elegant analysis panels instead of chat bubbles
- Consistent monochromatic charts
- Glassmorphism used only where appropriate (navigation, overlays)
- Smooth micro-interactions over flashy animations

The objective is to deliver a user experience that feels polished, trustworthy, and production-ready—closer to a premium SaaS platform than a typical hackathon prototype.
