# About Us Reference Replication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapt `/about` to the supplied About 7 reference page's blue, image-led company-profile structure while keeping Zhixin Paper's verified content and existing inquiry destinations.

**Architecture:** Keep the existing site Header, Footer, metadata, structured data, and `CTABanner` contracts. Replace the page body with a reference-shaped sequence: hero, logo rail, company profile, vision/mission, evidence-based milestones, operating reasons, history timeline, production capability, buyer resources, and final quote CTA. Use static site assets for deterministic rendering and keep all sections semantic and responsive.

**Tech Stack:** Next.js App Router, React Server Components, Tailwind utility classes, lucide-react icons, Node test runner.

---

### Task 1: Lock the reference-shaped contract with a failing test

**Files:**
- Create: `tests/about-reference.contract.test.mjs`

- [ ] **Step 1: Add assertions for the required section labels, real CTA routes, and removal of placeholder claims.**
- [ ] **Step 2: Run `node --test tests/about-reference.contract.test.mjs` and confirm it fails against the current page.

### Task 2: Implement the About page structure and content

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Replace the current dark editorial body with the reference-shaped blue/white layout.
- [ ] **Step 2: Map verified company history, factory capability, and procurement language into each section.
- [ ] **Step 3: Preserve `/quote`, `/samples`, `/factory`, and `/factory/quality-control` destinations and JSON-LD.

### Task 3: Verify source, build, and rendered responsive behavior

**Files:**
- No committed files

- [ ] **Step 1: Run the focused contract test, typecheck, lint, and production build.
- [ ] **Step 2: Start a local Next.js server, capture `/about` at desktop and mobile sizes, and check title, meaningful content, CTA links, and console output.
- [ ] **Step 3: Compare screenshots against the reference screenshot and fix visible overflow, contrast, or spacing mismatches.
