import type { BibleStory } from "@/lib/types"
import { bibleStories } from "@/lib/data/mock-data"

// 오늘의 추천 이야기 가져오기
export function getFeaturedStory(): BibleStory {
  // 실제로는 서버에서 추천 알고리즘을 통해 가져올 것입니다
  return bibleStories[1] // 노아의 방주
}

// 최근에 읽은 이야기 가져오기
export function getRecentlyReadStories(limit = 3): BibleStory[] {
  // 실제로는 사용자의 읽기 기록을 기반으로 가져올 것입니다
  return bibleStories.slice(0, limit)
}

// 추천 이야기 가져오기
export function getRecommendedStories(limit = 4): BibleStory[] {
  // 실제로는 사용자의 관심사나 읽기 패턴을 기반으로 추천할 것입니다
  return bibleStories.slice(0, limit)
}

// 오늘의 말씀 가져오기
export function getDailyVerse() {
  // 실제로는 서버에서 오늘의 말씀을 가져올 것입니다
  return {
    text: "여호와는 나의 목자시니 내게 부족함이 없으리로다",
    reference: "시편 23:1",
  }
}

// 사용자의 읽기 계획 가져오기
export function getUserReadingPlan() {
  // 실제로는 사용자의 읽기 계획을 가져올 것입니다
  return {
    id: "plan1",
    name: "30일 성경 여행",
    description: "30일 동안 주요 성경 이야기를 읽어보세요",
    duration: 30,
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    stories: ["genesis-1", "genesis-6", "samuel1-17", "matthew-1", "luke-15"],
    progress: 80,
  }
}

// ID로 이야기 가져오기
export function getStoryById(id: string): BibleStory {
  const story = bibleStories.find((story) => story.id === id)

  if (!story) {
    throw new Error(`Story with id ${id} not found`)
  }

  return story
}

// 관련 이야기 가져오기
export function getRelatedStories(storyId: string, limit = 3): BibleStory[] {
  // 실제로는 이야기의 태그나 내용을 기반으로 관련 이야기를 찾을 것입니다
  const currentStory = getStoryById(storyId)

  // 같은 책의 다른 이야기나 비슷한 태그를 가진 이야기를 찾습니다
  return bibleStories
    .filter(
      (story) =>
        story.id !== storyId &&
        (story.bookId === currentStory.bookId || story.tags.some((tag) => currentStory.tags.includes(tag))),
    )
    .slice(0, limit)
}

