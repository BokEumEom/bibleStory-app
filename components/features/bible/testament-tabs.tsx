"use client"

interface TestamentTabsProps {
  activeTestament: "all" | "old" | "new"
  onChange: (testament: "all" | "old" | "new") => void
}

export default function TestamentTabs({ activeTestament, onChange }: TestamentTabsProps) {
  return (
    <div className="px-4 mb-4">
      <div className="flex bg-amber-100 rounded-lg p-1">
        <button
          className={`flex-1 py-2 rounded-md text-center ${
            activeTestament === "all" ? "bg-amber-600 text-white font-medium" : "text-amber-800"
          }`}
          onClick={() => onChange("all")}
        >
          전체
        </button>
        <button
          className={`flex-1 py-2 rounded-md text-center ${
            activeTestament === "old" ? "bg-amber-600 text-white font-medium" : "text-amber-800"
          }`}
          onClick={() => onChange("old")}
        >
          구약
        </button>
        <button
          className={`flex-1 py-2 rounded-md text-center ${
            activeTestament === "new" ? "bg-amber-600 text-white font-medium" : "text-amber-800"
          }`}
          onClick={() => onChange("new")}
        >
          신약
        </button>
      </div>
    </div>
  )
}

