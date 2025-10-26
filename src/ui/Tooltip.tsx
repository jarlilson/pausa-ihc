import { ReactNode } from "react";

export default function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="relative group inline-flex items-center" aria-label={label} title={label}>
      {children}
    </span>
  );
}
