interface StoryProgressProps {
  currentSection: number
  totalSections: number
}

export default function StoryProgress({ currentSection, totalSections }: StoryProgressProps) {
  return (
    <div className="w-full h-1 bg-amber-200">
      <div
        className="h-1 bg-amber-600 transition-all duration-300"
        style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
      ></div>
    </div>
  )
}

