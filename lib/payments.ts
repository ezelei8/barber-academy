/**
 * ============================================================================
 * PAYMENTS — provider-agnostic architecture, NOT connected to a real gateway
 * ============================================================================
 * The platform is built to sell one course with a single price, so this
 * interface is intentionally small. It defines the two operations every
 * provider needs to support; nothing here fabricates a working checkout.
 *
 * TO CONNECT STRIPE (recommended path):
 *   1. npm install stripe
 *   2. Add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET to the server env.
 *   3. Implement `StripePaymentProvider` below (createCheckoutSession using
 *      stripe.checkout.sessions.create, verifyWebhookSignature using
 *      stripe.webhooks.constructEvent).
 *   4. Point PAYMENT_PROVIDER=stripe and swap the export at the bottom.
 *
 * TO CONNECT MERCADO PAGO:
 *   Same shape — mercadopago's SDK exposes an equivalent Preference/webhook
 *   API. Implement `MercadoPagoPaymentProvider` the same way.
 *
 * What happens after a confirmed payment (already wired end-to-end once a
 * provider is connected — see app/api/payments/webhook/route.ts):
 *   1. Verify the webhook signature.
 *   2. Look up / create the User by email.
 *   3. prisma.payment.create({ ..., status: "PAID" })
 *   4. prisma.enrollment.upsert({ ..., status: "ACTIVE" })
 *   5. Insert a Notification ("Ya tenés acceso a tu curso").
 *
 * CURRENT CHOICE: for now, payment is handled manually outside the platform
 * (bank transfer, cash, WhatsApp, etc.) — see lib/auth-users.ts
 * (`enrollmentStatus`), app/admin/alumnos/page.tsx (the admin approves by
 * hand) and components/dashboard/pending-payment-screen.tsx (what a student
 * sees while unpaid). This file's interface is the automated upgrade path
 * for later, if/when a real gateway gets connected — it doesn't need to be
 * touched to keep using the manual flow.
 * ============================================================================
 */

export interface CheckoutSessionInput {
  userId: string;
  userEmail: string;
  courseId: string;
  priceCents: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionResult {
  checkoutUrl: string;
  providerRef: string;
}

export interface PaymentProvider {
  readonly name: string;
  readonly isConfigured: boolean;
  createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSessionResult>;
  verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean;
}

/**
 * Default provider while no real gateway is connected. It never claims to
 * charge a card — every call fails loudly and explains what's missing,
 * instead of returning a fake success.
 */
class NotConfiguredPaymentProvider implements PaymentProvider {
  readonly name = "none";
  readonly isConfigured = false;

  async createCheckoutSession(): Promise<CheckoutSessionResult> {
    throw new Error(
      "Ningún proveedor de pago está configurado. Definí STRIPE_SECRET_KEY (u otro proveedor) " +
        "en las variables de entorno del servidor e implementá el provider correspondiente en lib/payments.ts."
    );
  }

  verifyWebhookSignature(): boolean {
    return false;
  }
}

export const paymentProvider: PaymentProvider = new NotConfiguredPaymentProvider();
