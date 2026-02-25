import { Technique } from "@/data/techniques";

interface GroundingCardProps {
  technique: Technique;
  onClick: () => void;
  label: string;
}

export default function GroundingCard({ technique, onClick, label }: GroundingCardProps) {
  return (
    <button
      onClick={onClick}
      className={`${technique.color} w-full rounded-xl p-4 text-left shadow-card 
        transition-all duration-200 hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98]
        text-foreground font-medium text-sm leading-snug`}
    >
      {label}
    </button>
  );
}
