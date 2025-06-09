import { Story } from "@/lib/core/entities/Story"
import type { StoryRepository } from "@/lib/core/repositories/StoryRepository"
import { bibleStories } from "@/lib/data/mock-data"

export class MockStoryRepository implements StoryRepository {
  async getAllStories(): Promise<Story[]> {
    return bibleStories.map((story) => new Story(story))
  }

  async getStoryById(id: string): Promise<Story | null> {
    const story = bibleStories.find((story) => story.id === id)
    return story ? new Story(story) : null
  }

  async getRelatedStories(storyId: string, limit = 3): Promise<Story[]> {
    const story = bibleStories.find((story) => story.id === storyId)
    if (!story) return []

    // 간단한 관련 이야기 찾기 로직 (실제로는 더 복잡할 수 있음)
    const related = bibleStories
      .filter((s) => s.id !== storyId && (s.bookId === story.bookId || s.tags.some((tag) => story.tags.includes(tag))))
      .slice(0, limit)

    return related.map((story) => new Story(story))
  }

  async getFeaturedStory(): Promise<Story> {
    // 예제에서는 첫 번째 이야기를 추천 이야기로 사용
    return new Story(bibleStories[1])
  }

  async getRecentlyReadStories(limit = 3): Promise<Story[]> {
    // 예제에서는 처음 몇 개의 이야기를 최근 읽은 이야기로 사용
    return bibleStories.slice(0, limit).map((story) => new Story(story))
  }

  async getRecommendedStories(limit = 4): Promise<Story[]> {
    // 예제에서는 처음 몇 개의 이야기를 추천 이야기로 사용
    return bibleStories.slice(0, limit).map((story) => new Story(story))
  }
}

