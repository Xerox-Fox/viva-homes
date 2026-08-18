"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";


export function DashHeader() {

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <img src="/viva-logo.jpg" alt="Viva Homes logo" width={36} height={36} className="h-9 w-9 rounded-md object-cover" />
          <span className="text-sm font-extrabold uppercase tracking-[0.28em] text-primary">Viva</span>
        </Link>

        

      </div>

    </header>
  );
}
