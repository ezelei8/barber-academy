import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { paymentProvider } from "@/lib/payments";
import { COURSE_META } from "@/lib/data/course-content";

/**
 * Would kick off a real checkout once a provider is connected (see
 * lib/payments.ts). Until then it responds honestly instead of pretending
 * to charge anything.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  if (!paymentProvider.isConfigured) {
    return NextResponse.json(
      {
        error:
          "El sistema de pagos todavía no está conectado a un proveedor real. " +
          "La arquitectura está lista (ver lib/payments.ts) pero falta configurar STRIPE_SECRET_KEY " +
          "u otro proveedor equivalente en el servidor.",
      },
      { status: 501 }
    );
  }

  const origin = new URL(req.url).origin;
  const result = await paymentProvider.createCheckoutSession({
    userId: session.user.id,
    userEmail: session.user.email ?? "",
    courseId: COURSE_META.id,
    priceCents: 14900,
    currency: "USD",
    successUrl: `${origin}/dashboard?payment=success`,
    cancelUrl: `${origin}/precios?payment=cancelled`,
  });

  return NextResponse.json(result);
}
