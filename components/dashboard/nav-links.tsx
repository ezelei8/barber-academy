import {
  Home,
  BookOpen,
  ClipboardList,
  Target,
  Trophy,
  Bot,
  TrendingUp,
  User,
} from "lucide-react";

export const DASHBOARD_NAV: {
  href: string;
  label: string;
  icon: typeof Home;
  exact?: boolean;
}[] = [
  { href: "/dashboard", label: "Inicio", icon: Home, exact: true },
  { href: "/dashboard/curso", label: "Mi curso", icon: BookOpen },
  { href: "/dashboard/tareas", label: "Mis tareas", icon: ClipboardList },
  { href: "/dashboard/misiones", label: "Misiones", icon: Target },
  { href: "/dashboard/logros", label: "Logros", icon: Trophy },
  { href: "/dashboard/barber-ai", label: "Barber AI", icon: Bot },
  { href: "/dashboard/progreso", label: "Mi progreso", icon: TrendingUp },
  { href: "/dashboard/perfil", label: "Perfil", icon: User },
];

// The 5 most-used destinations, for the one-handed mobile bottom nav.
export const MOBILE_PRIMARY_NAV = [
  DASHBOARD_NAV[0], // Inicio
  DASHBOARD_NAV[1], // Mi curso
  DASHBOARD_NAV[2], // Mis tareas
  DASHBOARD_NAV[5], // Barber AI
  DASHBOARD_NAV[7], // Perfil
];
