export type ReadingHistory = {
  storyId: string
  date: string
  completionPercentage: number // 0-100 퍼센트
}

export interface ReadingPlan {
  id: string
  name: string
  description: string
  duration: number // 일 단위
  startDate: string
  endDate: string
  stories: string[] // 계획에 포함된 이야기 ID 목록
  progress: number // 0-100 퍼센트
}

export type HighlightColor = "yellow" | "green" | "blue" | "pink" | "purple"

export type PageTransition = "slide" | "fade" | "flip" | "none"

export interface BibleStory {
  id: string
  bookId: string
  chapter: number
  title: string
  summary: string
  coverImage: string
  content: StoryContent[]
  audioUrl?: string
  readingTime: number // 분 단위
  tags: string[]
  difficulty?: DifficultyLevel
}

export interface StoryContent {
  image: string
  text: string
}

export type DifficultyLevel = "easy" | "medium" | "hard"

