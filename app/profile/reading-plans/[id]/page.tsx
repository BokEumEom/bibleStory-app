import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, CheckCircle, ChevronRight } from "lucide-react"
import { getUserReadingPlans } from "@/lib/services/user-service"
import { getStoryById } from "@/lib/services/story-service"

export default function ReadingPlanDetailPage({ params }: { params: { id: string } }) {
  // 이 데이터는 실제로는 서버 컴포넌트에서 데이터베이스나 API에서 가져올 것입니다
  const plans = getUserReadingPlans()
  const plan = plans.find((p) => p.id === params.id)

  if (!plan) {
    return <div>계획을 찾을 수 없습니다.</div>
  }

  // 계획에 포함된 이야기들 가져오기
  const stories = plan.stories
    .map((storyId) => {
      try {
        return getStoryById(storyId)
      } catch (error) {
        return null
      }
    })
    .filter(Boolean)

  return (
    <main className="flex flex-col min-h-screen bg-amber-50">
      <div className="flex-1 pb-20">
        {/* 헤더 */}
        <header className="p-4 flex items-center">
          <Link href="/profile/reading-plans" className="p-2 -ml-2 mr-2">
            <ArrowLeft className="h-6 w-6 text-amber-800" />
          </Link>
          <h1 className="text-2xl font-bold text-amber-900">{plan.name}</h1>
        </header>

        {/* 계획 정보 */}
        <section className="px-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-amber-700 mb-4">{plan.description}</p>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-amber-700">진행률</span>
              <span className="text-sm font-medium text-amber-900">{plan.progress}%</span>
            </div>

            <div className="w-full h-2 bg-amber-100 rounded-full mb-4">
              <div className="h-2 bg-amber-600 rounded-full" style={{ width: `${plan.progress}%` }}></div>
            </div>

            <div className="flex justify-between text-xs text-amber-600 mb-4">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>시작: {new Date(plan.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>종료: {new Date(plan.endDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-amber-600 text-white rounded-lg font-medium">오늘의 이야기 읽기</button>
              <button className="py-2 px-3 bg-amber-100 text-amber-800 rounded-lg font-medium">공유</button>
            </div>
          </div>
        </section>

        {/* 이야기 목록 */}
        <section className="px-4">
          <h2 className="text-lg font-bold text-amber-900 mb-3">이야기 목록</h2>

          <div className="grid grid-cols-1 gap-3">
            {stories.map((story, index) => (
              <Link
                key={story.id}
                href={`/bible/story/${story.id}`}
                className="flex bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative h-20 w-20 flex-shrink-0">
                  <Image src={story.coverImage || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                  {index < Math.floor((plan.progress / 100) * stories.length) && (
                    <div className="absolute inset-0 bg-amber-900/30 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-amber-800">{story.title}</h3>
                      <span className="text-xs text-amber-600">Day {index + 1}</span>
                    </div>
                    <p className="text-sm text-amber-700 line-clamp-1">{story.summary}</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center text-xs text-amber-600">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{story.readingTime}분</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-amber-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

