import { useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  onClose,
}: { message: string; type?: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const id = setTimeout(onClose, 1800);
    return () => clearTimeout(id);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] px-4 py-2 rounded-md shadow-md text-sm ${
        type === "success" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
      }`}
    >
      {type === "success" ? "✨ " : "⚠️ "} {message}
    </div>
  );
}
