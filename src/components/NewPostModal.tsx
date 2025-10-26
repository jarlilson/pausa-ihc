import { useState } from "react";
import { usePosts } from "../context/PostsContext";
import Toast from "./ui/Toast";

export default function NewPostModal({
  open, onClose, onSuccess,
}: {
  open: boolean; onClose: () => void; onSuccess?: (msg: string) => void;
}) {
  const { addPost } = usePosts();
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  if (!open) return null;

  const submit = () => {
    if (!content.trim()) {
      setErr("Por favor, escreva algo antes de enviar");
      return;
    }
    addPost(content, anonymous);
    setContent("");
    setAnonymous(true);
    onClose();
    onSuccess?.("Seu sentimento foi compartilhado!");
  };

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />
        <div className="relative w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 m-3">
          <h3 className="text-[#2e4848] text-base font-medium">Compartilhar um sentimento</h3>
          <p className="text-[#2e4848]/70 text-sm mb-3">Escreva o que está sentindo. Você pode publicar como anônimo.</p>
          <textarea
            className="w-full min-h-[140px] rounded-md border border-[#B0EAF7] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0dcccc]"
            placeholder="Escreva aqui..."
            maxLength={500}
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            aria-label="Campo de texto do desabafo"
          />
          <div className="mt-3 flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-[#2e4848]">
              <input type="checkbox" checked={anonymous} onChange={()=>setAnonymous(a=>!a)} className="h-4 w-4" />
              Publicar como anônimo
            </label>
            <span className="text-xs text-[#2e4848]/60">{content.length}/500</span>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="rounded-md border border-[#B0EAF7] px-4 py-2 text-sm">Cancelar</button>
            <button onClick={submit} className="rounded-md bg-[#0dcccc] px-4 py-2 text-sm text-white hover:bg-[#0dcccc]/90">Enviar</button>
          </div>
        </div>
      </div>
      {err && <Toast message={err} type="error" onClose={() => setErr(null)} />}
    </>
  );
}
