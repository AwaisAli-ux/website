import { useState } from "react";
import { Menu, X, Tv, LogOut, User, Settings, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateAccountModal from "@/components/CreateAccountModal";
import EditProfileModal from "@/components/EditProfileModal";
import ViewProfileModal from "@/components/ViewProfileModal";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Live TV & Movies", href: "/streaming" },
  { label: "Series", href: "/streaming#series" },
  { label: "FAQ", href: "/faq" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "About Us", href: "/about-us" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showViewProfile, setShowViewProfile] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
// ... (omitting handleNavClick and goHome for brevity as per rules, assuming they are kept)
  const handleNavClick = (socialHref: string) => {
    setIsOpen(false);
    
    if (socialHref.includes("#")) {
      const parts = socialHref.split("#");
      const path = parts[0];
      const hash = "#" + parts[1];

      if (path === "" || path === window.location.pathname) {
        // Anchor on current page
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Anchor on different page
        navigate(path || "/");
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo(0, 0);
          }
        }, 500);
      }
    } else if (socialHref.startsWith("/")) {
      navigate(socialHref);
      window.scrollTo(0, 0);
    }
  };

  const goHome = () => {
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between py-4">
          <button onClick={goHome} className="flex items-center gap-2 group relative transition-all duration-300 hover:scale-105">
            <div className="gradient-primary rounded-lg p-2 relative z-10 shadow-lg shadow-primary/20">
              <Tv className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            </div>
            <div className="relative">
              {/* Background Icon */}
              <Tv className="absolute -top-1 -left-2 h-10 w-10 text-primary/10 -rotate-12 group-hover:rotate-0 transition-transform duration-500 z-0" />
              <span className="text-xl font-bold text-foreground relative z-10">Smart Care <span className="text-gradient-gold">TV</span></span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              item.href.startsWith("/") ? (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm text-muted-foreground transition-colors hover:text-accent font-medium"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm text-muted-foreground transition-colors hover:text-accent font-medium text-left"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button size="sm" className="gradient-accent border-0 text-accent-foreground glow-accent font-semibold" onClick={() => handleNavClick("/#plans")}>
              Membership Plans
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative transition-transform hover:scale-110 active:scale-95 duration-200">
                    <Avatar className="h-10 w-10 border-2 border-primary/40 ring-4 ring-primary/5 shadow-xl transition-all">
                      <AvatarImage src={user.profilePhoto} alt={user.fullName} />
                      <AvatarFallback className="bg-primary/10 text-primary uppercase font-bold text-xs">{user.fullName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background shadow-xs ring-1 ring-black/5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass border-border/40 mt-2 p-1.5 shadow-2xl animate-in slide-in-from-top-2 duration-300">
                  <DropdownMenuLabel className="flex flex-col p-3 text-left">
                    <span className="text-sm font-bold text-foreground truncate">{user.fullName}</span>
                    <span className="text-[10px] text-muted-foreground truncate uppercase font-bold tracking-widest">{user.email}</span>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-primary/10 text-[9px] font-black text-primary w-fit uppercase tracking-widest ring-1 ring-primary/20">
                     <Check className="h-2.5 w-2.5" strokeWidth={4} /> {user.membershipPlan || "Free Plan"}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/30 mx-1" />
                  <DropdownMenuItem onClick={() => setShowViewProfile(true)} className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors focus:bg-primary/10">
                    <div className="p-1.5 rounded-md bg-secondary border border-border">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowEditProfile(true)} className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors focus:bg-primary/10">
                    <div className="p-1.5 rounded-md bg-secondary border border-border">
                      <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">Edit Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/30 mx-1" />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg cursor-pointer text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 transition-colors">
                    <div className="p-1.5 rounded-md bg-red-500/10 border border-red-500/20">
                      <LogOut className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-medium">Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                className="gradient-primary border-0 text-primary-foreground glow-primary"
                onClick={() => setShowCreateAccount(true)}
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-foreground">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="glass border-t border-border lg:hidden">
            <div className="container mx-auto flex flex-col gap-4 py-6">
              {navItems.map((item) => (
                item.href.startsWith("/") ? (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent text-left"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              
              {user ? (
                 <div className="flex items-center gap-3 pt-2 border-t border-border/40 mt-2">
                    <Avatar className="h-10 w-10 border border-primary/20">
                      <AvatarImage src={user.profilePhoto} />
                      <AvatarFallback>{user.fullName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                       <span className="text-sm font-bold">{user.fullName}</span>
                       <div className="flex gap-2">
                         <button onClick={() => setShowViewProfile(true)} className="text-[10px] text-primary font-bold uppercase tracking-widest">View</button>
                         <button onClick={() => setShowEditProfile(true)} className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Edit</button>
                         <button onClick={logout} className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Logout</button>
                       </div>
                    </div>
                 </div>
              ) : (
                <Button
                  size="sm"
                  className="gradient-primary border-0 text-primary-foreground w-fit"
                  onClick={() => {
                    setIsOpen(false);
                    setShowCreateAccount(true);
                  }}
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      <CreateAccountModal
        isOpen={showCreateAccount}
        onClose={() => setShowCreateAccount(false)}
      />

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />

      <ViewProfileModal
        isOpen={showViewProfile}
        onClose={() => setShowViewProfile(false)}
      />
    </>
  );
};

export default Navbar;
