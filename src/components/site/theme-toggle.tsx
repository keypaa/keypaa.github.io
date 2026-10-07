"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Theme toggle styled to match the header's github link:
 * same mono label, same border, same hover treatment.
 * Defaults to dark (site is dark-first); persists the choice
 * in localStorage so it survives reloads.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted && resolvedTheme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
      className={cn(
        "shrink-0 rounded-md border border-border/70 px-2.5 py-1.5 font-mono text-[12px] text-muted-foreground transition-colors hover:border-clay/50 hover:text-clay sm:inline-flex sm:items-center sm:gap-1.5",
        className,
      )}
    >
      {mounted && resolvedTheme === "dark" ? (
        <>
          <Sun className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">light</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">dark</span>
        </>
      )}
    </button>
  );
}
