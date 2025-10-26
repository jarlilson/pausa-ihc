export default function Fab({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="fixed bottom-24 right-5 rounded-full bg-[#F7BDB0] px-5 py-3 text-white text-sm shadow-lg hover:brightness-95">
      + Compartilhar um sentimento
    </button>
  );
}
