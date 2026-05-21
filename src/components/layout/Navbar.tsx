import Link from "next/link";
import { ShoppingCart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-primary font-heading">
              Ceviz<span className="text-secondary">Bahçesi</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link href="/urunler" className="transition-colors hover:text-primary">
            Ürünlerimiz
          </Link>
          <Link href="/hikayemiz" className="transition-colors hover:text-primary">
            Hikayemiz
          </Link>
          <Link href="/blog" className="transition-colors hover:text-primary">
            Blog
          </Link>
          <Link href="/iletisim" className="transition-colors hover:text-primary">
            İletişim
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
            <span className="sr-only">Sepet</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex text-foreground hover:text-primary">
            <User className="h-5 w-5" />
            <span className="sr-only">Hesabım</span>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden text-foreground">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menüyü aç</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
