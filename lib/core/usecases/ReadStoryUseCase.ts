import type { Story } from "../entities/Story"
import type { StoryRepository } from "../repositories/StoryRepository"
import type { UserRepository } from "../repositories/UserRepository"

export class ReadStoryUseCase {
  constructor(
    private storyRepository: StoryRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    storyId: string,
    userId: string,
    sectionIndex = 0,
  ): Promise<{
    story: Story
    currentSection: number
    isCompleted: boolean
    nextStoryId?: string
  }> {
    // 이야기 가져오기
    const story = await this.storyRepository.getStoryById(storyId)
    if (!story) {
      throw new Error(`Story with id ${storyId} not found`)
    }

    // 읽기 진행 상태 업데이트
    const isLastSection = sectionIndex >= story.contentLength - 1
    if (isLastSection) {
      await this.userRepository.markStoryAsRead(userId, storyId)
    } else {
      await this.userRepository.updateReadingProgress(userId, storyId, sectionIndex)
    }

    // 다음 추천 이야기 찾기
    let nextStoryId: string | undefined
    if (isLastSection) {
      const relatedStories = await this.storyRepository.getRelatedStories(storyId, 1)
      nextStoryId = relatedStories.length > 0 ? relatedStories[0].id : undefined
    }

    return {
      story,
      currentSection: sectionIndex,
      isCompleted: isLastSection,
      nextStoryId,
    }
  }
}

