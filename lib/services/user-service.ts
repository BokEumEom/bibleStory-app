import type { UserProfile, Badge, ReadingPlan, UserNote, Highlight } from "@/lib/types"
import { userProfile, badges, readingPlans, userNotes } from "@/lib/data/mock-data"

// 사용자 프로필 가져오기
export function getUserProfile(): UserProfile {
  return userProfile
}

// 사용자 배지 가져오기
export function getUserBadges(): Badge[] {
  return badges
}

// 사용자 읽기 계획 가져오기
export function getUserReadingPlans(): ReadingPlan[] {
  return readingPlans
}

// 사용자 읽기 통계 가져오기
export function getUserReadingStats() {
  return {
    totalStoriesRead: userProfile.readStories.length,
    totalReadingTime: 120, // 분 단위
    streak: userProfile.readingStreak,
    favoriteStories: userProfile.favoriteStories.length,
  }
}

// 책의 읽기 진행 상황 가져오기
export function getBookProgress(bookId: string): number {
  // 실제로는 사용자가 읽은 이야기와 책의 총 이야기 수를 기반으로 계산할 것입니다
  const progressMap: Record<string, number> = {
    genesis: 60,
    exodus: 30,
    samuel1: 80,
    matthew: 45,
    luke: 20,
    acts: 0,
    psalms: 10,
    proverbs: 5,
    daniel: 70,
    jonah: 25,
    john: 40,
    revelation: 15,
  }

  return progressMap[bookId] || 0
}

// 사용자 노트 가져오기
export function getUserNotes(storyId: string): string | null {
  // 실제로는 데이터베이스나 API에서 가져올 것입니다
  const note = userNotes.find((note) => note.storyId === storyId)
  return note ? note.content : null
}

// 사용자 노트 저장하기
export function saveUserNote(storyId: string, content: string): void {
  // 실제로는 데이터베이스나 API에 저장할 것입니다
  const existingNoteIndex = userNotes.findIndex((note) => note.storyId === storyId)

  if (existingNoteIndex !== -1) {
    // 기존 노트 업데이트
    userNotes[existingNoteIndex].content = content
    userNotes[existingNoteIndex].updatedAt = new Date().toISOString()
  } else {
    // 새 노트 추가
    const newNote: UserNote = {
      id: `note${userNotes.length + 1}`,
      userId: userProfile.id,
      storyId,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    userNotes.push(newNote)
  }

  console.log(`Saving note for story ${storyId}: ${content}`)
}

// 하이라이트 저장하기
export function saveHighlight(
  storyId: string,
  text: string,
  color: "yellow" | "green" | "blue" | "pink" | "purple",
): void {
  // 실제로는 데이터베이스나 API에 저장할 것입니다
  if (!userProfile.highlights) {
    userProfile.highlights = []
  }

  const newHighlight: Highlight = {
    id: `highlight${userProfile.highlights.length + 1}`,
    storyId,
    text,
    color,
    createdAt: new Date().toISOString(),
  }

  userProfile.highlights.push(newHighlight)
  console.log(`Saving highlight for story ${storyId}: ${text} (${color})`)
}

// 즐겨찾기 토글하기
export function toggleFavoriteStory(storyId: string, isFavorite: boolean): void {
  // 실제로는 데이터베이스나 API에 저장할 것입니다
  if (isFavorite) {
    // 즐겨찾기에 추가
    if (!userProfile.favoriteStories.includes(storyId)) {
      userProfile.favoriteStories.push(storyId)
    }
  } else {
    // 즐겨찾기에서 제거
    userProfile.favoriteStories = userProfile.favoriteStories.filter((id) => id !== storyId)
  }

  console.log(`${isFavorite ? "Adding" : "Removing"} story ${storyId} ${isFavorite ? "to" : "from"} favorites`)
}

// 사용자 설정 저장하기
export function saveUserSettings(settings: Partial<UserProfile["settings"]>): void {
  // 실제로는 데이터베이스나 API에 저장할 것입니다
  userProfile.settings = {
    ...userProfile.settings,
    ...settings,
  }

  console.log("Saving user settings:", settings)
}

