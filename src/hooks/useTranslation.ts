import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { languages } from "@/data/languages";

const GOOGLE_TRANSLATE_API_KEY = "AIzaSyDgyWwwmHOROsPZclCm-LGzZs_uoYNhVDk";

// Cache translations to avoid redundant API calls
const translationCache: Record<string, Record<string, string>> = {};

export function useTranslation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const langParam = searchParams.get("lang")?.toLowerCase() || "en";

  // Find matching language (case-insensitive)
  const matchedLang = languages.find(
    (l) => l.code.toLowerCase() === langParam
  );
  const [currentLang, setCurrentLang] = useState(matchedLang?.code || "en");
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const pendingTexts = useRef<Set<string>>(new Set());

  // Sync URL param changes
  useEffect(() => {
    const param = searchParams.get("lang")?.toLowerCase() || "en";
    const match = languages.find((l) => l.code.toLowerCase() === param);
    if (match && match.code !== currentLang) {
      setCurrentLang(match.code);
    }
  }, [searchParams]);

  const changeLang = useCallback(
    (code: string) => {
      setCurrentLang(code);
      setSearchParams({ lang: code }, { replace: true });
    },
    [setSearchParams]
  );

  const translateBatch = useCallback(
    async (texts: string[]) => {
      if (currentLang === "en" || texts.length === 0) return;

      const cacheKey = currentLang;
      if (!translationCache[cacheKey]) translationCache[cacheKey] = {};

      const uncached = texts.filter((t) => !translationCache[cacheKey][t]);
      if (uncached.length === 0) {
        setTranslations((prev) => ({ ...prev, ...translationCache[cacheKey] }));
        return;
      }

      setIsTranslating(true);
      try {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: uncached,
            target: currentLang,
            source: "en",
            format: "text",
          }),
        });
        const data = await res.json();
        if (data.data?.translations) {
          const newTranslations: Record<string, string> = {};
          data.data.translations.forEach(
            (t: { translatedText: string }, i: number) => {
              newTranslations[uncached[i]] = t.translatedText;
              translationCache[cacheKey][uncached[i]] = t.translatedText;
            }
          );
          setTranslations((prev) => ({
            ...prev,
            ...translationCache[cacheKey],
          }));
        }
      } catch (err) {
        console.error("Translation error:", err);
      } finally {
        setIsTranslating(false);
      }
    },
    [currentLang]
  );

  const t = useCallback(
    (text: string): string => {
      if (currentLang === "en") return text;
      if (translations[text]) return translations[text];
      // Queue for batch translation
      pendingTexts.current.add(text);
      return text; // Return original while loading
    },
    [currentLang, translations]
  );

  // Flush pending translations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pendingTexts.current.size > 0) {
        const texts = Array.from(pendingTexts.current);
        pendingTexts.current.clear();
        translateBatch(texts);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentLang, translateBatch]);

  return { t, currentLang, changeLang, isTranslating, translateBatch };
}
