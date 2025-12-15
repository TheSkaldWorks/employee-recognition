# Planning Guide

A professional ROI calculator that helps HR and business leaders quantify the annual cost savings from reduced employee turnover through effective recognition programs.

**Experience Qualities**:
1. **Trustworthy** - Conservative estimates and transparent calculations build credibility with decision-makers
2. **Responsive** - Real-time updates to the savings calculation as inputs change create an engaging, interactive experience
3. **Polished** - Clean design with purposeful color accents and smooth animations convey professionalism

**Complexity Level**: Light Application (multiple features with basic state)
- This is an interactive calculator with real-time computation, expandable breakdown sections, and multiple input controls, but doesn't require complex routing or multi-view navigation

## Essential Features

**Live ROI Calculation**
- Functionality: Computes annual savings based on employee count, salary, turnover rate, and conservative reduction assumptions
- Purpose: Provides immediate, tangible value estimate to decision-makers
- Trigger: Any input change (employee count, salary slider, turnover rate slider, or reduction percentage toggle)
- Progression: User adjusts input → calculation updates instantly → large savings number animates to new value
- Success criteria: Calculation is mathematically accurate, updates within 100ms, and displays formatted currency

**Input Controls**
- Functionality: Text input for employee count, sliders for salary and turnover rate, toggle group for reduction percentage
- Purpose: Allows customization to match the user's specific organizational context
- Trigger: User interaction with any control
- Progression: User interacts with control → visual feedback (slider thumb moves, toggle highlights) → value updates → calculation recalculates
- Success criteria: All controls are keyboard accessible, show current values clearly, and have appropriate min/max bounds

**Breakdown Expansion**
- Functionality: Collapsible section showing detailed calculation breakdown
- Purpose: Builds trust by making the math transparent and showing how the final number is derived
- Trigger: "View Breakdown" button click
- Progression: User clicks button → section smoothly expands with height transition → shows itemized calculation steps → user can collapse again
- Success criteria: Smooth animation (300ms), accessible (keyboard toggle, screen reader announcements), breakdown values match main calculation

**Call-to-Action Links**
- Functionality: Multiple CTAs linking to scheduling page
- Purpose: Convert calculator engagement into booked demo calls
- Trigger: User clicks "Book a Call" or sticky bottom CTA
- Progression: User clicks CTA → new tab opens to scheduling link → maintains calculator state if user returns
- Success criteria: Opens in new tab with proper security attributes (rel="noopener"), visually distinct primary actions

## Edge Case Handling

- **Very large employee counts** - Formatting handles thousands/millions with proper separators
- **Zero turnover rate** - Calculation shows $0 savings gracefully without errors
- **Rapid slider adjustments** - Debounced updates prevent calculation thrashing
- **Mobile/small screens** - Two-column layout stacks vertically, sliders remain usable
- **Keyboard-only navigation** - All interactive elements properly focusable with visible focus states
- **Screen reader usage** - Sliders announce current values, breakdown expansion announces state changes

## Design Direction

The design should evoke professionalism, trustworthiness, and optimism. Clean, bright, and approachable while maintaining executive credibility. Subtle animations create delight without distraction. The color palette uses authoritative blue as the foundation with fresh mint accents to convey growth and positive outcomes.

## Color Selection

A professional palette anchored by a strong blue with fresh, optimistic accent colors.

- **Primary Color**: Brand Blue (oklch(0.52 0.17 250)) - Conveys trust, professionalism, and corporate credibility; used for primary CTAs and the main savings panel
- **Secondary Colors**: 
  - Ink (oklch(0.22 0.04 250)) - Deep navy for primary text, adds gravitas
  - Night (oklch(0.12 0.02 250)) - Darkest tone for high-contrast elements
  - Paper (oklch(0.98 0 0)) - Off-white background, softer than pure white
  - Cloud (oklch(0.95 0.005 240)) - Light blue-gray for secondary cards
- **Accent Color**: Mint (oklch(0.88 0.13 130)) - Fresh, growth-oriented highlight for pills and positive indicators
- **Foreground/Background Pairings**:
  - Brand Blue (oklch(0.52 0.17 250)): White text (oklch(1 0 0)) - Ratio 7.2:1 ✓
  - Ink (oklch(0.22 0.04 250)): Paper background (oklch(0.98 0 0)) - Ratio 11.8:1 ✓
  - Mint-200 (oklch(0.93 0.08 130)): Ink text (oklch(0.22 0.04 250)) - Ratio 8.9:1 ✓
  - Cloud (oklch(0.95 0.005 240)): Ink text (oklch(0.22 0.04 250)) - Ratio 10.1:1 ✓

## Font Selection

System font stack for fast loading and native OS feel - balances professionalism with performance.

- **Typographic Hierarchy**:
  - H1 (Hero Title): System Bold/48px desktop (32px mobile)/tight line height (1.1)
  - Label Pill: System Semibold/11px/wide letter spacing (0.08em)/uppercase
  - Subcopy: System Regular/18px/relaxed line height (1.6)
  - Input Labels: System Medium/14px/normal spacing
  - Big Number (Savings): System Bold/56px desktop (40px mobile)/tight line height
  - Body/Breakdown: System Regular/15px/normal line height (1.5)
  - Legal Note: System Regular/12px/relaxed line height
  - Button Text: System Semibold/15px/normal spacing

## Animations

Animations serve functional purposes - guiding attention to calculation updates and providing smooth state transitions. Breakdown expansion uses a height transition (300ms ease-out). The savings number subtly scales when updating. Floating background decoration uses slow vertical float (4s loop) with reduced-motion fallback.

## Component Selection

- **Components**: 
  - Shadcn Slider for salary and turnover rate inputs (with custom value display chips)
  - Shadcn Input for employee count (number input with proper validation)
  - Shadcn ToggleGroup for reduction percentage selection (styled as segmented control)
  - Shadcn Button for CTAs (variant="default" for primary, variant="outline" for secondary)
  - Shadcn Card for input container and result panel
  - Shadcn Tooltip for "Why?" explanation on replacement cost
  - Shadcn Collapsible for breakdown expansion
- **Customizations**: 
  - Custom currency formatting utility (formatUsd)
  - Custom slider thumb with live value display
  - Mint highlighter effect behind "Calculator" word using positioned span
  - Floating background decoration using CSS keyframes
- **States**: 
  - Buttons: hover shows darker background, active shows slight scale down
  - Sliders: hover shows slightly larger thumb, dragging shows elevated thumb with shadow
  - Toggle group: selected item has solid background, unselected has transparent
  - Breakdown: collapsed (height 0, opacity 0) to expanded (auto height, opacity 1)
- **Icon Selection**: 
  - CaretDown from Phosphor for breakdown toggle (rotates 180deg when expanded)
  - Info from Phosphor for tooltip trigger
- **Spacing**: 
  - Section padding: 16px mobile, 24px tablet, 32px desktop
  - Card padding: 24px mobile, 32px desktop
  - Input group gap: 24px
  - Button gap in CTA group: 12px
  - Breakdown row gap: 12px
- **Mobile**: 
  - Hero: single column, H1 scales to 32px, reduced top padding
  - Calculator: two columns stack to single column below 768px
  - Result card remains full width
  - Sticky CTA maintains full width with safe padding
  - Sliders maintain touch-friendly targets (44px minimum)
