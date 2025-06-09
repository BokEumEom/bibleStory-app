import Link from "next/link"
import Image from "next/image"
import { Bell, Search } from "lucide-react"
import { getUserProfile } from "@/lib/services/user-service"

export default function HomeHeader() {
  const userProfile = getUserProfile()

  return (
    <header className="p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-amber-900">성경 이야기</h1>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/search" className="p-2">
          <Search className="h-6 w-6 text-amber-700" />
        </Link>
        <Link href="/notifications" className="p-2 relative">
          <Bell className="h-6 w-6 text-amber-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Link>
        <Link href="/profile" className="ml-1">
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image src={userProfile.avatar || "/placeholder.svg"} alt="프로필 이미지" fill className="object-cover" />
          </div>
        </Link>
      </div>
    </header>
  )
}

