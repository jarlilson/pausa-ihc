export function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return Number(BigInt.asUintN(53, BigInt("0x" + crypto.randomUUID().replace(/-/g, "").slice(0,13))));
  return Date.now(); // fallback
}
