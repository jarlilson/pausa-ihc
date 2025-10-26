// Paleta suave estável. Gere cor a partir de um "seed" (id/texto).
const PALETTE = ["#B0EAF7", "#F7B0EA", "#EAF7B0", "#F7BDB0", "#D0F0E0", "#F7E0B0"];

function hash(str: string) {
  let h = 2166136261 >>> 0; // FNV-1a
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function colorFromSeed(seed: string | number) {
  const n = typeof seed === "number" ? seed : hash(seed);
  return PALETTE[n % PALETTE.length];
}

export { PALETTE };
