import { ReactNode } from "react";

export default function ScrollArea({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={`overflow-y-auto ${className ?? ""}`}>{children}</div>;
}
