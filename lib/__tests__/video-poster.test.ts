import { describe, expect, it } from "vitest"
import {
  buildVideoPosterFileName,
  shouldCaptureVideoPoster,
} from "@/lib/api-client"

describe("shouldCaptureVideoPoster", () => {
  it("captures posters for video mime types", () => {
    expect(shouldCaptureVideoPoster("video/mp4")).toBe(true)
    expect(shouldCaptureVideoPoster("video/quicktime")).toBe(true)
    expect(shouldCaptureVideoPoster("video/webm")).toBe(true)
  })

  it("skips non-video mime types", () => {
    expect(shouldCaptureVideoPoster("image/jpeg")).toBe(false)
    expect(shouldCaptureVideoPoster("image/png")).toBe(false)
    expect(shouldCaptureVideoPoster("application/pdf")).toBe(false)
    expect(shouldCaptureVideoPoster("")).toBe(false)
  })
})

describe("buildVideoPosterFileName", () => {
  it("replaces the source extension with a poster suffix", () => {
    expect(buildVideoPosterFileName("clip.mp4")).toBe("clip-poster.jpg")
    expect(buildVideoPosterFileName("my.video.mov")).toBe(
      "my.video-poster.jpg",
    )
  })

  it("handles names without an extension", () => {
    expect(buildVideoPosterFileName("noext")).toBe("noext-poster.jpg")
  })
})
