import Link from "next/link"
import Image from "next/image"
import { Bell, Settings } from "lucide-react"
import type { UserProfile } from "@/lib/types"

interface ProfileHeaderProps {
  userProfile: UserProfile
}

export default function ProfileHeader({ userProfile }: ProfileHeaderProps) {
  return (
    <header className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-900">내 프로필</h1>
        <div className="flex gap-2">
          <Link href="/notifications" className="p-2 bg-white rounded-full">
            <Bell className="h-5 w-5 text-amber-700" />
          </Link>
          <Link href="/settings" className="p-2 bg-white rounded-full">
            <Settings className="h-5 w-5 text-amber-700" />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm mb-6 flex items-center">
        <div className="relative h-20 w-20 rounded-full overflow-hidden mr-4">
          <Image src={userProfile.avatar || "/placeholder.svg"} alt="프로필 이미지" fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-amber-900">{userProfile.name}</h2>
          <p className="text-amber-700">{new Date(userProfile.joinDate).toLocaleDateString()}부터 함께하는 중</p>
          <div className="flex items-center mt-1">
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              {userProfile.readingStreak}일 연속 읽기 중
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

