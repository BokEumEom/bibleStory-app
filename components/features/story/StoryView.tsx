"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Story } from "@/lib/core/entities/Story"
import { ReadStoryUseCase } from "@/lib/core/usecases/ReadStoryUseCase"
import { MockStoryRepository } from "@/lib/adapters/repositories/MockStoryRepository"
import { MockUserRepository } from "@/lib/adapters/repositories/MockUserRepository" // 이 파일은 이전에 만들지 않았습니다
import StoryProgress from "./story-progress"
import StoryControls from "./story-controls"

interface StoryViewProps {
  storyId: string
  userId: string
  initialSection?: number
}

export default function StoryView({ storyId, userId, initialSection = 0 }: StoryViewProps) {
  const router = useRouter()
  const [story, setStory] = useState<Story | null>(null)
  const [currentSection, setCurrentSection] = useState(initialSection)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // 의존성 주입
  const storyRepository = new MockStoryRepository()
  const userRepository = new MockUserRepository()
  const readStoryUseCase = new ReadStoryUseCase(storyRepository, userRepository)

  useEffect(() => {
    async function loadStory() {
      try {
        const result = await readStoryUseCase.execute(storyId, userId, currentSection)
        setStory(result.story)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
        setIsLoading(false)
      }
    }

    loadStory()
  }, [storyId, userId, currentSection])

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>
  if (!story) return <div className="p-4">Story not found</div>

  const nextSection = () => {
    if (currentSection < story.contentLength - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
    // 실제 오디오 재생 로직 추가
  }

  const content = story.content[currentSection]

  return (
    <div className="flex flex-col p-4">
      <StoryProgress currentSection={currentSection} totalSections={story.contentLength} />

      <h1 className="text-2xl font-bold mb-4">{story.title}</h1>

      <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
        <Image
          src={content.image || "/placeholder.svg"}
          alt={`${story.title} image ${currentSection + 1}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="text-lg mb-8">{content.text}</div>

      <StoryControls
        isVisible={true}
        isPlaying={isPlaying}
        toggleAudio={toggleAudio}
        prevSection={prevSection}
        nextSection={nextSection}
        currentSection={currentSection}
        totalSections={story.contentLength}
        onSettingsClick={() => {
          /* 설정 열기 */
        }}
      />
    </div>
  )
}

