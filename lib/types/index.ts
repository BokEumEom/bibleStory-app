// 성경 데이터 타입 정의
export type Testament = "old" | "new"
export type DifficultyLevel = "easy" | "medium" | "hard"
export type HighlightColor = "yellow" | "green" | "blue" | "pink" | "purple"
export type PageTransition = "slide" | "fade" | "flip" | "none"
export type ReadingBackground = "amber-50" | "gray-100" | "blue-50" | "green-50" | "gray-900"

export interface BibleBook {
  id: string
  name: string
  testament: Testament
  description: string
  totalChapters: number
  coverImage: string
}

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

// 사용자 데이터 타입 정의
export interface UserProfile {
  id: string
  name: string
  avatar: string
  joinDate: string
  readStories: string[] // 읽은 이야기 ID 목록
  readingStreak: number // 연속 읽기 일수
  lastReadDate: string
  badges: Badge[]
  readingPlan?: ReadingPlan
  quizScores: QuizScore[]
  favoriteStories: string[] // 즐겨찾기한 이야기 ID 목록
  readingHistory: ReadingHistory[]
  settings: UserSettings
  highlights?: Highlight[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedDate: string
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

export interface QuizScore {
  quizId: string
  score: number
  totalQuestions: number
  completedDate: string
}

export interface ReadingHistory {
  storyId: string
  date: string
  completionPercentage: number // 0-100 퍼센트
}

export interface UserSettings {
  notifications: boolean
  darkMode: boolean
  fontSize: "small" | "medium" | "large"
  autoPlayAudio: boolean
  pageTransition: PageTransition
  readingBackground: ReadingBackground
}

export interface Highlight {
  id: string
  storyId: string
  text: string
  color: HighlightColor
  createdAt: string
}

export interface UserNote {
  id: string
  userId: string
  storyId: string
  content: string
  createdAt: string
  updatedAt: string
}

// 퀴즈 데이터 타입 정의
export interface Quiz {
  id: string
  storyId: string
  title: string
  description: string
  difficulty: DifficultyLevel
  questions: QuizQuestion[]
  coverImage: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

// 활동 데이터 타입 정의
export interface Activity {
  id: string
  userId: string
  type: "read" | "quiz" | "badge" | "streak"
  date: string
  details: {
    storyId?: string
    quizId?: string
    badgeId?: string
    streakDays?: number
    score?: number
  }
}

