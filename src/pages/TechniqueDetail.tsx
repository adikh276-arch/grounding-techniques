import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { techniques } from "@/data/techniques";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function TechniqueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, currentLang, changeLang } = useTranslation();

  const technique = techniques.find((tech) => tech.id === id);

  if (!technique) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">{t("Technique not found")}</p>
      </div>
    );
  }

  const langParam = currentLang !== "en" ? `?lang=${currentLang}` : "";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(180deg, hsl(var(${technique.colorVar}) / 0.3) 0%, hsl(var(--background)) 40%)`,
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <button
          onClick={() => navigate(`/${langParam}`)}
          className="p-2 -ml-2 rounded-lg hover:bg-secondary/60 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <LanguageSwitcher currentLang={currentLang} onChangeLang={changeLang} />
      </header>

      {/* Content */}
      <div className="flex-1 px-6 pb-8">
        <h1 className="text-2xl font-bold text-foreground mb-8 leading-tight">
          {t(technique.title)}
        </h1>

        <div className="space-y-4">
          {technique.steps.map((step, i) => (
            <div
              key={i}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 120}ms`, opacity: 0 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: `hsl(var(${technique.colorVar}-deep))` }}
                />
                <p className="text-foreground/85 text-base leading-relaxed">
                  {t(step)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="px-6 pb-8 space-y-3">
        <button
          onClick={() => navigate(`/${langParam}`)}
          className="w-full rounded-xl py-3.5 font-semibold text-sm transition-all active:scale-[0.98]"
          style={{
            backgroundColor: `hsl(var(${technique.colorVar}-deep))`,
            color: "white",
          }}
        >
          {t("I Feel More Grounded")}
        </button>
        <button
          onClick={() => navigate(`/${langParam}`)}
          className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {t("Choose Another Technique")}
        </button>
      </div>
    </div>
  );
}
