export default function Switch({
  checked, onChange, ariaLabel,
}: { checked: boolean; onChange: (v: boolean) => void; ariaLabel?: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`inline-flex h-5 w-9 items-center rounded-full transition ${checked ? "bg-teal-600" : "bg-gray-300"}`}
    >
      <span className={`h-4 w-4 bg-white rounded-full transition-transform translate-x-[2px] ${checked ? "translate-x-[18px]" : ""}`} />
    </button>
  );
}
