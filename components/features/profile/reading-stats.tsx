import { BookOpen, Clock, Award, Heart } from "lucide-react"

interface ReadingStatsProps {
  stats: {
    totalStoriesRead: number
    totalReadingTime: number
    streak: number
    favoriteStories: number
  }
}

export default function ReadingStats({ stats }: ReadingStatsProps) {
  return (
    <section className="px-4 mb-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center mb-1">
            <BookOpen className="h-5 w-5 text-amber-600 mr-2" />
            <span className="text-amber-800 font-medium">읽은 이야기</span>
          </div>
          <div className="text-2xl font-bold text-amber-900">{stats.totalStoriesRead}</div>
        </div>

        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center mb-1">
            <Clock className="h-5 w-5 text-amber-600 mr-2" />
            <span className="text-amber-800 font-medium">읽은 시간</span>
          </div>
          <div className="text-2xl font-bold text-amber-900">{stats.totalReadingTime}분</div>
        </div>

        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center mb-1">
            <Award className="h-5 w-5 text-amber-600 mr-2" />
            <span className="text-amber-800 font-medium">연속 읽기</span>
          </div>
          <div className="text-2xl font-bold text-amber-900">{stats.streak}일</div>
        </div>

        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center mb-1">
            <Heart className="h-5 w-5 text-amber-600 mr-2" />
            <span className="text-amber-800 font-medium">즐겨찾기</span>
          </div>
          <div className="text-2xl font-bold text-amber-900">{stats.favoriteStories}</div>
        </div>
      </div>
    </section>
  )
}

