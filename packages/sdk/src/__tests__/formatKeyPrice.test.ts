import { formatKeyPrice } from "../formatKeyPrice";

describe("formatKeyPrice", () => {
  // ── Zero ───────────────────────────────────────────────────────────────────
  it("formats zero stroops as 0.00", () => {
    expect(formatKeyPrice(0n)).toBe("0.00");
  });

  // ── Sub-1 XLM (4 decimal places) ──────────────────────────────────────────
  it("formats 1 stroop (smallest unit) with 4 decimals", () => {
    // 1 stroop = 0.0000001 XLM → truncated to 4 decimals = 0.0000
    expect(formatKeyPrice(1n)).toBe("0.0000");
  });

  it("formats 5_000_000 stroops (0.5 XLM) with 4 decimals", () => {
    expect(formatKeyPrice(5_000_000n)).toBe("0.5000");
  });

  it("formats 1_234_567 stroops with 4 decimals", () => {
    // 1_234_567 / 10_000_000 = 0.1234567 → 4 decimals = 0.1234
    expect(formatKeyPrice(1_234_567n)).toBe("0.1234");
  });

  it("formats 9_999_999 stroops (just under 1 XLM) with 4 decimals", () => {
    // 9_999_999 / 10_000_000 = 0.9999999 → 4 decimals = 0.9999
    expect(formatKeyPrice(9_999_999n)).toBe("0.9999");
  });

  it("formats 100 stroops with 4 decimals", () => {
    // 100 / 10_000_000 = 0.0000100 → 4 decimals = 0.0000
    expect(formatKeyPrice(100n)).toBe("0.0000");
  });

  it("formats 1_000_000 stroops (0.1 XLM) with 4 decimals", () => {
    expect(formatKeyPrice(1_000_000n)).toBe("0.1000");
  });

  // ── Exactly 1 XLM (2 decimal places) ─────────────────────────────────────
  it("formats exactly 10_000_000 stroops (1 XLM) with 2 decimals", () => {
    expect(formatKeyPrice(10_000_000n)).toBe("1.00");
  });

  // ── Above 1 XLM (2 decimal places) ───────────────────────────────────────
  it("formats 15_000_000 stroops (1.5 XLM) with 2 decimals", () => {
    expect(formatKeyPrice(15_000_000n)).toBe("1.50");
  });

  it("formats 100_000_000 stroops (10 XLM) with 2 decimals", () => {
    expect(formatKeyPrice(100_000_000n)).toBe("10.00");
  });

  it("formats a large value correctly", () => {
    // 123_456_789_000 stroops = 12345.6789 XLM → 2 decimals = 12345.67
    expect(formatKeyPrice(123_456_789_000n)).toBe("12345.67");
  });

  it("formats 10_000_000_000_000n (1,000,000 XLM) with 2 decimals", () => {
    expect(formatKeyPrice(10_000_000_000_000n)).toBe("1000000.00");
  });

  it("truncates rather than rounds (2 decimal places)", () => {
    // 12_999_999 stroops = 1.2999999 XLM → should truncate to 1.29, not round to 1.30
    expect(formatKeyPrice(12_999_999n)).toBe("1.29");
  });

  it("truncates rather than rounds (4 decimal places)", () => {
    // 1_234_999 stroops = 0.1234999 XLM → should truncate to 0.1234, not round to 0.1235
    expect(formatKeyPrice(1_234_999n)).toBe("0.1234");
  });

  // ── Negative input ────────────────────────────────────────────────────────
  it("throws RangeError for negative stroops", () => {
    expect(() => formatKeyPrice(-1n)).toThrow(RangeError);
    expect(() => formatKeyPrice(-1n)).toThrow("stroops must be non-negative");
  });
});
