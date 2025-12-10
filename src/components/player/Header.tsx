import { Search } from "lucide-react";

interface HeaderProps {
  activeTab: "queue" | "playlists";
  onTabChange: (tab: "queue" | "playlists") => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-12">
      {/* Navigation Links */}
      <nav className="flex items-center gap-8">
        <button
          onClick={() => onTabChange("queue")}
          className={`text-sm font-medium tracking-wide transition-colors ${
            activeTab === "queue"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          QUEUE
        </button>
        <button
          onClick={() => onTabChange("playlists")}
          className={`text-sm font-medium tracking-wide transition-colors ${
            activeTab === "playlists"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          PLAYLISTS
        </button>
      </nav>

      {/* Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-11 pr-4 py-2.5 bg-secondary/50 border border-border rounded-full text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* User Avatar */}
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;