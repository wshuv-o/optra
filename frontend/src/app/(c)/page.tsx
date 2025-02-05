import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | Optra - Next.js Dashboard Template",
  description: "This is Next.js Home for Optra Dashboard Template",
};

export default function Home() {
  return (
        <ECommerce />
  );
}
