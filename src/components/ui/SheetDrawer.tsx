import { ReactNode } from "react";

export default function SheetDrawer({
  open, onClose, children, side = "right",
}: { open: boolean; onClose: () => void; children: ReactNode; side?: "right" | "left" | "top" | "bottom" }) {
  if (!open) return null;
  const sideCls = {
    right: "right-0 inset-y-0 w-11/12 max-w-sm",
    left: "left-0 inset-y-0 w-11/12 max-w-sm",
    top: "top-0 inset-x-0 h-1/2",
    bottom: "bottom-0 inset-x-0 h-1/2",
  }[side];
  const enter =
    side === "right" ? "animate-in slide-in-from-right" :
    side === "left"  ? "animate-in slide-in-from-left"  :
    side === "top"   ? "animate-in slide-in-from-top"   :
                       "animate-in slide-in-from-bottom";

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`absolute bg-white shadow-xl ${sideCls} ${enter} p-4 flex flex-col gap-4`}>
        {children}
      </div>
    </div>
  );
}
