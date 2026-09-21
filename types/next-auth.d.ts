import type { EnrollmentStatus, Role } from "@/lib/types";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      enrollmentStatus: EnrollmentStatus;
    } & DefaultSessionUser;
  }

  interface User {
    role?: Role;
    enrollmentStatus?: EnrollmentStatus;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
    enrollmentStatus?: EnrollmentStatus;
  }
}

type DefaultSessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};
