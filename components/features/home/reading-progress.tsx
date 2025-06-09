import type { ReadingPlan } from "@/lib/types"

interface ReadingProgressProps {
  readingPlan: ReadingPlan
}

export default function ReadingProgress({ readingPlan }: ReadingProgressProps) {
  return (
    <section className="px-4 mb-6">
      <div className="bg-amber-100 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-amber-900">오늘의 읽기 목표</h2>
          <span className="text-sm text-amber-700">{readingPlan.progress}% 완료</span>
        </div>

        <div className="w-full h-2 bg-amber-200 rounded-full mb-3">
          <div className="h-2 bg-amber-600 rounded-full" style={{ width: `${readingPlan.progress}%` }}></div>
        </div>

        <div className="flex justify-between text-xs text-amber-700">
          <span>시작: {new Date(readingPlan.startDate).toLocaleDateString()}</span>
          <span>종료: {new Date(readingPlan.endDate).toLocaleDateString()}</span>
        </div>
      </div>
    </section>
  )
}

