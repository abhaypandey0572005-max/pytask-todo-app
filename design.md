# 🎨 UI/UX Design System & Specifications (`design.md`)

This document outlines the visual language, design tokens, Stitch design screen specifications, typography, and component styling rules for the **PyTask (TaskFlow)** application.

---

## 1. Design Philosophy

- **Developer-Centric & Minimalist**: Clean, dark-first UI optimized for focus, readability, and speed.
- **Stitch Design Alignment**: High-fidelity modal dialogues featuring bold uppercase section headers, subtle rounded input containers, and signature maroon `#782522` accents.
- **Micro-Interactions**: Instant feedback on hover, active button press states (`active:scale-95`), loading spinners during network operations, and smooth accordion animations for expandable notes.

---

## 2. Color Palette & Design Tokens

### 2.1 Brand & Neutral Colors
| Token Name | Hex Value | Usage |
|---|---|---|
| **Canvas Background** | `#020617` (Slate-950) | Main application body background. |
| **Card / Surface Background** | `#0f172a` (Slate-900 / 70% opacity) | Task cards, stats containers, input containers. |
| **Modal Light Background** | `#ffffff` (White) / `#0f172a` (Slate-900 in Dark) | Modal dialog container matching Stitch design. |
| **Border Soft** | `#1e293b` (Slate-800) | Card dividers, input borders, container outlines. |
| **Primary Maroon Button** | `#782522` | "Save Task" button, header gradient accent. |
| **Primary Maroon Hover** | `#661e1b` | Hover state for primary action buttons. |
| **Brand Accent Cyan** | `#22d3ee` | PyTask logo text, checkmark highlights. |
| **Brand Accent Indigo** | `#6366f1` | Progress bar gradient, focus rings, active tabs. |

### 2.2 Semantic Status Tokens
| Semantic Status | Dot Color | Badge Background | Badge Border | Usage |
|---|---|---|---|---|
| **Low Priority** | `#10b981` (Emerald-500) | `rgba(16, 185, 129, 0.1)` | `rgba(16, 185, 129, 0.2)` | Low priority pill button & task card badge. |
| **Medium Priority** | `#f59e0b` (Amber-500) | `rgba(245, 158, 11, 0.1)` | `rgba(245, 158, 11, 0.2)` | Medium priority pill button & task card badge. |
| **High Priority** | `#ef4444` (Rose-500) | `rgba(239, 68, 68, 0.1)` | `rgba(239, 68, 68, 0.2)` | High priority pill button & task card badge. |
| **Completed / Done** | `#10b981` (Emerald-500) | `rgba(16, 185, 129, 0.1)` | `rgba(16, 185, 129, 0.2)` | Checked checkbox, Completed tab indicator. |
| **Pending / Active** | `#f59e0b` (Amber-500) | `rgba(245, 158, 11, 0.1)` | `rgba(245, 158, 11, 0.2)` | Active tab badge & counter. |

---

## 3. Typography Scale

The application uses **Inter** as the primary font family with system-ui fallbacks:

```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Hierarchy:
- **Application Title**: `28px - 32px` (`text-2xl sm:text-3xl`), font-weight `800` (ExtraBold), tracking `-0.025em`.
- **Modal Section Headers**: `11px` (`text-[11px]`), font-weight `700` (Bold), uppercase (`uppercase`), tracking `0.05em` (`tracking-wider`), color `text-slate-500`.
- **Card Titles / Task Headlines**: `14px` (`text-sm`), font-weight `600` (SemiBold), line-height `1.4`.
- **Metadata & Badges**: `11px` (`text-[11px]`), font-weight `600` (SemiBold).
- **Body & Descriptions**: `12px - 13px` (`text-xs`), font-weight `400` (Regular), leading `1.6`.

---

## 4. Stitch Design Screen Breakdown (`c0a7f56645064495b73b635a5ed0457d`)

```
┌────────────────────────────────────────────────────────┐
│  [X]                     [ 🗹 PyTask ]                 │
│                                                        │
│  TASK_TITLE                                            │
│  ┌──────────────────────────────────────────────────┐  │
│  │ e.g., Optimize database queries                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  DESCRIPTION                                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Add detailed notes or requirements...            │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  DUE_DATE                                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 📅  dd-mm-yyyy                                 🗓 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  CATEGORY                                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 📁  Work                                       ⌄ │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  PRIORITY_LEVEL                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  ● Low       │  │  ● Medium    │  │  ● High      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ────────────────────────────────────────────────────  │
│  ┌──────────────────────┐    ┌──────────────────────┐  │
│  │       Cancel         │    │  💾   Save Task      │  │
│  └──────────────────────┘    └──────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 5. Component Visual Specifications

### 5.1 Create / Edit Modal Dialogs
- **Backdrop**: `rgba(0, 0, 0, 0.6)` with CSS `backdrop-blur-sm`.
- **Container**: `max-w-md`, padding `24px` (`p-6`), border-radius `24px` (`rounded-3xl`), shadow `shadow-2xl`.
- **Inputs & Dropdowns**: Background `bg-slate-50 dark:bg-slate-950/60`, border `border-slate-200 dark:border-slate-700/80`, border-radius `12px` (`rounded-xl`), focus ring `focus:ring-2 focus:ring-indigo-500/10`.

### 5.2 Task Cards (`TaskItem.jsx`)
- **Container**: Border-radius `16px` (`rounded-2xl`), border `border-slate-800`, hover border `border-slate-700/80`.
- **Checkbox**: `w-6 h-6`, rounded-lg. When active/checked: emerald background with white checkmark.
- **Action Icons**: `p-2` rounded-xl buttons with subtle hover backgrounds (`hover:bg-indigo-500/10` for edit, `hover:bg-rose-500/10` for delete).
- **Notes Drawer**: Expandable drawer with `bg-slate-950/60`, border `border-slate-800`, and clean line breaks for notes.

### 5.3 Progress & Stats Bar (`StatsBar.jsx`)
- **Summary Cards**: 3-column responsive grid with rounded-xl containers, distinct icon colors (Blue, Emerald, Amber).
- **Progress Bar Track**: `h-2.5` with slate-800 background and slate-700 outline.
- **Progress Bar Indicator**: Animated gradient `from-indigo-500 via-violet-500 to-emerald-400` with `transition-all duration-500 ease-out`.
