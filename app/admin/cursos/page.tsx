import type { Metadata } from "next";
import { Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COURSE_META, MODULES } from "@/lib/data/course-content";
import { AdminSaveBar } from "@/components/admin/save-bar";

export const metadata: Metadata = { title: "Cursos" };

export default function AdminCursosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Cursos</h1>
        <p className="mt-1 text-sm text-bone-500">
          {MODULES.length} módulos publicados dentro de este curso.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <div>
            <Label htmlFor="title">Título del curso</Label>
            <Input id="title" defaultValue={COURSE_META.title} />
          </div>
          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input id="slug" defaultValue={COURSE_META.slug} />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" rows={4} defaultValue={COURSE_META.description} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="price">Precio (USD)</Label>
              <Input id="price" type="number" defaultValue={149} />
            </div>
            <div>
              <Label htmlFor="status">Estado</Label>
              <Input id="status" defaultValue="Publicado" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-carbon-800 text-gold-400">
            <Award className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-bone-100">Certificado de finalización</p>
            <p className="text-xs text-bone-500">Previsualizá el diseño del PDF sin necesidad de completar el curso.</p>
          </div>
          <Button href="/api/certificates/generate?preview=true" variant="secondary" size="sm">
            Previsualizar
          </Button>
        </CardContent>
      </Card>

      <AdminSaveBar entity="curso" />
    </div>
  );
}
