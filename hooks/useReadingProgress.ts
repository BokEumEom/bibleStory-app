"use client"

import { useState, useEffect } from "react"
import type { ReadingPlan } from "@/lib/types"
import { getUserReadingPlan } from "@/lib/services/story-service"

export function useReadingProgress() {
  const [readingPlan, setReadingPlan] = useState<ReadingPlan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    try {
      const plan = getUserReadingPlan()
      setReadingPlan(plan)
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      setIsLoading(false)
    }
  }, [])

  return {
    readingPlan,
    isLoading,
    error,
  }
}

