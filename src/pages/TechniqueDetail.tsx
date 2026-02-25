import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
import { techniques } from "@/data/techniques";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function TechniqueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, currentLang, changeLang } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const technique = techniques.find((tech) => tech.id === id);

  if (!technique) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">{t("Technique not found")}</p>
      </div>
    );
  }

  const langParam = currentLang !== "en" ? `?lang=${currentLang}` : "";
  const totalSteps = technique.steps.length;
  const isLastStep = currentStep >= totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, hsl(var(${technique.colorVar}) / 0.35) 0%, hsl(140 25% 94%) 50%, hsl(var(--background)) 100%)`,
      }}
    >
      {/* Breathing Concentric Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[160, 260, 380, 520].map((size, i) => (
          <div
            key={i}
            className="breathing-circle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: '40%',
              borderColor: `hsl(var(${technique.colorVar}-deep) / 0.2)`,
              animationDelay: `${i * 0.9}s`,
            }}
          />
        ))}
      </div>

      {/* Mobile container */}
      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col">
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

        {/* Title */}
        <div className="px-6 pb-4">
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            {t(technique.title)}
          </h1>
        </div>

        {/* Step Progress */}
        <div className="px-6 pb-6">
          <div className="flex gap-1.5">
            {technique.steps.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full flex-1 transition-all duration-500"
                style={{
                  backgroundColor: i <= currentStep
                    ? `hsl(var(${technique.colorVar}-deep))`
                    : `hsl(var(${technique.colorVar}) / 0.4)`,
                }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {t("Step")} {currentStep + 1} / {totalSteps}
          </p>
        </div>

        {/* Step Content - single step at a time */}
        <div className="flex-1 px-6 flex items-center">
          <div key={currentStep} className="step-enter w-full">
            <div className="rounded-2xl p-8 backdrop-blur-sm" style={{
              backgroundColor: `hsl(var(${technique.colorVar}) / 0.15)`,
            }}>
              <div
                className="w-3 h-3 rounded-full mb-5"
                style={{ backgroundColor: `hsl(var(${technique.colorVar}-deep))` }}
              />
              <p className="text-foreground text-lg leading-relaxed font-medium">
                {t(technique.steps[currentStep])}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="px-6 pb-6 pt-4 space-y-3">
          {/* Prev / Next row */}
          <div className="flex gap-3">
            {!isFirstStep && (
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                className="flex items-center justify-center gap-1 rounded-xl py-3.5 px-5 font-semibold text-sm transition-all active:scale-[0.98] border"
                style={{
                  borderColor: `hsl(var(${technique.colorVar}-deep) / 0.3)`,
                  color: `hsl(var(${technique.colorVar}-deep))`,
                }}
              >
                <ChevronLeft className="w-4 h-4" />
                {t("Back")}
              </button>
            )}
            <button
              onClick={() => {
                if (isLastStep) {
                  navigate(`/${langParam}`);
                } else {
                  setCurrentStep((s) => s + 1);
                }
              }}
              className="flex-1 flex items-center justify-center gap-1 rounded-xl py-3.5 font-semibold text-sm transition-all active:scale-[0.98]"
              style={{
                backgroundColor: `hsl(var(${technique.colorVar}-deep))`,
                color: "white",
              }}
            >
              {isLastStep ? t("I Feel More Grounded") : t("Next")}
              {!isLastStep && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={() => navigate(`/${langParam}`)}
            className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("Choose Another Technique")}
          </button>
        </div>
      </div>
    </div>
  );
}
