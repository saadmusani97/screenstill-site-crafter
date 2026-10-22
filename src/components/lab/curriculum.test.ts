import { describe, expect, it } from "vitest";
import { LESSONS, SESSION_MINUTES, lessonStart } from "./curriculum";

describe("Workshop duration", () => {
  it("allocates exactly 1.5 hours to the detailed session", () => {
    expect(SESSION_MINUTES).toBe(90);
    expect(lessonStart(LESSONS.length)).toBe(90);
  });
});