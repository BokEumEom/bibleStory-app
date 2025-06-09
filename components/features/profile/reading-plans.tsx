import Link from "next/link"
import type { ReadingPlan } from "@/types"

interface ReadingPlansProps {
  plans: ReadingPlan[]
}

export default function ReadingPlans({ plans }: ReadingPlansProps) {
  if (plans.length === 0) return null

  return (
    <div className="space-y-3">
      {plans.map((plan) => (
        <Link key={plan.id} href={`/profile/reading-plans/${plan.id}`} className="block">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-amber-800">{plan.name}</h3>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{plan.progress}% 완료</span>
            </div>

            <p className="text-sm text-amber-700 mb-2 line-clamp-1">{plan.description}</p>

            <div className="w-full h-2 bg-amber-100 rounded-full">
              <div className="h-2 bg-amber-600 rounded-full" style={{ width: `${plan.progress}%` }}></div>
            </div>

            <div className="flex justify-between text-xs text-amber-600 mt-2">
              <span>시작: {new Date(plan.startDate).toLocaleDateString()}</span>
              <span>종료: {new Date(plan.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

