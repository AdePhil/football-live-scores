import { it, expect, describe } from "vitest";

import FootballUpdate from "../football/Update";

describe("FootballUpdate", () => {
  it("should be able to create a football update", () => {
    const update = new FootballUpdate("90+3", "Goal by Lionel Messi.");
    expect(update).toBeDefined();
    expect(`${update}`).toBe("90+3: Goal by Lionel Messi.");
  });
});
