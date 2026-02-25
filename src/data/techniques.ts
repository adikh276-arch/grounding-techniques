export interface Technique {
  id: string;
  title: string;
  color: string;
  colorDeep: string;
  colorVar: string;
  steps: string[];
}

export const techniques: Technique[] = [
  {
    id: "water",
    title: "Put your hands in water",
    color: "bg-pastel-teal",
    colorDeep: "bg-pastel-teal-deep",
    colorVar: "--pastel-teal",
    steps: [
      "Run your hands under cool or warm water.",
      "Notice the temperature.",
      "Pay attention to the sensation on your skin.",
      "Observe how it changes moment by moment.",
      "Let your breathing slow naturally.",
    ],
  },
  {
    id: "touch",
    title: "Pick up or touch items near you",
    color: "bg-pastel-lavender",
    colorDeep: "bg-pastel-lavender-deep",
    colorVar: "--pastel-lavender",
    steps: [
      "Choose a nearby object.",
      "Notice its texture, weight, and temperature.",
      "Is it smooth or rough? Heavy or light?",
      "Let your focus stay fully on this one object.",
    ],
  },
  {
    id: "breathe",
    title: "Breathe deeply",
    color: "bg-pastel-peach",
    colorDeep: "bg-pastel-peach-deep",
    colorVar: "--pastel-peach",
    steps: [
      "Take a slow breath in through your nose.",
      "Hold gently for a moment.",
      "Exhale slowly through your mouth.",
      "Repeat several times.",
      "Let your shoulders soften.",
    ],
  },
  {
    id: "food",
    title: "Savour your food",
    color: "bg-pastel-mint",
    colorDeep: "bg-pastel-mint-deep",
    colorVar: "--pastel-mint",
    steps: [
      "Take a small bite.",
      "Chew slowly.",
      "Notice the flavor, texture, and temperature.",
      "Stay fully present with the experience.",
    ],
  },
  {
    id: "drink",
    title: "Savour a drink",
    color: "bg-pastel-blue",
    colorDeep: "bg-pastel-blue-deep",
    colorVar: "--pastel-blue",
    steps: [
      "Take a slow sip.",
      "Notice the temperature and taste.",
      "Feel the sensation as you swallow.",
      "Let yourself stay with that moment.",
    ],
  },
  {
    id: "walk",
    title: "Take a short walk",
    color: "bg-pastel-rose",
    colorDeep: "bg-pastel-rose-deep",
    colorVar: "--pastel-rose",
    steps: [
      "Walk slowly and intentionally.",
      "Notice the feeling of your feet touching the ground.",
      "Observe your surroundings without judgment.",
      "Let your breath match your steps.",
    ],
  },
  {
    id: "ice",
    title: "Hold a piece of ice",
    color: "bg-pastel-sage",
    colorDeep: "bg-pastel-sage-deep",
    colorVar: "--pastel-sage",
    steps: [
      "Hold the ice in your hand.",
      "Notice the cold sensation.",
      "Focus fully on the feeling.",
      "Allow the strong sensation to anchor you to the present.",
    ],
  },
  {
    id: "scent",
    title: "Savour a scent",
    color: "bg-pastel-coral",
    colorDeep: "bg-pastel-coral-deep",
    colorVar: "--pastel-coral",
    steps: [
      "Choose a scent nearby.",
      "Inhale slowly.",
      "Notice how it feels in your body.",
      "Let the scent bring you into this moment.",
    ],
  },
  {
    id: "move",
    title: "Move your body",
    color: "bg-pastel-sky",
    colorDeep: "bg-pastel-sky-deep",
    colorVar: "--pastel-sky",
    steps: [
      "Stretch gently.",
      "Roll your shoulders.",
      "Shift your weight from side to side.",
      "Notice how your body feels as it moves.",
    ],
  },
  {
    id: "listen",
    title: "Listen to your surroundings",
    color: "bg-pastel-mauve",
    colorDeep: "bg-pastel-mauve-deep",
    colorVar: "--pastel-mauve",
    steps: [
      "Pause and listen.",
      "Identify three distinct sounds.",
      "Are they near or far?",
      "Let your attention rest on each one.",
    ],
  },
  {
    id: "body",
    title: "Check in with your body",
    color: "bg-pastel-sand",
    colorDeep: "bg-pastel-sand-deep",
    colorVar: "--pastel-sand",
    steps: [
      "Close your eyes if comfortable.",
      "Scan from head to toe.",
      "Notice areas of tension or ease.",
      "Breathe into any tightness.",
    ],
  },
];
