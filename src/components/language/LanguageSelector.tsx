
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "./LanguageProvider";
import { useIsMobile } from "@/hooks/use-mobile";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={isMobile ? "sm" : "icon"} className="relative">
          <Languages className="h-5 w-5" />
          {!isMobile && <span className="sr-only">{t("language")}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border shadow-md">
        <DropdownMenuItem 
          onClick={() => setLanguage("en")}
          className={language === "en" ? "bg-primary/10 text-primary" : ""}
        >
          <span className="mr-2">🇬🇧</span>
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("hi")}
          className={language === "hi" ? "bg-primary/10 text-primary" : ""}
        >
          <span className="mr-2">🇮🇳</span>
          <span>हिन्दी</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("gu")}
          className={language === "gu" ? "bg-primary/10 text-primary" : ""}
        >
          <span className="mr-2">🇮🇳</span>
          <span>ગુજરાતી</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
