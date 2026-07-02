import StaffLayoutClient from "@/components/layout/staff/StaffLayoutClient";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StaffLayoutClient>{children}</StaffLayoutClient>;
}
