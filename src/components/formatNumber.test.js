import formatNumber from "./formatNumber";

describe("formatNumber", () => {
  it("should format numbers with commas as thousands separators", () => {
    expect(formatNumber(1000)).toBe("1,000");
    expect(formatNumber(123456789)).toBe("12,34,56,789");
  });

  it("should format decimal numbers correctly", () => {
    expect(formatNumber(1234.56)).toBe("1,234.56");
  });

  it("should format negative numbers correctly", () => {
    expect(formatNumber(-1234)).toBe("-1,234");
  });
});
