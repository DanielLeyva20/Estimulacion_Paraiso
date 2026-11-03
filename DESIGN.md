---
name: Mi Paraíso
description: A small valley seen from above; vivid field plots and full-bleed color bands on warm cream ground, stitched by one irrigation channel.
colors:
  crema: "#FFF6E6"
  crema-2: "#FDEBCB"
  blanco: "#FFFDF8"
  turquesa: "#14B3A3"
  turquesa-oscuro: "#087064"
  coral: "#F4696A"
  coral-oscuro: "#B4303A"
  mostaza: "#F7B32B"
  mostaza-oscuro: "#7A4F00"
  azul: "#2F6A9A"
  azul-oscuro: "#1F4D75"
  morado: "#6D4CC9"
  morado-oscuro: "#4E3399"
  agua: "#1A8FE3"
  tinta: "#13222B"
  tinta-suave: "#465660"
  error: "#B4303A"
  wa: "#1F7A4D"
  wa-hover: "#17633E"
typography:
  display:
    fontFamily: "'M PLUS Rounded 1c', 'Onest', system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 4.6vw + 1rem, 5.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  numeral:
    fontFamily: "'M PLUS Rounded 1c', 'Onest', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 3.4vw + 0.5rem, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'M PLUS Rounded 1c', 'Onest', system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.2vw + 1rem, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'M PLUS Rounded 1c', 'Onest', system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1vw + 1rem, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Onest', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.0625rem, 0.4vw + 0.98rem, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Onest', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  sm: "14px"
  md: "22px"
  field: "32px"
  pill: "999px"
spacing:
  surco: "clamp(8px, 1vw, 14px)"
  gutter: "clamp(16px, 4vw, 40px)"
  seccion: "clamp(88px, 11vw, 152px)"
  ancho: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.wa}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.wa-hover}"
  button-soft:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    height: "52px"
  button-soft-hover:
    backgroundColor: "{colors.blanco}"
  button-light:
    backgroundColor: "rgb(255 255 255 / 0.1)"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    height: "52px"
  button-light-hover:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
  plot:
    backgroundColor: "{colors.turquesa}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.md}"
  plot-label:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-toggle:
    backgroundColor: "rgb(255 255 255 / 0.35)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    height: "44px"
  chip-toggle-pressed:
    backgroundColor: "{colors.tinta}"
    textColor: "#FFFFFF"
  chip-filter:
    backgroundColor: "rgb(255 255 255 / 0.1)"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    height: "44px"
  chip-filter-pressed:
    backgroundColor: "{colors.mostaza}"
    textColor: "{colors.tinta}"
  fact-pill:
    backgroundColor: "{colors.turquesa}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  option-card:
    backgroundColor: "rgb(255 255 255 / 0.35)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  option-card-checked:
    backgroundColor: "{colors.blanco}"
  field-input:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
    height: "52px"
  field-input-focus:
    backgroundColor: "{colors.blanco}"
  form-card:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.field}"
    padding: "clamp(22px, 4vw, 48px)"
  faq-item:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.sm}"
    padding: "20px 22px"
  group-indicator:
    backgroundColor: "{colors.turquesa}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    size: "24px"
  map-card:
    backgroundColor: "{colors.crema-2}"
    rounded: "{rounded.field}"
    height: "clamp(320px, 46vw, 540px)"
  map-marker:
    backgroundColor: "{colors.coral}"
    size: "44px"
  lightbox-control:
    backgroundColor: "rgb(255 255 255 / 0.14)"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    size: "48px"
  step-numeral:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    size: "48px"
  whatsapp-float:
    backgroundColor: "{colors.wa}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    height: "60px"
---

# Design System: Mi Paraíso

## Overview

**Creative North Star: "The Valley in Plots"**

The center is seen from above as a small irrigated valley. Every space and program is a parcela: a flat field of vivid color or a whole photograph, cut with the same soft 22px corner and laid on one module grid with narrow furrow gaps between plots. The page opens on the real place: a full-viewport video of the center under a deep ink veil, with the headline in white. From the foot of that video a river-blue channel, the acequia, is drawn from the live layout down the left gutter and stops beside each section heading, so the visitor is carried from one field to the next instead of scrolling past a stack of cards.

The ground is warm cream, never white. On it the valley is planted in strong, saturated color: turquoise, coral, mustard, steel blue and purple. Color arrives at two scales: as plots inside mosaics, and as full-bleed bands where a whole section is one field (vacaciones in mustard, galería in purple, confianza in turquoise, matrícula in steel blue), and each section meets the one before it along a soft field edge (a wave, a curve, a row of scallops or a line of hills) cut in its own ground color. Light fields carry deep ink text; dark fields carry white. Depth comes from color fields and fine diagonal furrow texture, with soft ambient shadow reserved for things that float or open. Type is rounded and heavy in headings (M PLUS Rounded 1c 800) and calm, generous and highly legible in body (Onest at 17 to 19px, line-height 1.6), because the readers are tired parents on phones.

Motion is slow and settling: the hero headline arrives line by line out of a blur, content rises 18px into place, photo plots unscale from 1.14 inside their frame, water advances along the channel with scroll, summer months fill with turquoise from left to right, gallery photos uncover upward and glide to new places when filtered, the back wave of a double edge drifts sideways. Presses answer in 200ms with a slight shrink. Everything collapses to still under reduced motion.

**Key Characteristics:**
- Vivid field plots with a shared 22px radius on one grid, separated by a fluid furrow gap.
- Full-bleed color bands alternate with cream sections; each band sets its own text color and supporting-text color, and each section owns the shaped edge above it.
- On turquoise, coral and mustard, text is ink; on steel blue and purple, text is white.
- WhatsApp green belongs only to the WhatsApp action; river blue only to water and focus.
- Rounded heavy display type over a quiet, roomy Onest body.

## Colors

A saturated valley on warm cream: five strong field colors, each with a deep variant for color-as-text on light grounds, plus one river blue, one deep ink and one action green. Deep ink also serves as the dark ground of the hero veil and the footer.

### Primary
- **WhatsApp Field Green** (wa): the single action color. Primary buttons, the header button, the floating "¿Hablamos?" button, the form submit. Hovers deepen to **Shaded Field Green** (wa-hover). White text on it (5.3:1).

### Secondary
- **River Water** (agua): the flow and focus color. The acequia stroke, its bed (20%) and node rings, the river line in the logo, and every focus ring (3px outline, 3px offset). Also the focus border of form fields (2px inset).

### Tertiary
Five vivid field colors, used as plot fills, band backgrounds, numerals and small markers:
- **Acequia Turquoise** (turquesa): the default plot fill and the "1–2" age plot, the confianza band, the estimulación program field, filled summer months, check badges, the scrollbar thumb. Ink text. Also the "1 a 2 años" hero fact pill. **Deep Turquoise** (turquesa-oscuro) is the field variant in use as text: icons on cream and white, the completed-group check in the matrícula progress, the caret, the checkbox accent.
- **Camote Coral** (coral): the "Arma su taller" builder panel, step 3, the FAQ plus badge, the offset plot behind the FAQ photo, the talleres step numerals, nav hover underlines, the hand-drawn underline under the hero word "paraíso", the "Grupos pequeños" hero pill, the map marker and the address disc in ubicación, the family-data progress segment and indicator. Ink text.
- **Ripe Mustard** (mostaza): the vacaciones band, the educación program field, step 2, the hero word "paraíso" (as text on the ink veil), the "Imperial, Cañete" hero pill, the pressed gallery filter, the matrícula photo badge and its after-sending numerals, reached acequia nodes, text selection. Ink text.
- **Steel Blue** (azul): the matrícula band, step 1, the second spaces accent plot. White text.
- **Vine Purple** (morado): the galería band, the educación y cuidado program field and one logo plot. White text.
- **Deep variants** (coral-oscuro, mostaza-oscuro, azul-oscuro, morado-oscuro): reserved for text or icons of that hue on cream or white (all 5.2:1 or better on crema-2). In use as the placeholder fill behind photo plots on their own hue (coral-oscuro behind the FAQ photo, azul-oscuro behind the matrícula photo, morado-oscuro behind gallery photos), so a loading photo reads as part of its band.

### Neutral
- **Warm Cream** (crema): page ground, header glass tint, form field fill, scrollbar track.
- **Toasted Cream** (crema-2): quieter band for the FAQ section, the photo disclaimer note, the read-only age output.
- **Cotton** (blanco): raised surfaces that sit on a field or band: the matrícula form card, the mochila aside, FAQ items, plot labels, step numerals, icon discs on bands, checked option cards, focused fields.
- **Furrow Ink** (tinta): headings, body text, and all text on turquoise, coral and mustard; pressed toggle chips. As a ground: the hero behind the video and its gradient veil (90% to 20% bottom-up on phones, 86% to 5% left-to-right from 768px), the footer, and the lightbox backdrop (90%). White text on it.
- **Soft Furrow Ink** (tinta-suave): supporting paragraphs on cream and cotton, field help, footnotes.
- **Error Red** (error): field error text and the 2px invalid ring.

### Named Rules
**The Band and Its Ink Rule.** Turquoise, coral and mustard take Furrow Ink text (6.2, 5.5 and 8.9:1); steel blue, purple and the Furrow Ink grounds (hero veil, footer) take white (5.8 and 6.0:1 on the fields). Never the reverse. A full-bleed band declares itself light or dark, and that choice sets both the text color and the supporting-text color (Furrow Ink on light bands, white at 88% on dark bands). Soft Furrow Ink belongs to cream and cotton only.

**The One Green Rule.** WhatsApp Field Green appears only on the WhatsApp action. No other element, field or icon uses it.

**The Water Is Water Rule.** River Water marks only water and focus: the acequia, the logo's river line, focus rings. It is never a plot fill, a band or a section edge.

## Typography

**Display Font:** M PLUS Rounded 1c (with Onest, system-ui fallback), self-hosted via @fontsource at 700 and 800.
**Body Font:** Onest (with system-ui, -apple-system, Segoe UI fallback), self-hosted at 400, 500, 600.

**Character:** Soft-cornered, heavy rounded headings that feel like a children's place without being cartoonish, over a neutral, open grotesque that stays legible at small phone sizes.

### Hierarchy
- **Display** (800, clamp(2.75rem, 4.6vw + 1rem, 5.25rem), 1.02, -0.035em): the hero headline only, in white over the ink veil, max 12ch, three lines that each enter from 0.35em below and an 8px blur (0.9s, 110ms apart). On phones clamp(2.6rem, 12vw, 3.6rem).
- **Numeral** (800, clamp(2.5rem, 3.4vw + 0.5rem, 3.75rem), 1, -0.03em): large field figures set inside plots, such as "1–2".
- **Headline** (800, clamp(2rem, 3.2vw + 1rem, 3.25rem), 1.12, -0.02em): section titles (h2).
- **Title** (700, clamp(1.375rem, 1vw + 1rem, 1.75rem), 1.12): space, step and form titles (h3). Program titles step up to 800 at clamp(1.625rem, 1.6vw + 1rem, 2.25rem); list item titles (h4) run at 1.1 to 1.2rem; fieldset legends at 1.15rem display 800.
- **Body** (400, clamp(1.0625rem, 0.4vw + 0.98rem, 1.1875rem), 1.6): all running text, max 32 to 36rem per paragraph, 60ch inside FAQ answers. Section intros run at 1.125em in the band's supporting-text color.
- **Label** (600, 0.875rem, 1.2): plot labels, data terms, field help and errors; form field labels at 0.95rem. Sentence case, no tracking, never uppercase.

### Named Rules
**The No Small Print Rule.** Nothing a parent needs to read goes below 0.875rem; body never drops below 17px; form controls hold 1.0625rem.

**The Balanced Heading Rule.** Headings use text-wrap: balance and paragraphs text-wrap: pretty; headings are sentence case, inherit the band's color, and are never preceded by a kicker or eyebrow line.

## Layout

A 12-column grid inside a 1200px container with fluid gutters (clamp(16px, 4vw, 40px)). Sections breathe with tall vertical padding (clamp(88px, 11vw, 152px)); section headers cap at 40rem with a 20px internal gap and clamp(40px, 5vw, 64px) below. Text and fields split asymmetrically: 5 columns of copy against 7 of plots in spaces, 5 against 6 (offset to column 7) in confianza and FAQ, 5 against a 7-column form card in matrícula, 6 and 6 in vacaciones and talleres, 4 against an 8-column map in ubicación, a 7-column header against 5 columns of filter chips in galería. The hero is a single left column over the video, bottom-aligned on phones and vertically centered from 768px. Alternate rows mirror sides. In confianza and matrícula the copy column is sticky (top 7rem) on desktop.

Page rhythm alternates grounds: ink and video (portada), cream (espacios, programas), mustard band (vacaciones), cream (talleres), purple band (galería), turquoise band (confianza), cream (pasos), toasted cream (preguntas), steel-blue band (matrícula), cream (ubicación), ink (footer). Two vivid bands are not meant to sit adjacent; as built, galería runs straight into confianza (purple into turquoise), which is drift, not doctrine.

**Section edges, as shipped.** A shared `app-divisor` draws one shape on a 1440 × 100 canvas stretched to full width, clamp(36px, 6vw, 92px) tall, placed at the top of a section (bottom: 100%) so it overlaps the previous section, plus 1px against hairline seams. Its fill is currentColor, set to the section's own background. Shapes in use: ola (single wave) above espacios, galería (mirrored) and ubicación; olas (two waves, the back one at 45% sliding sideways over 22s) above vacaciones, confianza (mirrored) and matrícula; curva (one shallow arch) above talleres and preguntas; festones (twelve scallops) above pasos; colinas (two hill lines, the back one at 50%) above the footer. Programas follows espacios with no edge, both being cream. The mirror flag keeps the same shape from repeating identically in sequence.

Plot mosaics are their own 6-column sub-grids with fixed row counts, and every gap between plots is the furrow (clamp(8px, 1vw, 14px)), so fields always read as one cultivated surface. Program rows and steps also use the furrow as their gap. Lists inside bands (actividades, compromisos, talleres steps) are unboxed rows divided by 2px rules at 10 to 15% ink.

Responsive (Tailwind defaults: 640, 768, 1024, 1280): below 1280px the header collapses to a menu; below 1024px all two-sided rows stack, and in matrícula the info column dissolves (display: contents) so its parts reorder around the form: heading, form card, photo, after-sending steps, data, link; below 768px the hero veil turns bottom-up, the video pause button moves to the top right, steps go single-column, and the acequia is hidden; below 640px the month strip wraps to 6 columns and buttons go full width. The gallery grid runs 2 columns, 3 from 768px, 4 from 1024px.

**The acequia, as shipped.** An SVG overlay drawn from live layout via ResizeObserver: it springs at the bottom edge of the hero on a left-gutter rail 26px outside the content edge, runs down that rail, and stops at a node beside each section heading (data-acequia anchors). Water fills along the path with scroll (to 62% of the viewport) and nodes turn mustard as they are reached. It runs beside sections, not into plots.

## Elevation & Depth

Mostly flat, by color field. Plots and bands sit flush with no shadow; depth is suggested by the fine furrow texture (2px lines at 7% ink on a 15px repeat, angled 172deg or 8deg), by an offset plot (a furrowed coral plot shifted 16px right and down behind the FAQ photo), and by the translucent back layers of the olas and colinas edges. Shadows are soft, ink- or green-tinted and ambient, and appear only on things that float above the valley or open.

### Shadow Vocabulary
- **Open card** (`box-shadow: 0 18px 40px -22px rgb(19 34 43 / 0.35), 0 4px 10px -6px rgb(19 34 43 / 0.18)`): an opened FAQ item.
- **Form card** (`box-shadow: 0 30px 60px -30px rgb(19 34 43 / 0.55), 0 8px 18px -10px rgb(19 34 43 / 0.3)`): the cotton matrícula card lifted off the steel-blue band, and the 32px map card in ubicación.
- **Action glow** (`box-shadow: 0 10px 22px -12px rgb(31 122 77 / 0.7)`): primary WhatsApp buttons; `0 16px 28px -14px rgb(31 122 77 / 0.75)` on hover with a 2px lift.
- **Float glow** (`box-shadow: 0 14px 30px -12px rgb(31 122 77 / 0.65), 0 4px 10px -4px rgb(19 34 43 / 0.25)`): the floating WhatsApp button.
- **Label lift** (`box-shadow: 0 6px 14px -8px rgb(19 34 43 / 0.4)`): cotton labels on photo plots, the mustard badge hanging off the matrícula photo, the map zoom control.
- **Marker drop** (`box-shadow: 0 10px 18px -8px rgb(19 34 43 / 0.55)`): the coral map marker, with a coral ripple (0 to 18px, 2.4s, infinite).
- **Menu drop** (`box-shadow: 0 20px 30px -24px rgb(19 34 43 / 0.45)`): the open mobile menu panel.
- **Header hairline** (`box-shadow: 0 1px 0 rgb(19 34 43 / 0.08)`): the header once scrolled, over 90% cream glass with blur(14px) saturate(1.5).
- **Glass on video:** controls over the hero video and in the lightbox are translucent white (10 to 15%) with a 1.5px white inset ring and, on the hero, backdrop blur; no shadow.

### Named Rules
**The Flush Field Rule.** Plots and bands never cast shadows. If something needs separation from a field, it becomes cotton on the field, or another plot set behind it, not a lifted field.

## Shapes

Soft rectangles, all the same family. Plots, program rows, steps, the taller builder and the mochila aside use 22px; inner photos, FAQ items, form fields, option cards and notes use 14px; the matrícula form card uses 32px because it holds fields inside it. Everything you press or that labels something is a full pill (999px): buttons, toggle chips, plot labels, skill chips, month cells, numerals, icon discs, the floating button, the menu button. Lines are round-capped: the acequia, the hand-drawn headline underline. Section edges are the one place the outline turns organic: waves, a shallow arch, scallops and hills, always full-width and filled with the ground of the section below. The map marker is a coral teardrop (44px, three round corners and one sharp, rotated -45deg) holding a 16px cotton dot. Outlines appear as 1.5px inset rings (soft button, chips, option cards, fields) rather than borders; selection and focus thicken them to 2px. There are no blobs, clouds or free-floating organic silhouettes. Icons are 24px-grid line SVGs at 1.75 stroke, round caps, in currentColor.

## Components

### Buttons
Calm, rounded and unmistakably the one action.
- **Shape:** full pill (999px), min-height 52px, 10px gap between icon and text.
- **Primary:** WhatsApp Field Green with white text, Onest 600 at 1.0625rem, padding 14px 24px, WhatsApp mark leading.
- **States:** transitions only background-color, box-shadow, translate and scale, 200ms on the settle ease (cubic-bezier(0.16, 1, 0.3, 1)). Active shrinks to scale(0.97). Hover (deepen, 2px lift, wider glow) exists only under `(hover: hover) and (pointer: fine)` so touch screens never stick. Focus is the river ring.
- **Soft:** transparent with a 1.5px inset ring at 30% ink, ink text; hover fills cotton and strengthens the ring to 55%. Used for secondary in-page navigation on light grounds.
- **Light:** for ink grounds and video. White at 10% with a 1.5px inset ring of white at 60%, white text, small backdrop blur; hover fills cotton with ink text and drops the ring. The hero's secondary action.
- **Sizes:** header 44px (icon-only circle below 1280px); form submit 60px at 1.125rem, full width.
- **Arrow link:** ink 600 text with a trailing arrow that slides 4px right and an underline on fine-pointer hover; inherits white on dark bands.

### Chips
- **Skill chips** (program fields): static pills, padding 6px 12px, 0.92rem 500, white at 22% fill with a 1.5px inset ring of currentColor at 35%, so they read on both ink and white fields.
- **Toggle chips** (taller builder): buttons with aria-pressed, min-height 44px, padding 8px 16px, 0.98rem 600, white at 35% with a 1.5px ring at 22% ink; hover white at 60%; pressed fills Furrow Ink with white text, the icon swaps to a check. Active scale(0.97).
- **Filter chips** (galería, on purple): buttons with aria-pressed in a labeled group, min-height 44px, padding 8px 16px, 0.95rem 600 white on white at 10% with a 1.5px ring at 28% white, a photo count after the name; pressed fills Ripe Mustard with ink text and drops the ring. Active scale(0.96). Filtering runs through the View Transitions API (groups move over 450ms on the settle ease, old and new cross-fade in 260ms, the root never animates) and is announced in a polite live region.
- **Fact pills** (hero): three static pills under the actions, 0.875rem 600 ink, padding 6px 14px, in turquoise, mustard and coral in that order.

### Cards / Containers
- **Plot (parcela):** 22px radius, overflow clipped, default turquoise fill, either a full-bleed cover photo or a color field with content anchored to the bottom (14 to 20px padding). Optional furrow texture. Photos reveal by unscaling from 1.14.
- **Program field:** a full-width colored row (turquoise, mustard, purple in order), padding clamp(24px, 3.4vw, 44px), copy and a 14px-radius photo side by side, mirroring on even rows, furrow angle flipping to 8deg; photo eases to 1.04 on hover over 1.2s.
- **Step field:** colored plot (steel blue, mustard, coral) with a 48px cotton numeral in display 800 wrapped in a 6px halo of cotton at 35%; text color follows the Band and Its Ink Rule.
- **Option card** (radio): 14px radius, white at 35% with a 1.5px ring; checked becomes cotton with a 2px ink ring; the hidden radio's keyboard focus draws a 3px ink outline on the card.
- **Form card:** cotton, 32px radius, padding clamp(22px, 4vw, 48px), form-card shadow, resets supporting text to Soft Furrow Ink inside a dark band.
- **Gallery photo:** a plot-radius button on a dense 2/3/4-column grid (rows clamp(140px, 19vw, 240px), furrow gap); portrait photos span two rows, featured photos two by two from 768px. Title in 0.95rem 600 white over a bottom ink gradient (78% to clear); a cotton zoom disc appears on hover or focus; the photo eases to 1.05 over 700ms. It reveals by uncovering upward (clip-path inset 24% to 0, 1s) as it rises.
- **Photo with badge:** the matrícula photo plot carries a mustard pill badge with an icon, hanging off its lower right corner by 16px.
- **Commitment and activity lists:** unboxed rows, 2px top rule at 15% ink, a 36 to 40px cotton icon disc beside each title.

### Inputs / Fields
- **Style:** label above (0.95rem 600 ink, 8px gap), control min-height 52px, 14px radius, Warm Cream fill, 1.5px inset ring at 18% ink, 1.0625rem ink text, placeholder Soft Furrow Ink at 80%.
- **Focus:** fill turns cotton and the ring becomes a 2px River Water inset; no outline.
- **Error:** aria-invalid draws a 2px Error Red inset ring on a pale red fill; the message sits below in 0.875rem 600 Error Red with an alert icon, fading in from 4px above over 250ms.
- **Help / read-only:** help text 0.875rem Soft Furrow Ink; computed values (age) sit in a ringless Toasted Cream control.
- **Groups:** fieldsets open with a display 800 legend led by a 24px group indicator circle in turquoise, coral or mustard, which shows a 14px ink check once the group is valid.
- **Progress:** above the form, three segments (8px pill tracks at 10% ink), each filled in its group's color by scaling from the left (300ms) as fields become valid; each segment is a button that jumps to its group, labeled below in 600 with a deep turquoise check when complete, beside a live "n de N datos listos" count.

### Navigation
- **Header:** fixed, transparent with white text over the hero video, turning to cream glass with ink text after scroll or while the menu is open (300ms). Logo left (four rounded plots in turquoise, coral, mustard and purple crossed by a river line, plus the wordmark in display 800). Seven links from 1280px in Onest 500 at 0.98rem, inheriting the header's color at 85% opacity, rising to full with a 2px coral underline that grows from the left on hover.
- **Mobile (below 1280px):** 44px cotton menu button with a light inset ring; the menu drops as a cream panel with a clip-path wipe (500ms), full-width rows divided by hairlines, ending in a full WhatsApp button.

### Hero (Portada)
- Full-viewport section (min(100svh, 980px)) on Furrow Ink with a looping background video (poster frame first, preload none). It plays muted only when script confirms neither reduced motion nor Save-Data; otherwise the poster stays. The ink veil keeps the copy side legible. Content: white display headline with "paraíso" in mustard over a coral round-capped underline drawn in (1.4s after 0.6s), a 90% white intro, the primary and light buttons, then the fact pills. A 48px glass round button toggles pause and play with a spoken label; bottom right on desktop, top right on phones.

### Gallery Lightbox
- A native modal dialog over a 90% Furrow Ink backdrop: the photo at 22px radius up to 76svh, a white caption with category and an "n / N" count, and 48px glass round controls for close and previous/next (side edges, bottom on phones). Arrow keys page through the visible photos; Esc closes and returns focus. Opens with a 220ms fade and the photo scaling from 0.96 via @starting-style; the page behind stops scrolling.

### Map (Ubicación)
- A 32px-radius toasted-cream card with the form-card shadow holding a Leaflet map, imported only when needed, on OpenStreetMap tiles with scroll-wheel zoom off. The coral teardrop marker pulses; popups use the 14px radius and the open-card shadow; the zoom control is a 14px rounded pair with the label lift. The position is provisional (Plaza de Armas de Imperial) and labeled "(referencial)" in the address line beside the map.

### FAQ (Preguntas)
- Native details/summary on cotton, 14px radius, 20px 22px padding, summary in Onest 600 at 1.0625rem. A 32px coral disc with an ink plus rotates 45deg when open; the answer eases in from 6px above and the item gains the open-card shadow. The first item is open by default. Sits on the Toasted Cream band, beside a photo plot with a furrowed coral plot offset behind it.

### Month Strip (Vacaciones)
- Twelve pill cells, 44px tall, 6px gap (12 across from 640px, 6 below). Off-season months are ink at 8% with ink text at 70%; summer months are bold ink and fill with turquoise via a left-to-right clip-path wipe (700ms, staggered from 350ms) when the strip reveals.

### Floating WhatsApp
- 60px pill in WhatsApp Field Green with "¿Hablamos?", appearing after scroll (rises from 24px, scale 0.9, 600ms). A slow 2.8s green ripple pulses outward. Icon-only circle below 640px.

### Footer
- Furrow Ink under the colinas edge, white text: the logo, a 0.95rem intro at 75% white, a wrapped link row in 500 with underline on hover, and a 15% white hairline over the copyright and the note that photos and video are referential.

### The Acequia (signature)
- 3px River Water stroke over a 7px bed at 20% River Water, round caps, with a 1.5px white glint dashed 2 / 22 flowing along it every 2.4s, masked to the watered portion. Nodes: cream circles with a 3px River Water ring at 40%, becoming 8px-radius mustard circles with a full river ring once reached (600ms). Decorative and aria-hidden.

## Do's and Don'ts

### Do:
- **Do** build every new space or offer as a plot: 22px radius, on the module grid, furrow gap between neighbors.
- **Do** put Furrow Ink on turquoise, coral and mustard, and white on steel blue and purple; mark full-bleed bands as light or dark so supporting text follows.
- **Do** put cotton cards on bands when a section needs forms or dense reading, at 22px or 32px radius.
- **Do** keep the WhatsApp action in WhatsApp Field Green, pill-shaped, with the WhatsApp mark, and keep it reachable on every screen.
- **Do** keep hover effects inside `(hover: hover) and (pointer: fine)` and answer every press with a 200ms scale(0.97).
- **Do** keep body text at 17px or more with 1.6 line-height, and form controls at 52px and 1.0625rem.
- **Do** open each section that changes ground with an `app-divisor` filled in that section's own background, mirrored when the same shape came just before.
- **Do** use the light button and white glass controls on ink or video, and the soft button on cream.
- **Do** honor prefers-reduced-motion: reveals, water, sliding waves, headline blur, view transitions and wipes become still, and the hero video never autoplays.

### Don't:
- **Don't** return to pastel tints; fields are the saturated values in the palette, at full strength.
- **Don't** set white text on turquoise, coral or mustard, or ink text on steel blue or purple.
- **Don't** use Soft Furrow Ink on a vivid band; use the band's supporting-text color.
- **Don't** put WhatsApp green on anything that is not the WhatsApp action, or River Water on a fill.
- **Don't** add shadows to plots or bands, or use hard offset shadows; shadows are soft, ambient and only for floating, opened or carded elements.
- **Don't** use blob shapes, cartoon clouds, or rows of identical icon cards; fields differ in size and fill. Curved silhouettes live only on full-width section edges.
- **Don't** use pure black anywhere or solid pure white as a surface; the lightest surface is cotton. White appears only as text on dark fields, ink and green, as translucent fills and glass on bands and video, and as the acequia glint.
- **Don't** place a kicker or eyebrow line above a heading, and don't uppercase labels.
