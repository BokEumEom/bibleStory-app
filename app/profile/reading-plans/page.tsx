import Link from "next/link"
import { ArrowLeft, Calendar, ChevronRight } from "lucide-react"
import { getUserReadingPlans } from "@/lib/services/user-service"

export default function ReadingPlansPage() {
  // 이 데이터는 실제로는 서버 컴포넌트에서 데이터베이스나 API에서 가져올 것입니다
  const readingPlans = getUserReadingPlans()

  return (
    <main className="flex flex-col min-h-screen bg-amber-50">
      <div className="flex-1 pb-20">
        {/* 헤더 */}
        <header className="p-4 flex items-center">
          <Link href="/profile" className="p-2 -ml-2 mr-2">
            <ArrowLeft className="h-6 w-6 text-amber-800" />
          </Link>
          <h1 className="text-2xl font-bold text-amber-900">읽기 계획</h1>
        </header>

        {/* 현재 진행 중인 계획 */}
        <section className="px-4 mb-6">
          <h2 className="text-lg font-bold text-amber-900 mb-3">진행 중인 계획</h2>

          {readingPlans
            .filter((plan) => plan.progress > 0)
            .map((plan) => (
              <Link key={plan.id} href={`/profile/reading-plans/${plan.id}`} className="block mb-3">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-amber-800">{plan.name}</h3>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      {plan.progress}% 완료
                    </span>
                  </div>

                  <p className="text-amber-700 mb-3">{plan.description}</p>

                  <div className="w-full h-2 bg-amber-100 rounded-full mb-3">
                    <div className="h-2 bg-amber-600 rounded-full" style={{ width: `${plan.progress}%` }}></div>
                  </div>

                  <div className="flex justify-between text-xs text-amber-600">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
        </section>

        {/* 추천 계획 */}
        <section className="px-4">
          <h2 className="text-lg font-bold text-amber-900 mb-3">추천 계획</h2>

          {readingPlans
            .filter((plan) => plan.progress === 0)
            .map((plan) => (
              <Link key={plan.id} href={`/profile/reading-plans/${plan.id}`} className="block mb-3">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-amber-800">{plan.name}</h3>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      {plan.duration}일 계획
                    </span>
                  </div>

                  <p className="text-amber-700 mb-3">{plan.description}</p>

                  <div className="flex justify-between text-xs text-amber-600">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {plan.duration}일 동안 {plan.stories.length}개의 이야기
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}

          {/* 새 계획 추가 버튼 */}
          <button className="w-full py-3 bg-amber-600 text-white rounded-lg font-medium mt-4">
            새 읽기 계획 만들기
          </button>
        </section>
      </div>
    </main>
  )
}

