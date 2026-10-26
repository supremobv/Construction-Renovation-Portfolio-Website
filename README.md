# FORMA — Construction & Renovation Portfolio

Responsive Vinext/React portfolio with category filters, six project details, accessible before/after range control, services accordions, testimonial carousel, quotation form, and database-backed studio CMS at `/admin`.

## Development

Run `npm run dev`. On this Windows machine the workspace contains an ampersand; the `R:` substitution points to this project and avoids npm lifecycle quoting errors. Run commands from `R:/`.

## Data

D1 stores CMS content and quotation requests. Schema is in `db/schema.ts`. Generated Drizzle migrations are applied by Sites at publication. Local data is separate. All successful submissions persist; no email delivery is configured. The inbox supports request statuses and JSON export.

## Authentication

The deployed site is owner-private, enforced by Sites. Admin pages and APIs additionally require ChatGPT identity. This owner-only platform boundary is part of authorization: before changing the audience, add an explicit server-side administrator allowlist to CMS and quotation inbox endpoints. Do not make this version public with the current admin authorization model.

## Content and imagery

FORMA is an illustrative studio brand. Portfolio projects, measurements, locations, and testimonials are sample content. Replace with verified company information. Pexels photo sources and photographers are recorded on `/credits`. Comparison photographs show different spaces and are labeled as illustrative; replace with matched before-and-after photography. External image URLs are editable in the CMS. All edits persist in D1. CMS saves are validated server-side.
