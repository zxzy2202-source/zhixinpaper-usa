# International Tender Procurement Positioning Implementation Plan
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the public site clearly useful to international tender and project-procurement teams while improving the RFQ information collected for project-driven orders.

**Architecture:** Keep the existing product taxonomy, quote API, database schema, and routes. Add a focused project-procurement signal to the homepage and quote page, then pass tender stage and target date through the existing notification/message path so no migration is required.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, Node test runner.

---

### Task 1: Add a regression contract for tender positioning

**Files:**
- Create: `tests/tender-procurement-positioning.test.mjs`

- [ ] **Step 1: Write the failing test**

Assert the homepage exposes the project/tender audience, the quote page explains project RFQ intake, the form has tender-stage and required-by fields, and the API forwards both values to notification details.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/tender-procurement-positioning.test.mjs`

Expected: FAIL because the new project-procurement copy and fields do not exist yet.

### Task 2: Implement project procurement messaging and qualification fields

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/quote/page.tsx`
- Modify: `src/app/quote/QuoteForm.tsx`
- Modify: `src/app/api/quote/route.ts`

- [ ] **Step 1: Add a homepage project-procurement section and sharpen hero language**

Use evidence-safe language such as “international tender and project procurement teams,” “bid specification,” “destination,” “document scope,” and “sample approval.” Keep the primary CTA `/quote`.

- [ ] **Step 2: Add tender-stage and required-by controls to the quote form**

Add optional fields with explicit labels and values that help sales qualify a live bid without making the form falsely claim guaranteed lead times.

- [ ] **Step 3: Forward the new values through the existing quote notification**

Read both fields from the request body and include them in `notifyAll` details and the confirmation email summary. Do not change the database schema.

- [ ] **Step 4: Run the regression test to verify it passes**

Run: `node --test tests/tender-procurement-positioning.test.mjs`

Expected: PASS.

### Task 3: Verify the application

- [ ] **Step 1: Run focused type and lint checks**

Run: `npm.cmd run typecheck` and `npm.cmd run lint`.

- [ ] **Step 2: Run the production build**

Run: `npm.cmd run build`.

- [ ] **Step 3: Run the focused and existing quote/inquiry tests**

Run: `node --test tests/tender-procurement-positioning.test.mjs tests/inquiry-delivery.test.ts`.
