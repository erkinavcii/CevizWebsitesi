"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Leaf } from "lucide-react";

const NAV_LINKS = [
  { href: "/urunler",  label: "Ürünlerimiz" },
  { href: "/hikayemiz", label: "Hikayemiz" },
  { href: "/blog",     label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-navbar shadow-lg shadow-black/30 py-0"
            : "bg-transparent py-2"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:border-primary/60 transition-all duration-300 group-hover:glow-amber-sm">
              <Leaf className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight font-heading">
              <span className="text-foreground">Ceviz</span>
              <span className="text-primary text-glow-amber">Bahçesi</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                {link.label}
                {/* Amber underline animasyonu */}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Sağ İkonlar */}
          <div className="flex items-center gap-3">
            {/* Sepet */}
            <Link
              href="/urunler"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-muted/20 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background animate-glow-amber" />
              <span className="sr-only">Sepet</span>
            </Link>

            {/* Sipariş Ver butonu (desktop) */}
            <Link
              href="/urunler"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-background bg-primary hover:bg-primary/90 transition-all duration-300 glow-amber-sm hover:glow-amber"
            >
              Sipariş Ver
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-muted/20 text-muted-foreground hover:text-foreground transition-all"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobil Menü — Tam Ekran Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Arka plan kapama */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            />

            {/* Menü paneli */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-72 glass-card flex flex-col"
            >
              {/* Panel başlık */}
              <div className="flex items-center justify-between p-6 border-b border-border/30">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Leaf className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="font-heading font-bold text-foreground">CevizBahçesi</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="h-8 w-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Linkler */}
              <nav className="flex flex-col gap-1 p-4 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200 group"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Alt CTA */}
              <div className="p-4 border-t border-border/30">
                <Link
                  href="/urunler"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-bold text-background bg-primary hover:bg-primary/90 transition-all duration-300 glow-amber-sm"
                >
                  Hemen Sipariş Ver
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
