"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggleButton = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
    >
      <Moon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Sun className=" rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
};
export default ThemeToggleButton;
