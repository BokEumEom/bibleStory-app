import Link from "next/link"
import { BookOpen, Home, Award, BookCheck } from "lucide-react"

interface BottomNavigationProps {
  activeTab: "home" | "bible" | "quiz" | "profile"
}

export default function BottomNavigation({ activeTab }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-200 p-2 z-10">
      <div className="flex justify-around items-center">
        <Link
          href="/"
          className={`flex flex-col items-center ${activeTab === "home" ? "text-amber-600" : "text-amber-400"}`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">홈</span>
        </Link>
        <Link
          href="/bible"
          className={`flex flex-col items-center ${activeTab === "bible" ? "text-amber-600" : "text-amber-400"}`}
        >
          <BookOpen className="h-6 w-6" />
          <span className="text-xs mt-1">성경 목록</span>
        </Link>
        <Link
          href="/quiz"
          className={`flex flex-col items-center ${activeTab === "quiz" ? "text-amber-600" : "text-amber-400"}`}
        >
          <BookCheck className="h-6 w-6" />
          <span className="text-xs mt-1">퀴즈</span>
        </Link>
        <Link
          href="/profile"
          className={`flex flex-col items-center ${activeTab === "profile" ? "text-amber-600" : "text-amber-400"}`}
        >
          <Award className="h-6 w-6" />
          <span className="text-xs mt-1">내 프로필</span>
        </Link>
      </div>
    </nav>
  )
}

