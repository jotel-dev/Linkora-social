/**
 * Number of stroops in one XLM.
 * 1 XLM = 10,000,000 stroops (10^7).
 */
const STROOPS_PER_XLM = 10_000_000n;

/**
 * Convert a key price from stroops (the on-chain unit) to a
 * human-readable XLM string with appropriate decimal places.
 *
 * Rules:
 * - Prices **≥ 1 XLM** are displayed with **2** decimal places.
 * - Prices **< 1 XLM** (but > 0) are displayed with **4** decimal places.
 * - Zero is displayed as `"0.00"`.
 *
 * @param stroops - The price in stroops as a `bigint` (must be ≥ 0).
 * @returns A formatted string representing the price in XLM.
 *
 * @example
 * ```ts
 * formatKeyPrice(0n);              // "0.00"
 * formatKeyPrice(5_000_000n);      // "0.5000"
 * formatKeyPrice(10_000_000n);     // "1.00"
 * formatKeyPrice(123_456_789_000n); // "12345.67"
 * ```
 */
export function formatKeyPrice(stroops: bigint): string {
  if (stroops < 0n) {
    throw new RangeError("stroops must be non-negative");
  }

  const wholePart = stroops / STROOPS_PER_XLM;
  const fractionalStroops = stroops % STROOPS_PER_XLM;

  // Convert the fractional part to a 7-digit zero-padded string so we can
  // slice the desired number of decimals from it.
  const fracStr = fractionalStroops.toString().padStart(7, "0");

  const isSubOneXlm = wholePart === 0n && stroops !== 0n;
  const decimals = isSubOneXlm ? 4 : 2;

  const truncated = fracStr.slice(0, decimals);

  return `${wholePart.toString()}.${truncated}`;
}
