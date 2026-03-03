import { Link } from "react-router-dom";
import { useTheme } from "../theme-provider";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={theme == "dark" ? "/image1.png" : "/image.png"}
            className="h-14"
          ></img>
        </Link>
        <div
          onClick={() => {
            setTheme(theme == "light" ? "dark" : "light");
          }}
        >
          toggle
        </div>
      </div>
    </header>
  );
};

export default Header;
