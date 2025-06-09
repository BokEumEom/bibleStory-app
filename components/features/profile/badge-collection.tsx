import { Trophy } from "lucide-react"
import type { Badge } from "@/lib/types"
import { getLucideIcon } from "@/lib/utils"

interface BadgeCollectionProps {
  badges: Badge[]
}

export default function BadgeCollection({ badges }: BadgeCollectionProps) {
  return (
    <section className="px-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-amber-900 flex items-center">
          <Trophy className="h-5 w-5 text-amber-700 mr-2" />
          획득한 배지
        </h2>
        <span className="text-amber-600 text-sm">{badges.length}개 획득</span>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-4 gap-3">
          {badges.map((badge) => {
            const Icon = getLucideIcon(badge.icon)

            return (
              <div key={badge.id} className="flex flex-col items-center">
                <div className="bg-amber-100 rounded-full p-3 mb-2">
                  <Icon className="h-8 w-8 text-amber-600" />
                </div>
                <span className="text-xs text-amber-800 text-center line-clamp-2">{badge.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

