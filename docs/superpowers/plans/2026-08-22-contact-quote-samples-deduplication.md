# Contact, Quote, and Samples Deduplication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development and superpowers:verification-before-completion task-by-task.

**Goal:** Turn three overlapping inquiry pages into a clear contact hub, a procurement RFQ, and a sample qualification flow.

**Architecture:** Keep the existing quote and sample APIs intact. Replace the generic Contact form with direct-contact and routing choices, preserve the detailed Quote form as the only commercial RFQ, and retain Samples as a separate fulfillment and evaluation request. Use shared route language and consistent visual hierarchy without introducing a new cross-page state layer.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Lucide icons, Node contract tests, Playwright CLI.

---

### Task 1: Lock page ownership in a contract test

**Files:**
- Create: `tests/inquiry-page-ownership.contract.test.mjs`

- [ ] Assert Contact routes to Quote and Samples, offers direct contact, and no longer posts a generic sales form.
- [ ] Assert Quote remains the only detailed RFQ and posts to `/api/quote`.
- [ ] Assert Samples remains an evaluation and shipping request that posts to `/api/samples`.
- [ ] Run the contract test and confirm it fails against the overlapping implementation.

### Task 2: Rebuild Contact as the routing and support hub

**Files:**
- Modify: `src/app/contact/ContactClient.tsx`

- [ ] Remove generic form state and `/api/contact` submission UI from this page.
- [ ] Add a clear Contact hero, three inquiry routes, and direct Email / WhatsApp / Phone / address information.
- [ ] Add procurement guidance explaining when to use Quote versus Samples.
- [ ] Preserve Header, Footer, metadata ownership, and accessible links.

### Task 3: Clarify Quote as the commercial RFQ

**Files:**
- Modify: `src/app/quote/page.tsx`
- Modify only if required: `src/app/quote/QuoteForm.tsx`

- [ ] Remove redundant generic-contact language and keep one primary `Start your RFQ` action.
- [ ] Explain the minimum inputs required for pricing and link general questions back to Contact.
- [ ] Preserve `/api/quote`, existing required fields, success state, and product-selection behavior.

### Task 4: Clarify Samples as product evaluation

**Files:**
- Modify: `src/app/samples/SamplesClient.tsx`

- [ ] Present product evaluation, printer/application fit, and shipping confirmation as the purpose of the page.
- [ ] Keep sample product selection and shipping address fields.
- [ ] State that availability, charges, and courier terms are confirmed after review.
- [ ] Link bulk pricing requests to Quote and general questions to Contact.

### Task 5: Verify routes and responsive behavior

**Files:**
- Test: `tests/inquiry-page-ownership.contract.test.mjs`

- [ ] Run the contract test and existing inquiry delivery tests.
- [ ] Run ESLint and the production build.
- [ ] Verify `/contact`, `/quote`, and `/samples` at desktop and mobile widths.
- [ ] Confirm form endpoints, required fields, route links, no horizontal overflow, and zero browser console errors.
