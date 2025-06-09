"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Share, Bookmark, BookmarkCheck, Heart, Clock, ChevronLeft, ChevronRight } from "lucide-react"
// 파일 import 경로 업데이트
import { getStoryById, getRelatedStories } from "@/lib/services/story-service"
import { getUserProfile, toggleFavoriteStory, saveHighlight } from "@/lib/services/user-service"
import StoryProgress from "@/components/features/story/story-progress"
import StoryControls from "@/components/features/story/story-controls"
import RelatedStories from "@/components/features/story/related-stories"
import StoryNotes from "@/components/features/story/story-notes"
import ReadingSettings from "@/components/features/story/reading-settings"
import HighlightMenu from "@/components/features/story/highlight-menu"
import type { PageTransition } from "@/lib/types"

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [showControls, setShowControls] = useState(true)
  const [selectedText, setSelectedText] = useState("")
  const [showHighlightMenu, setShowHighlightMenu] = useState(false)
  const [highlightPosition, setHighlightPosition] = useState({ x: 0, y: 0 })
  const [pageTransition, setPageTransition] = useState<PageTransition>("slide")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<"left" | "right">("right")
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)
  const [touchMoveX, setTouchMoveX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragDistance, setDragDistance] = useState(0)
  const [dragPercentage, setDragPercentage] = useState(0)
  const [showPageTurnHint, setShowPageTurnHint] = useState(true)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const contentRef = useRef<HTMLDivElement>(null)
  const storyContentRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  // 이 데이터는 실제로는 서버 컴포넌트에서 데이터베이스나 API에서 가져올 것입니다
  const story = getStoryById(params.id)
  const relatedStories = getRelatedStories(params.id, 3)
  const userProfile = getUserProfile()

  // 사용자 설정 불러오기
  useEffect(() => {
    if (userProfile.settings) {
      setFontSize(userProfile.settings.fontSize)
      setPageTransition(userProfile.settings.pageTransition)

      // 즐겨찾기 상태 설정
      setIsFavorite(userProfile.favoriteStories.includes(params.id))
    }

    // 5초 후 페이지 넘김 힌트 숨기기
    const timer = setTimeout(() => {
      setShowPageTurnHint(false)
    }, 5000)

    // 오디오 객체 생성
    if (story.audioUrl) {
      const audioElement = new Audio(story.audioUrl)
      setAudio(audioElement)

      return () => {
        audioElement.pause()
        audioElement.currentTime = 0
        clearTimeout(timer)
      }
    }

    return () => clearTimeout(timer)
  }, [userProfile, params.id, story.audioUrl])

  // 스크롤 및 텍스트 선택 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      setShowControls(false)

      clearTimeout(window.scrollTimer)
      window.scrollTimer = setTimeout(() => {
        setShowControls(true)
      }, 1000) as unknown as number
    }

    const handleTextSelection = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()

        setSelectedText(selection.toString())
        setHighlightPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 40,
        })
        setShowHighlightMenu(true)
      } else {
        setShowHighlightMenu(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("selectionchange", handleTextSelection)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("selectionchange", handleTextSelection)
      clearTimeout(window.scrollTimer)
    }
  }, [])

  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextSection()
      } else if (e.key === "ArrowLeft") {
        prevSection()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection])

  // 오디오 재생/일시정지
  const toggleAudio = () => {
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
    setIsDragging(true)
    setDragDistance(0)

    // 페이지 넘김 힌트 숨기기
    if (showPageTurnHint) {
      setShowPageTurnHint(false)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !storyContentRef.current) return

    const currentX = e.touches[0].clientX
    const distance = currentX - touchStartX
    const windowWidth = window.innerWidth

    // 첫 페이지에서 오른쪽으로 스와이프하거나 마지막 페이지에서 왼쪽으로 스와이프하는 경우 제한
    if ((currentSection === 0 && distance > 0) || (currentSection === story.content.length - 1 && distance < 0)) {
      // 저항감 추가 - 실제 이동 거리의 1/3만 적용
      storyContentRef.current.style.transform = `translateX(${distance / 3}px)`

      // 페이지 구부러짐 효과 추가
      if (pageRef.current) {
        if (distance > 0) {
          // 오른쪽으로 당길 때 (이전 페이지로)
          pageRef.current.style.borderTopLeftRadius = "10px"
          pageRef.current.style.borderBottomLeftRadius = "10px"
          pageRef.current.style.boxShadow = "5px 0 10px rgba(0,0,0,0.1)"
        } else {
          // 왼쪽으로 당길 때 (다음 페이지로)
          pageRef.current.style.borderTopRightRadius = "10px"
          pageRef.current.style.borderBottomRightRadius = "10px"
          pageRef.current.style.boxShadow = "-5px 0 10px rgba(0,0,0,0.1)"
        }
      }
    } else {
      // 일반적인 스와이프
      storyContentRef.current.style.transform = `translateX(${distance}px)`

      // 페이지 구부러짐 효과 추가
      if (pageRef.current) {
        const bendFactor = Math.min(15, Math.abs(distance) / 20)
        const shadowBlur = Math.min(20, Math.abs(distance) / 10)

        if (distance > 0) {
          // 오른쪽으로 당길 때 (이전 페이지로)
          pageRef.current.style.borderTopLeftRadius = `${bendFactor}px`
          pageRef.current.style.borderBottomLeftRadius = `${bendFactor}px`
          pageRef.current.style.boxShadow = `${shadowBlur}px 0 ${shadowBlur}px rgba(0,0,0,0.2)`
        } else {
          // 왼쪽으로 당길 때 (다음 페이지로)
          pageRef.current.style.borderTopRightRadius = `${bendFactor}px`
          pageRef.current.style.borderBottomRightRadius = `${bendFactor}px`
          pageRef.current.style.boxShadow = `-${shadowBlur}px 0 ${shadowBlur}px rgba(0,0,0,0.2)`
        }
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || !storyContentRef.current || !pageRef.current) return

    setIsDragging(false)
    const endX = e.changedTouches[0].clientX
    const distance = endX - touchStartX
    const threshold = window.innerWidth * 0.2 // 화면 너비의 20%

    // 스타일 초기화
    storyContentRef.current.style.transition = "transform 0.3s ease-out"
    storyContentRef.current.style.transform = "translateX(0)"

    pageRef.current.style.borderTopLeftRadius = "0"
    pageRef.current.style.borderBottomLeftRadius = "0"
    pageRef.current.style.borderTopRightRadius = "0"
    pageRef.current.style.borderBottomRightRadius = "0"
    pageRef.current.style.boxShadow = "0 0 0 rgba(0,0,0,0)"

    // 임계값을 넘으면 페이지 전환
    if (Math.abs(distance) > threshold) {
      if (distance < 0 && currentSection < story.content.length - 1) {
        // 왼쪽으로 스와이프 - 다음 페이지
        nextSection()
      } else if (distance > 0 && currentSection > 0) {
        // 오른쪽으로 스와이프 - 이전 페이지
        prevSection()
      }
    }

    // 트랜지션 종료 후 스타일 초기화
    setTimeout(() => {
      if (storyContentRef.current) {
        storyContentRef.current.style.transition = ""
      }
    }, 300)
  }

  // 다음 섹션으로 이동
  const nextSection = useCallback(() => {
    if (currentSection < story.content.length - 1 && !isTransitioning) {
      setTransitionDirection("left")
      setIsTransitioning(true)

      // 트랜지션 애니메이션 후 섹션 변경
      setTimeout(
        () => {
          setCurrentSection(currentSection + 1)
          setIsTransitioning(false)
          setDragDistance(0)
          setDragPercentage(0)
        },
        pageTransition === "none" ? 0 : 300,
      )

      // 스크롤 위치 조정
      contentRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [currentSection, isTransitioning, pageTransition, story.content.length])

  // 이전 섹션으로 이동
  const prevSection = useCallback(() => {
    if (currentSection > 0 && !isTransitioning) {
      setTransitionDirection("right")
      setIsTransitioning(true)

      // 트랜지션 애니메이션 후 섹션 변경
      setTimeout(
        () => {
          setCurrentSection(currentSection - 1)
          setIsTransitioning(false)
          setDragDistance(0)
          setDragPercentage(0)
        },
        pageTransition === "none" ? 0 : 300,
      )

      // 스크롤 위치 조정
      contentRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [currentSection, isTransitioning, pageTransition])

  // 텍스트 하이라이트 처리
  const handleHighlight = (color: "yellow" | "green" | "blue" | "pink" | "purple") => {
    if (selectedText) {
      saveHighlight(params.id, selectedText, color)
      setShowHighlightMenu(false)
      window.getSelection()?.removeAllRanges()
    }
  }

  // 즐겨찾기 토글
  const handleFavoriteToggle = () => {
    const newState = !isFavorite
    setIsFavorite(newState)
    toggleFavoriteStory(params.id, newState)
  }

  // 폰트 크기에 따른 클래스
  const fontSizeClass = {
    small: "text-base",
    medium: "text-lg",
    large: "text-xl",
  }[fontSize]

  // 페이지 트랜지션 스타일 계산
  const getPageStyle = () => {
    if (isDragging) {
      // 드래그 중일 때는 실시간으로 페이지 위치 조정
      return {
        transform: `translateX(${dragDistance}px)`,
        transition: "none",
      }
    }

    if (pageTransition === "none") return {}

    if (pageTransition === "fade") {
      return {
        transition: "opacity 300ms ease-in-out",
        opacity: isTransitioning ? 0 : 1,
      }
    }

    if (pageTransition === "flip") {
      return {
        transition: "transform 300ms ease-in-out",
        transform: isTransitioning
          ? `perspective(1000px) rotateY(${transitionDirection === "left" ? "-" : ""}90deg)`
          : "perspective(1000px) rotateY(0deg)",
      }
    }

    // 기본값: slide
    return {
      transition: isTransitioning ? "transform 300ms ease-in-out" : "transform 300ms ease-out",
      transform: isTransitioning ? `translateX(${transitionDirection === "left" ? "-" : ""}100%)` : "translateX(0)",
    }
  }

  // 페이지 넘김 효과 (3D 책 넘김 효과)
  const getPageTurnStyle = () => {
    if (!isDragging) return {}

    // 드래그 방향에 따라 다른 효과 적용
    const direction = dragDistance < 0 ? "left" : "right"
    const absPercentage = Math.abs(dragPercentage)

    // 페이지 그림자 효과
    const shadowOpacity = Math.min(0.5, (absPercentage / 100) * 0.5)
    const shadowBlur = Math.min(20, (absPercentage / 100) * 20)

    // 페이지 구부러짐 효과
    const bendFactor = Math.min(15, (absPercentage / 100) * 15)

    if (direction === "left") {
      // 왼쪽으로 넘기는 효과 (다음 페이지로)
      return {
        boxShadow: `-${shadowBlur}px 0 ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`,
        borderTopRightRadius: `${bendFactor}px`,
        borderBottomRightRadius: `${bendFactor}px`,
      }
    } else {
      // 오른쪽으로 넘기는 효과 (이전 페이지로)
      return {
        boxShadow: `${shadowBlur}px 0 ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`,
        borderTopLeftRadius: `${bendFactor}px`,
        borderBottomLeftRadius: `${bendFactor}px`,
      }
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-amber-50">
      {/* 상단 헤더 - 스크롤 시 숨김 */}
      <header
        className={`fixed top-0 left-0 right-0 bg-amber-50/95 backdrop-blur-sm z-10 transition-transform duration-300 ${showControls ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex justify-between items-center p-4">
          <Link href="/bible" className="p-2 -ml-2">
            <ArrowLeft className="h-6 w-6 text-amber-800" />
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={handleFavoriteToggle} className="p-2">
              {isFavorite ? (
                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              ) : (
                <Heart className="h-6 w-6 text-amber-800" />
              )}
            </button>
            <button onClick={() => setIsBookmarked(!isBookmarked)} className="p-2">
              {isBookmarked ? (
                <BookmarkCheck className="h-6 w-6 text-amber-600 fill-amber-600" />
              ) : (
                <Bookmark className="h-6 w-6 text-amber-800" />
              )}
            </button>
            <button className="p-2">
              <Share className="h-6 w-6 text-amber-800" />
            </button>
          </div>
        </div>

        {/* 진행 상황 표시 */}
        <StoryProgress currentSection={currentSection} totalSections={story.content.length} />
      </header>

      <div className="flex-1 pt-16 pb-20" ref={contentRef}>
        {/* 이야기 제목 */}
        <div className="px-4 py-6">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">{story.title}</h1>
          <p className="text-amber-700 mb-4">{story.summary}</p>
          <div className="flex items-center text-sm text-amber-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>읽는 시간: {story.readingTime}분</span>
          </div>
        </div>

        {/* 이야기 내용 - 터치 이벤트 처리 */}
        <div
          className="px-4 relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 페이지 넘김 힌트 */}
          {showPageTurnHint && (
            <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center text-white text-center p-4 animate-fade">
              <div className="bg-black/70 p-6 rounded-lg max-w-xs">
                <div className="flex justify-between items-center mb-4">
                  <ChevronLeft className="h-8 w-8" />
                  <ChevronRight className="h-8 w-8" />
                </div>
                <p className="text-lg font-medium">화면을 좌우로 스와이프하여 페이지를 넘기세요</p>
                <button
                  className="mt-4 px-4 py-2 bg-amber-600 rounded-lg text-white"
                  onClick={() => setShowPageTurnHint(false)}
                >
                  확인
                </button>
              </div>
            </div>
          )}

          {/* 스토리 콘텐츠 */}
          <div ref={storyContentRef} className="transition-transform duration-300" style={{ touchAction: "pan-y" }}>
            <div ref={pageRef} className="bg-white rounded-lg p-4 shadow-md transition-all duration-300 book-page">
              {/* 이미지 섹션 */}
              <div ref={imageRef} className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={story.content[currentSection].image || "/placeholder.svg"}
                  alt={`${story.title} 이미지 ${currentSection + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* 텍스트 섹션 */}
              <div ref={textRef} className={`${fontSizeClass} text-amber-800 leading-relaxed mb-8`}>
                {story.content[currentSection].text}
              </div>
            </div>
          </div>

          {/* 페이지 넘김 인디케이터 */}
          <div className="flex justify-center mt-4 mb-4">
            {story.content.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                  index === currentSection ? "bg-amber-600 w-4" : "bg-amber-200"
                }`}
                onClick={() => setCurrentSection(index)}
                aria-label={`페이지 ${index + 1}`}
              />
            ))}
          </div>

          {/* 좌우 스와이프 안내 - 모바일에서만 표시 */}
          <div className="flex justify-between items-center text-amber-400 text-xs mt-2 mb-8 md:hidden">
            <div className="flex items-center">
              <ChevronLeft className="h-4 w-4" />
              <span>오른쪽으로 스와이프하여 이전</span>
            </div>
            <div className="flex items-center">
              <span>왼쪽으로 스와이프하여 다음</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          {/* 키보드 단축키 안내 - 데스크톱에서만 표시 */}
          <div className="hidden md:flex justify-center text-amber-500 text-sm mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 inline-flex items-center">
              <span className="px-2 py-1 bg-white rounded border border-amber-200 mx-1">←</span>
              <span className="mx-1">이전 페이지</span>
              <span className="mx-2">|</span>
              <span className="px-2 py-1 bg-white rounded border border-amber-200 mx-1">→</span>
              <span className="mx-1">또는</span>
              <span className="px-2 py-1 bg-white rounded border border-amber-200 mx-1">Space</span>
              <span className="mx-1">다음 페이지</span>
            </div>
          </div>
        </div>

        {/* 노트 섹션 */}
        <StoryNotes storyId={story.id} />

        {/* 관련 이야기 */}
        <RelatedStories stories={relatedStories} />
      </div>

      {/* 하이라이트 메뉴 */}
      {showHighlightMenu && (
        <HighlightMenu
          position={highlightPosition}
          onHighlight={handleHighlight}
          onClose={() => setShowHighlightMenu(false)}
        />
      )}

      {/* 하단 컨트롤 - 스크롤 시 숨김 */}
      <StoryControls
        isVisible={showControls}
        isPlaying={isPlaying}
        toggleAudio={toggleAudio}
        prevSection={prevSection}
        nextSection={nextSection}
        currentSection={currentSection}
        totalSections={story.content.length}
        onSettingsClick={() => setShowSettings(true)}
      />

      {/* 읽기 설정 모달 */}
      {showSettings && (
        <ReadingSettings
          fontSize={fontSize}
          pageTransition={pageTransition}
          setFontSize={setFontSize}
          setPageTransition={setPageTransition}
          onClose={() => setShowSettings(false)}
        />
      )}
    </main>
  )
}

