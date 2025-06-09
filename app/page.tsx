import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ChevronRight } from "lucide-react"
import BottomNavigation from "@/components/common/bottom-navigation"
import HomeHeader from "@/components/features/home/home-header"
import ReadingProgress from "@/components/features/home/reading-progress"
import RecommendedStories from "@/components/features/home/recommended-stories"
import DailyVerse from "@/components/features/home/daily-verse"
import ReadingPlanProgress from "@/components/features/home/reading-plan-progress"
import {
  getRecentlyReadStories,
  getFeaturedStory,
  getRecommendedStories,
  getDailyVerse,
  getUserReadingPlan,
} from "@/lib/services/story-service"

export default function HomePage() {
  // 이 데이터들은 실제로는 서버 컴포넌트에서 데이터베이스나 API에서 가져올 것입니다
  const featuredStory = getFeaturedStory()
  const recentlyRead = getRecentlyReadStories(3)
  const recommendedStories = getRecommendedStories(4)
  const dailyVerse = getDailyVerse()
  const readingPlan = getUserReadingPlan()

  return (
    <main className="flex flex-col min-h-screen bg-amber-50">
      <div className="flex-1 pb-20">
        <HomeHeader />

        {/* 읽기 진행 상황 */}
        <ReadingProgress readingPlan={readingPlan} />

        {/* 오늘의 성경 이야기 */}
        <section className="px-4 mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-amber-900">오늘의 성경이야기</h2>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={featuredStory.coverImage || "/placeholder.svg"}
                alt={featuredStory.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <div className="flex items-center mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-xs">{featuredStory.readingTime}분</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{featuredStory.title}</h3>
                  <p className="text-sm text-white/90">{featuredStory.summary}</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <Link
                href={`/bible/story/${featuredStory.id}`}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg text-center block"
              >
                읽기 시작하기
              </Link>
            </div>
          </div>
        </section>

        {/* 최근에 읽은 이야기 */}
        <section className="px-4 mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-amber-900">이어서 읽기</h2>
            <Link href="/my-library" className="text-amber-600 flex items-center text-sm font-medium">
              더보기 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 hide-scrollbar">
            {recentlyRead.map((story) => (
              <div key={story.id} className="flex-shrink-0 w-40">
                <Link href={`/bible/story/${story.id}`} className="block">
                  <div className="relative h-56 w-40 rounded-lg overflow-hidden shadow-sm mb-2">
                    <Image
                      src={story.coverImage || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent flex items-end">
                      <div className="p-3 text-white">
                        <div className="flex items-center mb-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="text-xs">{story.readingTime}분</span>
                        </div>
                        <h3 className="font-bold">{story.title}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 오늘의 말씀 */}
        <Suspense fallback={<div className="px-4 py-6 bg-amber-100/50 rounded-lg mx-4 mb-8 animate-pulse h-32"></div>}>
          <DailyVerse verse={dailyVerse} />
        </Suspense>

        {/* 읽기 계획 진행 상황 */}
        <Suspense fallback={<div className="px-4 py-6 bg-white rounded-lg mx-4 mb-8 animate-pulse h-40"></div>}>
          <ReadingPlanProgress plan={readingPlan} />
        </Suspense>

        {/* 추천 이야기 */}
        <Suspense fallback={<div className="px-4 py-6 bg-white rounded-lg mx-4 mb-8 animate-pulse h-64"></div>}>
          <RecommendedStories stories={recommendedStories} />
        </Suspense>
      </div>

      <BottomNavigation activeTab="home" />
    </main>
  )
}

