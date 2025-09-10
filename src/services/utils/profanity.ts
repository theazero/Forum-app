const banned = [
    "idiot",
    "ful",
    "dum",
    "korkad",
    "bitch",
    "hora"
  ];
  
  export function hasProfanity(text: string): boolean {
    const s = text.toLowerCase();
    return banned.some(w => s.includes(w));
  }
  
  export function censor(text: string): string {
    let out = text;
    for (const w of banned) {
      const re = new RegExp(`\\b${w}\\b`, "gi");
      out = out.replace(re, "*".repeat(w.length));
    }
    return out;
  }
  