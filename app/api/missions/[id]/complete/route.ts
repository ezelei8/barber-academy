import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { completeMission } from "@/lib/store";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const { id } = await params;
  const result = completeMission(id);
  return NextResponse.json(result);
}
