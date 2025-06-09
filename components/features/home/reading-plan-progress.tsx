import Link from "next/link"
import type { ReadingPlan } from "@/lib/types"

interface ReadingPlanProgressProps {
  plan: ReadingPlan
}

export default function ReadingPlanProgress({ plan }: ReadingPlanProgressProps) {
  return (
    <section className="px-4 mb-8">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-bold text-amber-900 mb-3">{plan.name}</h2>
        <p className="text-amber-700 mb-3">{plan.description}</p>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-amber-700">진행률</span>
          <span className="text-sm font-medium text-amber-900">{plan.progress}%</span>
        </div>

        <div className="w-full h-2 bg-amber-100 rounded-full mb-4">
          <div className="h-2 bg-amber-600 rounded-full" style={{ width: `${plan.progress}%` }}></div>
        </div>

        <Link
          href="/profile/reading-plans"
          className="block w-full py-2 bg-amber-100 text-amber-800 rounded-lg text-center font-medium"
        >
          계획 자세히 보기
        </Link>
      </div>
    </section>
  )
}

