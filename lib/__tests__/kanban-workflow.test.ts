import { describe, expect, it } from "vitest"
import {
  canDropOnColumn,
  getIllegalDropReason,
  getLegalDropColumnIds,
} from "@/lib/kanban-workflow"

describe("getLegalDropColumnIds", () => {
  it("allows uploading cards nowhere except their home draft column", () => {
    expect(getLegalDropColumnIds("uploading")).toEqual(["draft"])
  })

  it("allows processing cards nowhere except their home draft column", () => {
    expect(getLegalDropColumnIds("processing")).toEqual(["draft"])
  })

  it("allows in_design cards nowhere except their home draft column", () => {
    expect(getLegalDropColumnIds("in_design")).toEqual(["draft"])
  })

  it("keeps scheduled cards pinned to their home approved column", () => {
    expect(getLegalDropColumnIds("scheduled")).toEqual(["approved"])
  })

  it("maps approved cards to approved, revision, and published columns", () => {
    expect(getLegalDropColumnIds("approved").sort()).toEqual(
      ["approved", "published", "revision"].sort(),
    )
  })

  it("maps ready_for_review cards to draft, revision, and approved columns", () => {
    expect(getLegalDropColumnIds("ready_for_review").sort()).toEqual(
      ["approved", "draft", "revision"].sort(),
    )
  })
})

describe("canDropOnColumn", () => {
  it("rejects uploading → revision_requested (revision column)", () => {
    expect(canDropOnColumn("uploading", "revision")).toBe(false)
  })

  it("rejects scheduled → published even though both share a workflow lane", () => {
    expect(canDropOnColumn("scheduled", "published")).toBe(false)
  })

  it("accepts approved → published and approved → revision", () => {
    expect(canDropOnColumn("approved", "published")).toBe(true)
    expect(canDropOnColumn("approved", "revision")).toBe(true)
  })

  it("accepts revision_requested → approved (quick-approve path)", () => {
    expect(canDropOnColumn("revision_requested", "approved")).toBe(true)
  })

  it("treats a drop onto the card's own column as a legal no-op", () => {
    expect(canDropOnColumn("scheduled", "approved")).toBe(true)
    expect(canDropOnColumn("uploading", "draft")).toBe(true)
  })
})

describe("getIllegalDropReason", () => {
  it("returns null for legal drops", () => {
    expect(getIllegalDropReason("approved", "published")).toBeNull()
  })

  it("explains illegal drops with the resolved target status", () => {
    expect(getIllegalDropReason("uploading", "revision")).toBe(
      "Can't move uploading → revision_requested",
    )
    expect(getIllegalDropReason("scheduled", "published")).toBe(
      "Can't move scheduled → published",
    )
  })
})
