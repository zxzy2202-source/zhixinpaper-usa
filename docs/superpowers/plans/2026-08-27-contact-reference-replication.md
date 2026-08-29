# Contact Reference Replication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/contact` with the visible structure and bright-blue visual language of the supplied Contact Us 5 reference while keeping Zhixin Paper facts and distinct quote/sample ownership.

**Architecture:** Keep the page shell and static sections in the server-rendered `ContactClient.tsx`. Isolate the only interactive general-contact form in a small `QuickContactForm.tsx` client component that submits the existing `/api/contact` contract. Use local optimized images, existing Header/Footer, and route-local Tailwind styles.

**Tech Stack:** Next.js 16 App Router, React 18, TypeScript, Tailwind CSS 4, next/image, lucide-react, Node test runner, Playwright CLI.

---

### Task 1: Lock the reference-derived page contract

**Files:**
- Modify: `tests/inquiry-page-ownership.contract.test.mjs`

- [ ] Add assertions for the hero, blue brand rail, support/form split, direct contact strip, trust reasons, sales routing, support network, one `/api/contact` form, and preserved `/quote` and `/samples` routes.
- [ ] Run `node --test tests/inquiry-page-ownership.contract.test.mjs` and confirm the Contact test fails because the new reference modules do not exist.

### Task 2: Add the reference hero asset

**Files:**
- Create: `public/images/contact/contact-hero.jpg`

- [ ] Download the public reference hero bitmap only; do not copy its logo, footer, placeholder people, or social branding.
- [ ] Verify the file is a valid 1920x508 JPEG and render it through `next/image` with a meaningful Zhixin Paper alt.

### Task 3: Build the single general-contact form

**Files:**
- Create: `src/app/contact/QuickContactForm.tsx`

- [ ] Implement labeled first name, last name, business email, optional company, and message controls.
- [ ] Submit exactly the existing `/api/contact` payload and provide loading, success, failure, and direct-email fallback states.
- [ ] Keep commercial specification and sample qualification out of this form.

### Task 4: Rebuild the Contact page

**Files:**
- Modify: `src/app/contact/ContactClient.tsx`

- [ ] Implement the shallow reference hero, blue repeated-brand rail, `Get support from Zhixin Paper` split section, quick-route band, four direct contact methods, four evidence-safe support reasons, sales routing, and six support-network links.
- [ ] Preserve actual company phone, email, WhatsApp, address, and existing `/quote` and `/samples` ownership.
- [ ] Keep one H1, sequential H2/H3 hierarchy, visible focus states, and no fabricated response time, certification, testimonial, or salesperson identity.

### Task 5: Verify behavior and responsive rendering

**Files:**
- Verify: `src/app/contact/ContactClient.tsx`
- Verify: `src/app/contact/QuickContactForm.tsx`
- Verify: `tests/inquiry-page-ownership.contract.test.mjs`

- [ ] Run the focused contract test and confirm it passes.
- [ ] Run `npm run typecheck`, focused ESLint, `npm test`, and `npm run build`.
- [ ] Use Playwright at 320, 768, 1024, and 1440 widths; confirm one form, zero horizontal overflow, visible hero image, working `/quote` and `/samples` links, accessible form labels, and zero final console errors.
- [ ] Restart or verify `http://localhost:3013/contact` and open the final page in the Codex browser.
