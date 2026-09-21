/**
 * BRAND CONFIG — el único archivo que hay que tocar para "rebrandear" un
 * clon de esta plataforma para un cliente nuevo (Fase 1 del plan de
 * reventa: una instancia por cliente).
 *
 * Qué NO vive acá:
 * - Los colores: son tokens CSS en `app/globals.css` (bloque `:root` al
 *   principio del archivo). Cambiás esos valores hex una vez y se propagan
 *   a toda la app, porque cada componente usa los NOMBRES de los tokens
 *   (gold-500, carbon-950, etc.), nunca un color suelto.
 * - El contenido del curso (módulos, lecciones, tareas): vive en
 *   `lib/data/course-content.ts`.
 * - Los valores de XP, niveles, misiones y logros: viven en
 *   `lib/data/gamification-config.ts`.
 * - Los secretos (base de datos, claves de API, pagos): van en `.env.local`,
 *   nunca en este archivo ni en ningún archivo versionado.
 */

export const BRAND = {
  /** Nombre completo de la marca, tal como aparece en metadata y footer. */
  name: "Barber Academy",

  /**
   * El wordmark del header/sidebar se arma en dos partes con distinto color
   * (la segunda en dorado). Si el nombre de marca no se presta a ese split,
   * dejá `accent` vacío y los componentes van a mostrar solo `primary`.
   */
  logoText: {
    primary: "BARBER",
    accent: "ACADEMY",
  },

  /** Título largo para el <title> de las páginas públicas. */
  metaTitle: "Barber Academy — Aprendé barbería online, con método",

  /** Template para páginas internas: "%s — <nombre>". */
  metaTitleTemplate: "%s — Barber Academy",

  /** Meta description por defecto (SEO / compartir en redes). */
  metaDescription:
    "Academia online de barbería con formación estructurada en 8 módulos, práctica evaluada, gamificación y Barber AI, tu tutor de inteligencia artificial.",

  /** Texto que va al pie del certificado PDF generado por lib/certificates.ts */
  certificateFooterText: "BARBER ACADEMY",

  /** Prefijo del nombre de archivo del certificado descargado. */
  certificateFileSlug: "barber-academy",

  /** Texto del footer público. */
  footerTagline:
    "Formación online estructurada en barbería, con práctica evaluada y un tutor de IA especializado.",

  /** Nombre del asistente de IA dentro de la plataforma. */
  aiAssistantName: "Barber AI",

  /** URL pública del sitio (usada como fallback de metadataBase). */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /**
   * El pago se coordina POR FUERA de la plataforma (no hay pasarela de pago
   * conectada): el alumno se registra, y estos son los medios por los que
   * arma el pago con vos antes de que apruebes su acceso desde el panel
   * admin. Completá al menos uno; dejalos vacíos ("") para ocultarlos.
   */
  contactWhatsapp: "", // formato: "+598 99 123 456" (con o sin espacios/guiones)
  contactEmail: "",
} as const;

/**
 * Arma el link de wa.me a partir de BRAND.contactWhatsapp. Devuelve null si
 * todavía no se cargó un número, para que la UI pueda ocultar el botón en
 * vez de mostrar un link roto.
 */
export function whatsappLink(message?: string): string | null {
  const digits = BRAND.contactWhatsapp.replace(/[^0-9]/g, "");
  if (!digits) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}
