"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Package, Users, LogOut } from "lucide-react";
import { logoutAction } from "./actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Login sayfasındaysak layout'u gizle
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/admin/login";
  };

  const navItems = [
    { name: "Özet", href: "/admin", icon: LayoutDashboard },
    { name: "Siparişler", href: "/admin/siparisler", icon: ShoppingBag },
    { name: "Stok", href: "/admin/stok", icon: Package },
    { name: "Müşteriler", href: "/admin/hatirlatmalar", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 md:pb-0 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b sticky top-0 z-40 flex items-center justify-between px-4 h-16 shadow-sm">
        <span className="font-heading font-bold text-lg text-primary">Admin Paneli</span>
        <button onClick={handleLogout} className="p-2 text-zinc-500 hover:text-red-600 transition-colors">
          <LogOut className="h-5 w-5" />
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-zinc-900 text-white flex-col border-r border-zinc-800 min-h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <span className="font-heading font-bold text-xl text-primary">Ceviz Bahçesi</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                  isActive ? "bg-primary text-primary-foreground" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
          >
            <LogOut className="h-5 w-5" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-around items-center h-16 px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-primary" : "text-zinc-400"
              }`}
            >
              <item.icon className={`h-6 w-6 ${isActive ? "fill-primary/20" : ""}`} />
              <span className="text-[10px] font-bold">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
