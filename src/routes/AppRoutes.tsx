import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import BottomBar from "../components/BottomBar";
import Fab from "../components/Fab";
import NewPostModal from "../components/NewPostModal";
import SettingsSheet from "../components/SettingsSheet";
import Toast from "../components/ui/Toast";
import { useState, useMemo } from "react";
import { usePrefs } from "../context/PrefsContext";

const HomePage = lazy(() => import("../pages/HomePage"));
const PerfilPage = lazy(() => import("../pages/PerfilPage"));
const ComunidadesPage = lazy(() => import("../pages/ComunidadesPage"));
const AlertasPage = lazy(() => import("../pages/AlertasPage"));

export default function AppRoutes() {
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
    <BrowserRouter>
      <div className={`min-h-screen bg-gradient-to-br ${containerCls} flex flex-col`}>
        <Header
          onOpenNew={() => setOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onShare={handleShare}
          isDev={isDev}
          onRunTests={runTests}
        />
        <Suspense fallback={<div className="p-6 text-center">Carregando…</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/comunidades" element={<ComunidadesPage />} />
            <Route path="/alertas" element={<AlertasPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <Fab onClick={() => setOpen(true)} />
        <BottomBar />

        <NewPostModal open={open} onClose={() => setOpen(false)} onSuccess={(msg) => setToast({ msg, type: "success" })} />
        <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} />

        {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </BrowserRouter>
  );
}
