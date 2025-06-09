import type { UserProfile, ReadingPlan, Badge } from "@/lib/types"

export interface UserRepository {
  getUserProfile(userId: string): Promise<UserProfile>
  getUserBadges(userId: string): Promise<Badge[]>
  getUserReadingPlans(userId: string): Promise<ReadingPlan[]>
  markStoryAsRead(userId: string, storyId: string): Promise<void>
  updateReadingProgress(userId: string, storyId: string, progress: number): Promise<void>
  toggleFavoriteStory(userId: string, storyId: string, isFavorite: boolean): Promise<void>
  saveUserNote(userId: string, storyId: string, content: string): Promise<void>
}

