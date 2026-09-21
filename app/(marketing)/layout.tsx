import { MarketingNavbar } from "@/components/landing/navbar";
import { MarketingFooter } from "@/components/landing/footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </>
  );
}
