const phoneDisplay = "+54 11 4966-2431";
const whatsappDisplay = "+54 9 11 4998-8089";
const phoneDigits = phoneDisplay.replace(/\D/g, "");
const whatsappDigits = whatsappDisplay.replace(/\D/g, "");

export const AIDCOM_CONTACT = {
  phoneDisplay,
  phoneHref: `tel:+${phoneDigits}`,
  whatsappDisplay,
  whatsappHref: `https://wa.me/${whatsappDigits}`,
} as const;

export function createWhatsAppUrl(message?: string): string {
  if (!message) return AIDCOM_CONTACT.whatsappHref;

  return `${AIDCOM_CONTACT.whatsappHref}?text=${encodeURIComponent(message)}`;
}
