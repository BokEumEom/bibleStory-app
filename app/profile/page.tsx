import Link from "next/link"
import { Calendar, BarChart } from "lucide-react"
import BottomNavigation from "@/components/common/bottom-navigation"
import ProfileHeader from "@/components/features/profile/profile-header"
import ReadingStats from "@/components/features/profile/reading-stats"
import ReadingCalendar from "@/components/features/profile/reading-calendar"
import BadgeCollection from "@/components/features/profile/badge-collection"
import ReadingPlans from "@/components/features/profile/reading-plans"
import { getUserProfile, getUserBadges, getUserReadingPlans, getUserReadingStats } from "@/lib/services/user-service"

export default function ProfilePage() {
  // 이 데이터는 실제로는 서버 컴포넌트에서 데이터베이스나 API에서 가져올 것입니다
  const userProfile = getUserProfile()
  const badges = getUserBadges()
  const readingPlans = getUserReadingPlans()
  const readingStats = getUserReadingStats()

  return (
    <main className="flex flex-col min-h-screen bg-amber-50">
      <div className="flex-1 pb-20">
        <ProfileHeader userProfile={userProfile} />

        {/* 읽기 통계 */}
        <ReadingStats stats={readingStats} />

        {/* 읽기 계획 */}
        <section className="px-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-amber-900 flex items-center">
              <Calendar className="h-5 w-5 text-amber-700 mr-2" />
              읽기 계획
            </h2>
            <Link href="/profile/reading-plans" className="text-amber-600 text-sm">
              모두 보기
            </Link>
          </div>

          <ReadingPlans plans={readingPlans} />
        </section>

        {/* 읽기 캘린더 */}
        <section className="px-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-amber-900 flex items-center">
              <Calendar className="h-5 w-5 text-amber-700 mr-2" />
              읽기 기록
            </h2>
            <div className="text-amber-600 text-sm">{userProfile.readingStreak}일 연속</div>
          </div>

          <ReadingCalendar readingHistory={userProfile.readingHistory} />
        </section>

        {/* 읽기 통계 그래프 */}
        <section className="px-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-amber-900 flex items-center">
              <BarChart className="h-5 w-5 text-amber-700 mr-2" />
              읽기 통계
            </h2>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between mb-4">
              <button className="px-3 py-1 rounded-full bg-amber-600 text-white text-sm">주간</button>
              <button className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">월간</button>
              <button className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">연간</button>
            </div>

            <div className="h-40 flex items-end justify-between">
              {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
                <div key={day} className="flex flex-col items-center">
                  <div
                    className="w-8 bg-amber-500 rounded-t-sm"
                    style={{
                      height: `${Math.max(10, Math.min(100, index === 3 ? 90 : index === 6 ? 30 : Math.random() * 80 + 20))}%`,
                    }}
                  ></div>
                  <div className="text-xs mt-2 text-amber-800">{day}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 배지 컬렉션 */}
        <BadgeCollection badges={badges} />
      </div>

      <BottomNavigation activeTab="profile" />
    </main>
  )
}

