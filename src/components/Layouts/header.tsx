import { Link } from "react-router-dom";
import { useTheme } from "../theme-provider";
import { MoonStar, Sun } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme == "dark";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={isDark ? "/image1.png" : "/image.png"}
            className="h-14"
          ></img>
        </Link>
        <div
          onClick={() => {
            setTheme(!isDark ? "dark" : "light");
          }}
          className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}
        >
          {isDark ? (
            <Sun className="h-6.5 w-6.5 text-yellow-500 rotate-0 transition all" />
          ) : (
            <MoonStar className="h-6.5 w-6.5 text-blue-400 rotate-0 transition all" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
