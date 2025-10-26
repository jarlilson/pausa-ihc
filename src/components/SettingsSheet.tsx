import SheetDrawer from "./ui/SheetDrawer";
import Switch from "./ui/Switch";
import { usePrefs } from "../context/PrefsContext";

export default function SettingsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { reducedMotion, setReducedMotion, highContrast, setHighContrast, notifications, setNotifications } = usePrefs();

  return (
    <SheetDrawer open={open} onClose={onClose} side="right">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-[#2e4848]">Configurações</h4>
        <button className="text-sm" onClick={onClose}>Fechar</button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#2e4848]">Reduzir animações</span>
          <Switch ariaLabel="Reduzir animações" checked={reducedMotion} onChange={setReducedMotion} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#2e4848]">Alto contraste</span>
          <Switch ariaLabel="Alto contraste" checked={highContrast} onChange={setHighContrast} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#2e4848]">Notificações</span>
          <Switch ariaLabel="Notificações" checked={notifications} onChange={setNotifications} />
        </div>
      </div>
    </SheetDrawer>
  );
}
