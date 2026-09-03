import { beforeEach, describe, expect, it, vi } from "vitest"
import { ApiError } from "@/lib/api-error"
import type { AuthUser } from "@/lib/auth/types"

// oxlint-disable-next-line anti-slop/no-module-mocking  // test mock
vi.mock("@/lib/auth/get-user", () => ({
  requireUser: vi.fn(),
}))

import { requireUser } from "@/lib/auth/get-user"
import {
  getPermissionsForRole,
  hasPermission,
  requirePermission,
} from "@/lib/rbac"

const mockRequireUser = vi.mocked(requireUser)

function makeUser(role: AuthUser["role"]): AuthUser {
  return {
    id: "user-1",
    email: "user@example.com",
    name: "Test User",
    role,
    avatarUrl: null,
  }
}

beforeEach(() => {
  mockRequireUser.mockReset()
})

describe("asset permission matrix", () => {
  it("grants designers assets:update but not assets:approve", () => {
    expect(hasPermission("designer", "assets:update")).toBe(true)
    expect(hasPermission("designer", "assets:approve")).toBe(false)
  })

  it("grants approvers assets:approve but not assets:update", () => {
    expect(hasPermission("approver", "assets:approve")).toBe(true)
    expect(hasPermission("approver", "assets:update")).toBe(false)
  })

  it("grants admins both assets:update and assets:approve", () => {
    expect(hasPermission("admin", "assets:update")).toBe(true)
    expect(hasPermission("admin", "assets:approve")).toBe(true)
  })

  it("grants uploaders neither assets:update nor assets:approve", () => {
    expect(hasPermission("uploader", "assets:update")).toBe(false)
    expect(hasPermission("uploader", "assets:approve")).toBe(false)
  })

  it("grants unknown roles nothing", () => {
    expect(hasPermission("ghost", "assets:update")).toBe(false)
    expect(hasPermission("ghost", "assets:approve")).toBe(false)
  })

  it("lists assets:approve without assets:update for approvers", () => {
    const permissions = getPermissionsForRole("approver")
    expect(permissions).toContain("assets:approve")
    expect(permissions).not.toContain("assets:update")
  })
})

describe("requirePermission for asset mutations", () => {
  it("resolves an approver for assets:approve", async () => {
    const approver = makeUser("approver")
    mockRequireUser.mockResolvedValue(approver)
    await expect(requirePermission("assets:approve")).resolves.toEqual(
      approver,
    )
  })

  it("rejects a designer for assets:approve with 403", async () => {
    mockRequireUser.mockResolvedValue(makeUser("designer"))
    await expect(requirePermission("assets:approve")).rejects.toMatchObject({
      name: "ApiError",
      status: 403,
    })
  })

  it("rejects an approver for assets:update with 403", async () => {
    mockRequireUser.mockResolvedValue(makeUser("approver"))
    await expect(requirePermission("assets:update")).rejects.toBeInstanceOf(
      ApiError,
    )
    await expect(requirePermission("assets:update")).rejects.toMatchObject({
      status: 403,
    })
  })
})
