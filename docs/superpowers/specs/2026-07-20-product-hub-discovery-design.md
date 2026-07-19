# Product Hub Discovery Optimization

## Objective

Improve `/products` so overseas B2B buyers can find the right thermal paper or label product faster. The primary success criterion is product browsing efficiency: buyers should be able to move from a broad use case or known specification to a relevant product detail page without reading the entire catalog.

The page must continue to support inquiry conversion, SEO, and GEO, but those goals are secondary to product discovery in this iteration.

## Audience And Buying Context

Primary users are distributors, importers, POS paper resellers, warehouse suppliers, retail chains, logistics operators, and OEM/private-label buyers.

The page must serve two common behaviors:

1. A newer buyer knows the operating environment, such as POS, logistics, banking, or cold chain, but does not know the exact material or product name.
2. An experienced buyer already knows the product family or specification and wants to reach a relevant detail page quickly.

## Scope

This iteration changes the `/products` aggregation page only.

Included:

- product-line routing for Thermal Paper Rolls and Thermal Labels;
- high-frequency application shortcuts;
- a lightweight, filterable product directory;
- compact product cards with procurement-relevant information;
- URL-synchronized filter state;
- empty, reset, keyboard, and mobile states;
- preservation of existing SEO metadata and structured data;
- desktop and mobile browser verification.

Excluded:

- product detail page redesigns;
- backend search or external search services;
- saved lists, accounts, comparison carts, or quote baskets;
- changes to product pricing, MOQ policy, or compliance claims;
- broad refactors of shared header, footer, or site-wide design tokens.

## Information Architecture

The page follows a progressive product-discovery sequence:

```text
Product-line entry
  -> High-frequency applications
    -> Filterable product directory
      -> Product detail or Request a Quote
```

### 1. Product-Line Entry

The hero keeps two clear routes:

- Thermal Paper Rolls
- Thermal Labels

Each route shows representative applications and specifications. The hero explains that final selection depends on use case, dimensions, printer fit, compliance files, packing, and destination.

### 2. Application Shortcuts

Immediately after the product-line entry, show four high-frequency shortcuts:

- POS & Receipts
- Shipping & Warehouse
- ATM & Banking
- Cold Chain & Food

Selecting a shortcut moves focus to the product directory and applies the matching use-case filter. These are shortcuts into the same product data, not separate marketing pages.

### 3. Filterable Product Directory

The directory supports three filter dimensions:

- Product line: Rolls or Labels
- Application: POS, shipping, warehouse, banking, ticketing, cold chain, retail, healthcare, and other values derived from the product catalog
- Procurement attribute: BPA-free, freezer-grade, permanent/removable adhesive, roll/fanfold, custom print, and OEM/private label where supported by product data

The initial state displays all products. Buyers never need to configure filters before seeing useful content.

### 4. Product Cards

Each product card contains:

- product name;
- product-family label;
- two or three representative applications;
- a concise key-specification summary;
- MOQ;
- a direct product-detail link.

Cards avoid long marketing paragraphs. Their purpose is comparison and routing.

### 5. Inquiry Continuity

The directory keeps a visible Request a Quote action near the result summary and at the end of the directory. On mobile, it remains in normal document flow so it does not compete with the WhatsApp button or cover product content.

## Interaction Design

### Filter Behavior

- Filters use segmented controls or checkbox-style buttons rather than a modal on desktop.
- Active controls expose `aria-pressed` or native checkbox state.
- Results update immediately without a network request.
- The result summary displays the current count and active filter labels.
- Each active filter can be removed individually.
- `Clear all` resets the directory to the full catalog.
- An empty result state explains that no products match and offers `Clear filters` and `Request a Quote` actions.

### URL State

Filter state is represented with readable query parameters:

```text
/products?line=labels&use=shipping&feature=freezer
```

The page reads supported parameters on load, ignores unknown values, and updates the URL without a full navigation. Back/forward navigation and refresh restore the visible filter state.

The canonical URL remains `/products` to prevent filter combinations from becoming duplicate indexed pages.

### Mobile Behavior

- The product-line cards remain visible before filtering.
- A `Filter products` control opens a compact filter panel.
- The result count and active-filter summary stay visible above the product list.
- Product cards use a single-column layout.
- Interactive controls have at least a 44px touch target.
- Content includes sufficient bottom/right clearance for the existing WhatsApp control.

## Visual Direction

The page continues the existing Paperworks Premium system:

- deep ink green for navigation and high-confidence actions;
- warm paper white for the catalog surface;
- restrained teal for selected filters and product links;
- muted gold for the primary quote action;
- existing display and body fonts;
- square or lightly rounded industrial surfaces, thin borders, and minimal shadows.

The signature element is the active filter/result rail. It behaves like a procurement context bar, showing what the buyer is currently viewing and how many products match. It is functional, not decorative.

The design avoids decorative cards, excessive badges, gradients, and animation. Motion is limited to small hover/focus transitions and respects reduced-motion preferences.

## Component Architecture

### Server Page

`src/app/products/page.tsx` remains a server component and owns:

- metadata and canonical configuration;
- breadcrumb, ItemList, FAQ, and CollectionPage JSON-LD;
- static hero and explanatory sections;
- normalization of product data into a serializable explorer model.

### Product Explorer

A focused client component owns:

- filter controls;
- query-parameter synchronization;
- filtered result computation;
- result summary;
- empty/reset states;
- mobile filter-panel state.

The component receives only serializable fields required for filtering and rendering. It does not fetch product data and does not duplicate catalog records.

### Data Model

The explorer model is derived from `THERMAL_PAPER_ROLLS` and `THERMAL_LABELS` in `src/lib/data.ts`. A normalized item contains:

```ts
type ProductExplorerItem = {
  name: string;
  href: string;
  line: "rolls" | "labels";
  applications: string[];
  specifications: string[];
  features: string[];
  moq: string;
};
```

Filter values are derived from or explicitly mapped to real product fields. A filter must not imply a capability absent from the product source data.

## SEO And GEO Preservation

- Metadata, canonical URL, heading hierarchy, breadcrumbs, FAQs, and structured data remain server-rendered.
- The unfiltered product directory remains present in the server output so crawlers and AI systems can identify every product entity without interacting with filters.
- Product cards use explicit names, applications, specifications, and destination URLs rather than ambiguous labels.
- The ItemList schema continues to describe the complete catalog, independent of the visible client-side filter state.
- Query combinations do not receive separate canonical URLs or dynamically generated SEO claims.

## Accessibility

- Controls are keyboard reachable and have visible focus states.
- Selected state is conveyed semantically and visually, not by color alone.
- The result count uses an appropriate live region with non-disruptive announcements.
- The mobile filter panel has a clear accessible name, close action, and focus behavior.
- Headings preserve a logical hierarchy.
- Touch targets meet the 44px minimum.
- Reduced-motion preferences disable nonessential transitions.

## Performance

- The page remains mostly server-rendered.
- Only the explorer interaction boundary is client-side.
- Product data is passed once in a compact serializable form.
- Filtering is local and requires no API request.
- Images continue to use the existing Next.js image and slot system.
- No new UI library or search dependency is introduced.

## Empty And Error States

The explorer has no remote-data failure mode. Unsupported URL parameters are ignored. If no products match valid filters, the page displays:

- `No products match these filters.`
- a `Clear filters` action;
- a `Request a Quote` fallback for custom requirements.

If a product lacks an optional feature or specification field, the card omits that field rather than rendering an empty label.

## Verification And Acceptance Criteria

The implementation is accepted when:

1. All products are visible with no filters selected.
2. Product-line, application, and procurement-attribute filters return the expected products.
3. Multiple active filters combine predictably and can be removed individually.
4. Query parameters restore state after refresh and support browser back/forward navigation.
5. Unknown query values do not break or empty the directory unexpectedly.
6. The empty state provides both reset and quote actions.
7. Product detail links and quote links navigate correctly.
8. The page has no horizontal overflow at 1440px and an iPhone-sized viewport.
9. The mobile filter panel is keyboard accessible and does not sit behind the site header.
10. The WhatsApp control does not obscure directory controls or product-card actions.
11. Browser console output contains no new errors or warnings caused by the explorer.
12. `npm run build` completes successfully.
13. Existing metadata, canonical URL, JSON-LD, and server-rendered catalog content remain present.

