"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  BookOpen,
  Home,
  Award,
  BookCheck,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Clock,
  Share,
  Heart,
  HeartIcon as HeartFilled,
} from "lucide-react"
import { getQuizById } from "@/lib/data/quiz-data"
import { getUserProfile } from "@/lib/services/user-service"

export default function QuizDetailPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizHistory, setQuizHistory] = useState<{
    attempts: number
    bestScore: number
    lastCompleted: string | null
  }>({ attempts: 0, bestScore: 0, lastCompleted: null })

  // 퀴즈 ID에 따라 데이터 가져오기
  const quiz = getQuizById(params.id) || {
    id: params.id,
    title: "퀴즈",
    description: "퀴즈 설명",
    difficulty: "medium",
    coverImage: "/placeholder.svg",
    questions: [
      {
        question: "질문이 로드되지 않았습니다.",
        options: ["옵션 1", "옵션 2", "옵션 3", "옵션 4"],
        correctAnswer: 0,
        explanation: "설명이 로드되지 않았습니다.",
      },
    ],
  }

  // 사용자 프로필 가져오기
  const userProfile = getUserProfile()

  // 퀴즈 기록 로드
  useEffect(() => {
    const quizScore = userProfile.quizScores.find((score) => score.quizId === quiz.id)
    if (quizScore) {
      setQuizHistory({
        attempts: 1, // 실제로는 여러 번 시도한 기록을 저장해야 함
        bestScore: quizScore.score,
        lastCompleted: quizScore.completedDate,
      })
    }
  }, [quiz.id, userProfile])

  // 타이머 설정 (중간 난이도 이상일 때)
  useEffect(() => {
    if (quiz.difficulty !== "easy" && !showResult && selectedAnswer === null) {
      const timePerQuestion = quiz.difficulty === "hard" ? 20 : 30 // 어려움: 20초, 보통: 30초
      setTimeLeft(timePerQuestion)

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer)
            // 시간 초과 시 자동으로 다음 문제로
            if (prev === 1) handleNextQuestion()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [currentQuestion, showResult, selectedAnswer, quiz.difficulty])

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return // 이미 답변을 선택했으면 무시

    setSelectedAnswer(answerIndex)
    setAnsweredQuestions([...answeredQuestions, currentQuestion])

    // 정답 확인 후 점수 업데이트
    if (answerIndex === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    // 답변을 선택하지 않았으면 자동으로 오답 처리
    if (selectedAnswer === null) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion])
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setAnsweredQuestions([])
    setShowExplanation(false)

    // 퀴즈 시도 횟수 증가 (실제로는 서버에 저장해야 함)
    setQuizHistory((prev) => ({
      ...prev,
      attempts: prev.attempts + 1,
    }))
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
        {!showResult ? (
          <>
            {/* 퀴즈 헤더 */}
            <div className="flex justify-between items-center mb-4">
              <Link href="/quiz" className="p-2 -ml-2">
                <ArrowLeft className="h-6 w-6 text-amber-800" />
              </Link>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsLiked(!isLiked)} className="p-2">
                  {isLiked ? (
                    <HeartFilled className="h-6 w-6 text-red-500" />
                  ) : (
                    <Heart className="h-6 w-6 text-amber-800" />
                  )}
                </button>
                <button className="p-2">
                  <Share className="h-6 w-6 text-amber-800" />
                </button>
              </div>
            </div>

            {/* 퀴즈 정보 */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-amber-900">{quiz.title}</h1>
              <div className="flex items-center mt-1 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColorClass(quiz.difficulty)} mr-2`}>
                  {getDifficultyText(quiz.difficulty)}
                </span>
                <span className="text-amber-700 text-sm flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {quiz.questions.length * 30}초
                </span>
              </div>
              <p className="text-amber-700 text-sm mb-3">{quiz.description}</p>
            </div>

            {/* 진행 상황 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-amber-700">진행 상황</span>
                <span className="text-sm font-medium text-amber-900">
                  {currentQuestion + 1}/{quiz.questions.length}
                </span>
              </div>
              <div className="w-full h-2 bg-amber-200 rounded-full">
                <div
                  className="h-2 bg-amber-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 타이머 (중간 난이도 이상일 때) */}
            {quiz.difficulty !== "easy" && timeLeft !== null && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-amber-700">남은 시간</span>
                  <span className={`text-sm font-medium ${timeLeft < 10 ? "text-red-600" : "text-amber-900"}`}>
                    {timeLeft}초
                  </span>
                </div>
                <div className="w-full h-2 bg-amber-200 rounded-full">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${timeLeft < 10 ? "bg-red-500" : "bg-amber-600"}`}
                    style={{ width: `${(timeLeft / (quiz.difficulty === "hard" ? 20 : 30)) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* 문제 */}
            <div className="bg-white rounded-lg p-4 shadow-md mb-4">
              <h2 className="text-xl font-bold text-amber-800 mb-4">{quiz.questions[currentQuestion].question}</h2>

              <div className="grid gap-3">
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      selectedAnswer === index
                        ? selectedAnswer === quiz.questions[currentQuestion].correctAnswer
                          ? "border-green-600 bg-green-50"
                          : "border-red-600 bg-red-50"
                        : "border-amber-200 hover:border-amber-400"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <span className="font-medium text-amber-900">{option}</span>
                    {selectedAnswer === index && (
                      <span className="ml-2">
                        {selectedAnswer === quiz.questions[currentQuestion].correctAnswer ? (
                          <CheckCircle className="inline h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="inline h-5 w-5 text-red-600" />
                        )}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* 정답 설명 */}
              {selectedAnswer !== null && (
                <div className="mt-4">
                  <button
                    className="text-amber-600 text-sm font-medium"
                    onClick={() => setShowExplanation(!showExplanation)}
                  >
                    {showExplanation ? "설명 숨기기" : "설명 보기"}
                  </button>

                  {showExplanation && (
                    <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-amber-800">{quiz.questions[currentQuestion].explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 다음 버튼 */}
            <button
              className={`w-full py-3 rounded-lg font-bold text-white ${
                selectedAnswer !== null ? "bg-amber-600" : "bg-amber-300"
              }`}
              onClick={handleNextQuestion}
            >
              {currentQuestion < quiz.questions.length - 1 ? "다음 문제" : "결과 보기"}
            </button>

            {/* 문제 건너뛰기 버튼 */}
            {selectedAnswer === null && (
              <button className="w-full py-2 mt-2 text-amber-600 font-medium" onClick={handleNextQuestion}>
                이 문제 건너뛰기
              </button>
            )}

            {/* 문제 네비게이션 */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {quiz.questions.map((_, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentQuestion === index
                        ? "bg-amber-600 text-white"
                        : answeredQuestions.includes(index)
                          ? "bg-amber-200 text-amber-800"
                          : "bg-white border border-amber-200 text-amber-800"
                    }`}
                    onClick={() => {
                      if (index <= Math.max(...answeredQuestions, currentQuestion)) {
                        setCurrentQuestion(index)
                      }
                    }}
                    disabled={index > Math.max(...answeredQuestions, currentQuestion)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-md">
            {/* 결과 헤더 */}
            <div className="flex justify-between items-center mb-4">
              <Link href="/quiz" className="p-2 -ml-2">
                <ArrowLeft className="h-6 w-6 text-amber-800" />
              </Link>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsLiked(!isLiked)} className="p-2">
                  {isLiked ? (
                    <HeartFilled className="h-6 w-6 text-red-500" />
                  ) : (
                    <Heart className="h-6 w-6 text-amber-800" />
                  )}
                </button>
                <button className="p-2">
                  <Share className="h-6 w-6 text-amber-800" />
                </button>
              </div>
            </div>

            {/* 결과 내용 */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-amber-900 mb-2">{quiz.title} 결과</h1>
              <div className="text-5xl font-bold text-amber-600 mb-2">
                {score}/{quiz.questions.length}
              </div>
              <p className="text-amber-700">
                {score === quiz.questions.length
                  ? "완벽해요! 모든 문제를 맞혔어요!"
                  : score >= quiz.questions.length / 2
                    ? "잘했어요! 대부분의 문제를 맞혔어요!"
                    : "다음에는 더 잘할 수 있을 거예요!"}
              </p>
            </div>

            {/* 이전 기록 */}
            {quizHistory.attempts > 0 && (
              <div className="bg-amber-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-amber-800 mb-2">퀴즈 기록</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-amber-600 text-sm">시도 횟수</p>
                    <p className="font-bold text-amber-900">{quizHistory.attempts + 1}회</p>
                  </div>
                  <div>
                    <p className="text-amber-600 text-sm">최고 점수</p>
                    <p className="font-bold text-amber-900">
                      {Math.max(quizHistory.bestScore, score)}/{quiz.questions.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-amber-600 text-sm">마지막 완료</p>
                    <p className="font-bold text-amber-900">
                      {quizHistory.lastCompleted ? new Date(quizHistory.lastCompleted).toLocaleDateString() : "오늘"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 문제 해설 */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-amber-800 mb-2">문제 해설</h2>
              <div className="grid gap-3">
                {quiz.questions.map((q, index) => (
                  <div key={index} className="border border-amber-200 rounded-lg p-3">
                    <div className="flex items-start">
                      {answeredQuestions.includes(index) &&
                      answeredQuestions[answeredQuestions.indexOf(index)] === q.correctAnswer ? (
                        <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                      ) : (
                        <XCircle className="text-red-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium text-amber-900">{q.question}</p>
                        <p className="text-amber-700">정답: {q.options[q.correctAnswer]}</p>
                        {q.explanation && <p className="text-amber-600 text-sm mt-1">{q.explanation}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-amber-600 rounded-lg font-bold text-white" onClick={resetQuiz}>
                다시 풀기
              </button>
              <Link href="/quiz" className="flex-1 py-3 bg-amber-100 text-amber-800 rounded-lg font-bold text-center">
                다른 퀴즈 보기
              </Link>
            </div>
          </div>
        )}
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

