import Tooltip from "./ui/Tooltip";
import { Settings, Share2, Plus } from "lucide-react";

export default function Header({
  onOpenNew, onOpenSettings, onShare, isDev, onRunTests,
}: {
  onOpenNew: () => void;
  onOpenSettings: () => void;
  onShare: () => void;
  isDev: boolean;
  onRunTests: () => void;
}) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[#B0EAF7]/40">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}PAUSA LOGO.png`} alt="PAUSA" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <p className="text-sm text-[#2e4848] leading-tight">Respire. Aqui, você pode ser ouvido.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onOpenNew} className="inline-flex items-center gap-2 rounded-md bg-[#0dcccc] px-3 py-2 text-white text-sm shadow hover:bg-[#0dcccc]/90">
              <Plus className="h-4 w-4" /> Novo Desabafo
            </button>
            <button className="rounded-md border border-[#B0EAF7] p-2 hover:bg-[#B0EAF7]/10" onClick={onShare} aria-label="Compartilhar">
              <Share2 className="h-4 w-4 text-[#0dcccc]" />
            </button>
            <Tooltip label="Preferências e acessibilidade">
              <button className="rounded-md border border-[#B0EAF7] p-2 hover:bg-[#B0EAF7]/10" aria-label="Configurações" onClick={onOpenSettings}>
                <Settings className="h-4 w-4 text-[#0dcccc]" />
              </button>
            </Tooltip>
          </div>
        </div>

        <nav className="mt-3 grid grid-cols-3 text-sm">
          {["Mural", "Comunidades", "Notificações"].map((item, i) => (
            <button key={item} className={`py-2 ${i === 0 ? "text-[#0dcccc] border-b-2 border-[#0dcccc]" : "text-[#2e4848]/70 hover:text-[#0dcccc]"}`}>
              {item}
            </button>
          ))}
        </nav>

        {isDev && (
          <div className="mt-2 flex justify-end">
            <button className="text-xs px-2 py-1 border rounded" onClick={onRunTests}>DEV: Run tests</button>
          </div>
        )}
      </div>
    </header>
  );
}
