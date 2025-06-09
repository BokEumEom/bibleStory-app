"use client"

import { useState, useEffect } from "react"
import type { Quiz } from "@/lib/types"
import { getQuizById } from "@/lib/data/quiz-data"
import { getUserProfile } from "@/lib/services/user-service"

export function useQuiz(quizId: string) {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [userScore, setUserScore] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    try {
      const quizData = getQuizById(quizId)
      if (!quizData) {
        throw new Error(`Quiz with id ${quizId} not found`)
      }

      setQuiz(quizData)

      // 사용자 점수 가져오기
      const userProfile = getUserProfile()
      const quizScore = userProfile.quizScores.find((score) => score.quizId === quizId)
      if (quizScore) {
        setUserScore(quizScore.score)
      }

      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      setIsLoading(false)
    }
  }, [quizId])

  return {
    quiz,
    userScore,
    isLoading,
    error,
  }
}

