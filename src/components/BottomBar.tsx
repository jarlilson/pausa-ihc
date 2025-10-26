import { Home, Users, Bell, User } from "lucide-react";

export default function BottomBar() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur border-t border-[#B0EAF7]/40">
      <div className="max-w-md mx-auto px-6">
        <div className="flex justify-between py-3">
          <button className="text-[#0dcccc] flex flex-col items-center text-xs"><Home className="h-5 w-5"/>Mural</button>
          <button className="text-[#2e4848]/70 hover:text-[#0dcccc] flex flex-col items-center text-xs"><Users className="h-5 w-5"/>Comunidades</button>
          <button className="text-[#2e4848]/70 hover:text-[#0dcccc] flex flex-col items-center text-xs"><Bell className="h-5 w-5"/>Alertas</button>
          <button className="text-[#2e4848]/70 hover:text-[#0dcccc] flex flex-col items-center text-xs"><User className="h-5 w-5"/>Perfil</button>
        </div>
      </div>
    </nav>
  );
}
