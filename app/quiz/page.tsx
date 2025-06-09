"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Home, Award, BookCheck, Search, Filter, X, ChevronRight, CheckCircle } from "lucide-react"
import { quizzes } from "@/lib/data/quiz-data"
import { getUserProfile } from "@/lib/services/user-service"

// 난이도 타입 정의
type Difficulty = "all" | "easy" | "medium" | "hard"
// 카테고리 타입 정의
type Category = "all" | "old-testament" | "new-testament" | "completed"

export default function QuizPage() {
  // 상태 관리
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("all")
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [activeTab, setActiveTab] = useState<"all" | "popular" | "recent" | "completed">("all")
  const [showFilters, setShowFilters] = useState(false)
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const quizzesPerPage = 6

  // 사용자 프로필 가져오기
  const userProfile = getUserProfile()

  // 완료한 퀴즈 ID 목록 설정
  useEffect(() => {
    const completedIds = userProfile.quizScores.map((score) => score.quizId)
    setCompletedQuizzes(completedIds)
  }, [userProfile])

  // 퀴즈 필터링 함수
  const filterQuizzes = () => {
    let filtered = [...quizzes]

    // 검색어로 필터링
    if (searchQuery) {
      filtered = filtered.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // 난이도로 필터링
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((quiz) => quiz.difficulty === selectedDifficulty)
    }

    // 카테고리로 필터링
    if (selectedCategory === "old-testament") {
      filtered = filtered.filter(
        (quiz) =>
          quiz.storyId.includes("genesis") || quiz.storyId.includes("exodus") || quiz.storyId.includes("samuel"),
      )
    } else if (selectedCategory === "new-testament") {
      filtered = filtered.filter(
        (quiz) => quiz.storyId.includes("matthew") || quiz.storyId.includes("luke") || quiz.storyId.includes("john"),
      )
    } else if (selectedCategory === "completed") {
      filtered = filtered.filter((quiz) => completedQuizzes.includes(quiz.id))
    }

    // 탭으로 필터링
    if (activeTab === "popular") {
      // 인기 있는 퀴즈 (임의로 정렬)
      filtered.sort((a, b) => b.id.localeCompare(a.id))
    } else if (activeTab === "recent") {
      // 최근 추가된 퀴즈 (ID 기준 역순)
      filtered.sort((a, b) => b.id.localeCompare(a.id))
    } else if (activeTab === "completed") {
      filtered = filtered.filter((quiz) => completedQuizzes.includes(quiz.id))
    }

    return filtered
  }

  // 필터링된 퀴즈
  const filteredQuizzes = filterQuizzes()

  // 페이지네이션
  const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage)
  const currentQuizzes = filteredQuizzes.slice((currentPage - 1) * quizzesPerPage, currentPage * quizzesPerPage)

  // 검색어 초기화
  const clearSearch = () => {
    setSearchQuery("")
  }

  // 필터 초기화
  const resetFilters = () => {
    setSelectedDifficulty("all")
    setSelectedCategory("all")
    setSearchQuery("")
  }

  // 난이도 텍스트 변환
  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "쉬움"
      case "medium":
        return "보통"
      case "hard":
        return "어려움"
      default:
        return "알 수 없음"
    }
  }

  // 난이도 색상 클래스 반환
  const getDifficultyColorClass = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-amber-50">
      <div className="flex-1 p-4 pb-20">
        <h1 className="text-2xl font-bold text-amber-900 mb-4">성경 퀴즈</h1>

        {/* 검색 바 */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-amber-500" />
          </div>
          <input
            type="text"
            className="bg-white w-full pl-10 pr-10 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="퀴즈 검색하기"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={clearSearch}>
              <X className="h-5 w-5 text-amber-500" />
            </button>
          )}
        </div>

        {/* 필터 버튼 */}
        <div className="flex justify-between items-center mb-4">
          <button className="flex items-center text-amber-800 font-medium" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-1" />
            필터 {showFilters ? "숨기기" : "보기"}
          </button>

          {(selectedDifficulty !== "all" || selectedCategory !== "all" || searchQuery) && (
            <button className="text-amber-600 text-sm font-medium" onClick={resetFilters}>
              필터 초기화
            </button>
          )}
        </div>

        {/* 필터 패널 */}
        {showFilters && (
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h3 className="font-medium text-amber-900 mb-2">난이도</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                className={`px-3 py-1 rounded-full text-sm ${selectedDifficulty === "all" ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"}`}
                onClick={() => setSelectedDifficulty("all")}
              >
                전체
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${selectedDifficulty === "easy" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"}`}
                onClick={() => setSelectedDifficulty("easy")}
              >
                쉬움
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${selectedDifficulty === "medium" ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"}`}
                onClick={() => setSelectedDifficulty("medium")}
              >
                보통
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${selectedDifficulty === "hard" ? "bg-red-600 text-white" : "bg-red-100 text-red-800"}`}
                onClick={() => setSelectedDifficulty("hard")}
              >
                어려움
              </button>
            </div>

            <h3 className="font-medium text-amber-900 mb-2">카테고리</h3>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 rounded-full text-sm ${selectedCategory === "all" ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"}`}
                onClick={() => setSelectedCategory("all")}
              >
                전체
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${selectedCategory === "old-testament" ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"}`}
                onClick={() => setSelectedCategory("old-testament")}
              >
                구약
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${selectedCategory === "new-testament" ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"}`}
                onClick={() => setSelectedCategory("new-testament")}
              >
                신약
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${selectedCategory === "completed" ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"}`}
                onClick={() => setSelectedCategory("completed")}
              >
                완료한 퀴즈
              </button>
            </div>
          </div>
        )}

        {/* 탭 메뉴 */}
        <div className="flex bg-amber-100 rounded-lg p-1 mb-4">
          <button
            className={`flex-1 py-2 rounded-md text-center ${
              activeTab === "all" ? "bg-amber-600 text-white font-medium" : "text-amber-800"
            }`}
            onClick={() => setActiveTab("all")}
          >
            전체
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-center ${
              activeTab === "popular" ? "bg-amber-600 text-white font-medium" : "text-amber-800"
            }`}
            onClick={() => setActiveTab("popular")}
          >
            인기
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-center ${
              activeTab === "recent" ? "bg-amber-600 text-white font-medium" : "text-amber-800"
            }`}
            onClick={() => setActiveTab("recent")}
          >
            최신
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-center ${
              activeTab === "completed" ? "bg-amber-600 text-white font-medium" : "text-amber-800"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            완료
          </button>
        </div>

        {/* 퀴즈 결과 수 표시 */}
        <div className="text-amber-700 mb-3">
          {filteredQuizzes.length}개의 퀴즈 {searchQuery && `"${searchQuery}" 검색 결과`}
        </div>

        {/* 퀴즈 목록 */}
        {currentQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentQuizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/quiz/${quiz.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={quiz.coverImage || "/placeholder.svg"}
                    alt={`${quiz.title} 이미지`}
                    fill
                    className="object-cover"
                  />
                  {completedQuizzes.includes(quiz.id) && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <div className="flex items-center mb-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColorClass(quiz.difficulty)}`}
                        >
                          {getDifficultyText(quiz.difficulty)}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold">{quiz.title}</h2>
                    </div>
                  </div>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <p className="text-sm text-amber-700">{quiz.questions.length}개의 문제</p>
                  <div className="flex items-center text-amber-600">
                    <span className="text-sm">시작하기</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-amber-800 mb-2">검색 결과가 없습니다</p>
            <p className="text-amber-600 text-sm">다른 검색어나 필터를 사용해보세요</p>
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded-full ${
                  currentPage === page ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {/* 퀴즈 랭킹 */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-amber-900 mb-2">퀴즈 랭킹</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between py-2 border-b border-amber-100">
              <div className="flex items-center">
                <div className="bg-amber-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2">
                  1
                </div>
                <span className="font-medium">민지</span>
              </div>
              <span className="font-bold">950점</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-amber-100">
              <div className="flex items-center">
                <div className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2">
                  2
                </div>
                <span className="font-medium">준호</span>
              </div>
              <span className="font-bold">820점</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-amber-100">
              <div className="flex items-center">
                <div className="bg-amber-400 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2">
                  3
                </div>
                <span className="font-medium">소연</span>
              </div>
              <span className="font-bold">780점</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="bg-amber-200 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                  4
                </div>
                <span className="font-medium">나</span>
              </div>
              <span className="font-bold">650점</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-200 p-2 z-10">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-amber-400">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">홈</span>
          </Link>
          <Link href="/bible" className="flex flex-col items-center text-amber-400">
            <BookOpen className="h-6 w-6" />
            <span className="text-xs mt-1">성경 목록</span>
          </Link>
          <Link href="/quiz" className="flex flex-col items-center text-amber-600">
            <BookCheck className="h-6 w-6" />
            <span className="text-xs mt-1">퀴즈</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-amber-400">
            <Award className="h-6 w-6" />
            <span className="text-xs mt-1">내 프로필</span>
          </Link>
        </div>
      </nav>
    </main>
  )
}

