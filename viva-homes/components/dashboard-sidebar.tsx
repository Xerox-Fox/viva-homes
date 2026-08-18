"use client";

import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Section = "overview" | "available" | "listings" | "saved" | "messages" | "account";

interface NavItem {
  id: Section;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashSidebarProps {
  section: Section;
  setSection: (section: Section) => void;
  navItems: NavItem[];
  onSignOut: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function DashSidebar({
  section,
  setSection,
  navItems,
  onSignOut,
  collapsed,
  setCollapsed,
}: DashSidebarProps) {

  return (
    <aside
      className={cn(
        "fixed left-5 top-24 z-20 hidden transition-all duration-300 lg:block",
        collapsed ? "w-[68px]" : "w-60",
      )}
    >
      <div className="rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-soft)]">
        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-primary",
            collapsed && "justify-center px-0",
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4 shrink-0" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4 shrink-0" />
              <span className="truncate">Collapse</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="my-1 h-px bg-border" />

        {/* Nav items */}
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              title={collapsed ? label : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                collapsed && "justify-center px-0",
                section === id
                  ? "bg-secondary font-semibold text-primary"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-primary",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-1 h-px bg-border" />

        {/* Sign out */}
        <button
          onClick={onSignOut}
          title={collapsed ? "Sign out" : undefined}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-primary",
            collapsed && "justify-center px-0",
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="truncate">Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
