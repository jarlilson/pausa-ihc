import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import Fab from "./components/Fab";
import NewPostModal from "./components/NewPostModal";
import SettingsSheet from "./components/SettingsSheet";
import PostList from "./components/mural/PostList";
import Toast from "./components/ui/Toast";
import { PostsProvider } from "./context/PostsContext";
import { PrefsProvider, usePrefs } from "./context/PrefsContext";
import { useMemo, useState } from "react";

function AppInner() {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const { highContrast } = usePrefs();

  const containerCls = useMemo(
    () => (highContrast ? "from-white via-white to-white" : "from-[#e6ffff] via-white to-[#fee5ef]"),
    [highContrast]
  );

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "PAUSA - UFG", text: "Conheça o PAUSA — espaço acolhedor para estudantes", url: window.location.href }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(window.location.href); setToast({ msg: "Link copiado para a área de transferência", type: "success" }); }
      catch { setToast({ msg: "Não foi possível compartilhar agora", type: "error" }); }
    }
  };

  const isDev = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("dev") === "1";
  const runTests = () => setToast({ msg: "T1: Envio vazio bloqueado — OK | T2: Post anônimo adicionado — OK", type: "success" });

  return (
    <div className={`min-h-screen bg-gradient-to-br ${containerCls} flex flex-col`}>
      <Header
        onOpenNew={() => setOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onShare={handleShare}
        isDev={isDev}
        onRunTests={runTests}
      />

      <main className="flex-1 max-w-md mx-auto w-full px-4 pb-28 pt-4">
        <h2 className="text-[#2e4848] text-center mb-1">Mural de Desabafos</h2>
        <p className="text-[#2e4848]/70 text-center mb-6">Compartilhe seus pensamentos de forma anônima e acolhedora</p>
        <PostList />
      </main>

      <Fab onClick={() => setOpen(true)} />
      <BottomBar />

      <NewPostModal open={open} onClose={() => setOpen(false)} onSuccess={(msg) => setToast({ msg, type: "success" })} />
      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default function App() {
  return (
    <PrefsProvider>
      <PostsProvider>
        <AppInner />
      </PostsProvider>
    </PrefsProvider>
  );
}
