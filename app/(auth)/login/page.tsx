"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      setError("Email o contraseña incorrectos.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Iniciar sesión</CardTitle>
        <CardDescription>Entrá a tu dashboard y continuá tu formación.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button type="submit" disabled={loading} className="mt-1 w-full">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Iniciar sesión
          </Button>
        </form>

        <div className="mt-5 flex gap-2.5 rounded-xl border border-info/20 bg-info/5 p-3.5">
          <Info className="h-4 w-4 flex-none text-info" />
          <p className="text-xs leading-relaxed text-bone-400">
            Cuentas demo: <strong className="text-bone-200">alumno@demo.com</strong> /{" "}
            <strong className="text-bone-200">alumno123</strong> (alumno) ·{" "}
            <strong className="text-bone-200">admin@demo.com</strong> /{" "}
            <strong className="text-bone-200">admin123</strong> (instructor/admin)
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-bone-500">
          ¿No tenés cuenta?{" "}
          <Link href="/register" className="font-medium text-gold-400 hover:underline">
            Creá una gratis
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={null}>
      <LoginForm />
    </React.Suspense>
  );
}
