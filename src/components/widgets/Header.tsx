import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "../theme-provider";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import CitySearch from "./CitySearch";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky w-full top-0 z-20 transition-all border-b",
        isScrolled
          ? "backdrop-blur bg-background/70 border-b border-border/40"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="text-2xl font-bold bg-linear-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
          <Link to={"/"}>Weather App</Link>
        </div>
        {/* Search City */}
        <div className="flex gap-4">
          <CitySearch />
          <div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
