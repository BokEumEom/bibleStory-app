import type { BibleStory } from "@/lib/types"

// 핵심 엔티티 클래스 - 불변성 유지
export class Story {
  readonly id: string
  readonly title: string
  readonly summary: string
  readonly content: Array<{ image: string; text: string }>
  readonly readingTime: number
  readonly tags: string[]

  constructor(data: BibleStory) {
    this.id = data.id
    this.title = data.title
    this.summary = data.summary
    this.content = [...data.content]
    this.readingTime = data.readingTime
    this.tags = [...data.tags]
  }

  get isLongRead(): boolean {
    return this.readingTime > 10
  }

  get contentLength(): number {
    return this.content.length
  }

  getEstimatedTimeToRead(readingSpeed: "slow" | "normal" | "fast" = "normal"): number {
    const multiplier = readingSpeed === "slow" ? 1.5 : readingSpeed === "fast" ? 0.7 : 1
    return Math.round(this.readingTime * multiplier)
  }
}

