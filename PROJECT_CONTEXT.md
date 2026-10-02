# Aidcom project reference

## Official contact details

Confirmed by Bruno from Aidcom's contact information screenshot on 2026-10-02.

- Office telephone: `+54 11 4966-2431`
- WhatsApp: `+54 9 11 4998-8089`

Use only these values for Aidcom's public contact information and contact buttons. Any other Aidcom phone or WhatsApp destinations on the site are incorrect. Keep each number assigned to its matching method.

## Code rule

Keep the official values centralized in `lib/contact-info.ts` under `AIDCOM_CONTACT`. Build WhatsApp links with `createWhatsAppUrl(message)`; do not hard-code either phone number in pages or components. The formatted values in this file are the single source of truth, and link digits should be derived from them.
