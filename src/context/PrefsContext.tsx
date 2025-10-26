import { createContext, useContext, useMemo, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Prefs = {
  reducedMotion: boolean; setReducedMotion: (v: boolean) => void;
  highContrast: boolean; setHighContrast: (v: boolean) => void;
  notifications: boolean; setNotifications: (v: boolean) => void;
};

const PrefsContext = createContext<Prefs | null>(null);

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useLocalStorage<boolean>("pausa.pref.reducedMotion", false);
  const [highContrast, setHighContrast]   = useLocalStorage<boolean>("pausa.pref.highContrast", false);
  const [notifications, setNotifications] = useLocalStorage<boolean>("pausa.pref.notifications", true);

  const value = useMemo<Prefs>(() => ({
    reducedMotion, setReducedMotion,
    highContrast, setHighContrast,
    notifications, setNotifications,
  }), [reducedMotion, highContrast, notifications]);

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs deve ser usado dentro de <PrefsProvider>");
  return ctx;
}
