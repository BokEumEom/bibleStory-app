import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, BookOpen, Filter, ChevronRight } from "lucide-react"
import BottomNavigation from "@/components/common/bottom-navigation"
import { getRecentlyReadStories } from "@/lib/services/story-service"
import { getUserProfile } from "@/lib/services/user-service"

export default function MyLibraryPage() {
  // 이 데이터는 실제로는 서버 컴포넌트에서 데이터베이스나 API에서 가져올 것입니다
  const recentlyRead = getRecentlyReadStories(10)
  const userProfile = getUserProfile()

  return (
    <main className="flex flex-col min-h-screen bg-amber-50">
      <div className="flex-1 pb-20">
        {/* 헤더 */}
        <header className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="p-2 -ml-2 mr-2">
              <ArrowLeft className="h-6 w-6 text-amber-800" />
            </Link>
            <h1 className="text-2xl font-bold text-amber-900">내 서재</h1>
          </div>
          <button className="p-2">
            <Filter className="h-5 w-5 text-amber-700" />
          </button>
        </header>

        {/* 탭 메뉴 */}
        <div className="px-4 mb-4">
          <div className="flex bg-amber-100 rounded-lg p-1">
            <button className="flex-1 py-2 rounded-md text-center bg-amber-600 text-white font-medium">
              최근 읽은 이야기
            </button>
            <button className="flex-1 py-2 rounded-md text-center text-amber-800">즐겨찾기</button>
            <button className="flex-1 py-2 rounded-md text-center text-amber-800">노트</button>
          </div>
        </div>

        {/* 최근 읽은 이야기 */}
        <div className="px-4">
          {userProfile.readingHistory.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {recentlyRead.map((story) => {
                // 읽은 날짜 찾기
                const readHistory = userProfile.readingHistory.find((h) => h.storyId === story.id)
                const readDate = readHistory ? new Date(readHistory.date).toLocaleDateString() : null

                return (
                  <Link
                    key={story.id}
                    href={`/bible/story/${story.id}`}
                    className="flex bg-white rounded-lg overflow-hidden shadow-sm"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={story.coverImage || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-amber-800">{story.title}</h3>
                        <p className="text-sm text-amber-700 line-clamp-1">{story.summary}</p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center text-xs text-amber-600">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{story.readingTime}분</span>
                          {readDate && <span className="ml-2">· {readDate} 읽음</span>}
                        </div>
                        <ChevronRight className="h-4 w-4 text-amber-600" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center text-amber-700">
              <BookOpen className="h-12 w-12 mx-auto mb-3 text-amber-400" />
              <h3 className="text-lg font-bold text-amber-800 mb-2">아직 읽은 이야기가 없어요</h3>
              <p className="mb-4">성경 이야기를 읽고 여기에서 기록을 확인해보세요.</p>
              <Link href="/bible" className="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg font-medium">
                이야기 찾아보기
              </Link>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation activeTab="home" />
    </main>
  )
}

