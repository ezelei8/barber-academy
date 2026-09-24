import { NextResponse } from "next/server";
import { paymentProvider } from "@/lib/payments";

/**
 * Webhook endpoint the payment provider will call on payment confirmation.
 * Point this at Stripe/Mercado Pago's dashboard once connected:
 *   POST https://<your-domain>/api/payments/webhook
 *
 * PROD implementation once a provider is connected:
 *   1. const signature = req.headers.get("stripe-signature") (or equivalent)
 *   2. const rawBody = await req.text()
 *   3. if (!paymentProvider.verifyWebhookSignature(rawBody, signature)) return 400
 *   4. Parse the event; on a successful payment:
 *      await prisma.$transaction([
 *        prisma.payment.update({ where: { providerRef }, data: { status: "PAID" } }),
 *        prisma.enrollment.upsert({ where: { userId_courseId: {...} }, ... }),
 *        prisma.notification.create({ data: { userId, type: "SYSTEM", title: "Pago confirmado" } }),
 *      ])
 */
export async function POST(req: Request) {
  if (!paymentProvider.isConfigured) {
    console.warn("[payments/webhook] received an event but no payment provider is configured.");
    return NextResponse.json(
      { error: "Payment provider not configured on this server." },
      { status: 501 }
    );
  }

  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature") ?? req.headers.get("x-signature");

  if (!paymentProvider.verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  // TODO once connected: parse rawBody as the provider's event type and
  // activate the corresponding Enrollment + Payment rows.
  return NextResponse.json({ received: true });
}
