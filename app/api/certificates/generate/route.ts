import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCurrentStudent } from "@/lib/get-current-student";
import { getCourseProgress } from "@/lib/gamification";
import { generateCertificatePdf } from "@/lib/certificates";
import { COURSE_META } from "@/lib/data/course-content";
import { BRAND } from "@/lib/brand";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const student = await getCurrentStudent();
  const courseProgress = getCourseProgress(student);

  const isPreview =
    new URL(req.url).searchParams.get("preview") === "true" &&
    (session.user.role === "ADMIN" || session.user.role === "INSTRUCTOR");

  if (courseProgress.percent < 100 && !isPreview) {
    return NextResponse.json(
      { error: "Todavía no completaste el 100% de la formación." },
      { status: 403 }
    );
  }

  const idFragment = student.id.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toUpperCase();
  const verifyCode = `BA-${idFragment}-${new Date().getFullYear()}`;

  const pdfBytes = await generateCertificatePdf({
    studentName: student.name,
    courseTitle: COURSE_META.title,
    verifyCode,
    issuedAt: new Date(),
  });

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="certificado-${BRAND.certificateFileSlug}.pdf"`,
    },
  });
}
