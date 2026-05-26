import { MonitorPlay } from "lucide-react";
import { useNavigate } from "react-router-dom";

const footerLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "FAQ", href: "/faq" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Membership Plans", href: "/#plans" },
  { label: "Contact Us", href: "/#contact" },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    if (href.includes("#")) {
      const parts = href.split("#");
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
    } else if (href.startsWith("/")) {
      navigate(href);
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
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <button onClick={goHome} className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95 cursor-pointer">
            <div className="gradient-primary rounded-lg p-2 shadow-lg shadow-primary/20">
              <MonitorPlay className="h-4 w-4 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-lg font-bold text-foreground">Smart Care <span className="text-gradient-gold">TV</span></span>
          </button>

          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-muted-foreground transition-colors hover:text-accent font-medium cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Smart Care TV. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Support:</span>
            <a href="https://wa.me/14094193052" className="text-xs font-bold text-green-500 hover:text-green-400 transition-colors">
              WhatsApp: +1 (409) 419-3052
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
