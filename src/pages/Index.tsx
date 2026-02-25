import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { techniques } from "@/data/techniques";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import GroundingCard from "@/components/GroundingCard";

const Index = () => {
  const navigate = useNavigate();
  const { t, currentLang, changeLang } = useTranslation();

  const langParam = currentLang !== "en" ? `?lang=${currentLang}` : "";

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: `linear-gradient(180deg, hsl(140 25% 92%) 0%, hsl(140 20% 96%) 40%, hsl(var(--background)) 100%)`
    }}>
      {/* Breathing Concentric Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[180, 280, 400, 540, 700].map((size, i) => (
          <div
            key={i}
            className="breathing-circle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: '35%',
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Mobile container */}
      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-5 pt-6 pb-2 safe-area-top">
          <button
            className="p-2 -ml-2 rounded-lg hover:bg-secondary/60 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">{t("Grounding")}</h1>
          <LanguageSwitcher currentLang={currentLang} onChangeLang={changeLang} />
        </header>

        {/* Support text */}
        <div className="px-6 pt-4 pb-6">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t("Grounding techniques help bring your attention back to the present moment.")}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mt-1">
            {t("Choose one activity that feels supportive right now.")}
          </p>
        </div>

        {/* Technique Grid */}
        <div className="px-5 pb-10 grid grid-cols-2 gap-3 flex-1">
          {techniques.map((tech, i) => (
            <div
              key={tech.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}
            >
              <GroundingCard
                technique={tech}
                label={t(tech.title)}
                onClick={() => navigate(`/technique/${tech.id}${langParam}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
