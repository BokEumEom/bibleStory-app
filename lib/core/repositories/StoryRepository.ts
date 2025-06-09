import type { Story } from "../entities/Story"

// 리포지토리 인터페이스 정의
export interface StoryRepository {
  getAllStories(): Promise<Story[]>
  getStoryById(id: string): Promise<Story | null>
  getRelatedStories(storyId: string, limit?: number): Promise<Story[]>
  getFeaturedStory(): Promise<Story>
  getRecentlyReadStories(limit?: number): Promise<Story[]>
  getRecommendedStories(limit?: number): Promise<Story[]>
}

