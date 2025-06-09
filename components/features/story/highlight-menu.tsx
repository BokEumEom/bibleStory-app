"use client"

import { Edit, X } from "lucide-react"
import type { HighlightColor } from "@/types"

interface HighlightMenuProps {
  position: { x: number; y: number }
  onHighlight: (color: HighlightColor) => void
  onClose: () => void
}

export default function HighlightMenu({ position, onHighlight, onClose }: HighlightMenuProps) {
  const colors: { color: HighlightColor; bg: string; border: string }[] = [
    { color: "yellow", bg: "bg-yellow-200", border: "border-yellow-400" },
    { color: "green", bg: "bg-green-200", border: "border-green-400" },
    { color: "blue", bg: "bg-blue-200", border: "border-blue-400" },
    { color: "pink", bg: "bg-pink-200", border: "border-pink-400" },
    { color: "purple", bg: "bg-purple-200", border: "border-purple-400" },
  ]

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg p-2 flex items-center animate-fade"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translateX(-50%)",
      }}
    >
      <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700" aria-label="닫기">
        <X className="h-5 w-5" />
      </button>

      <div className="h-5 border-l border-gray-200 mx-1"></div>

      {colors.map(({ color, bg, border }) => (
        <button
          key={color}
          onClick={() => onHighlight(color)}
          className={`w-6 h-6 rounded-full mx-1 ${bg} ${border} border-2 hover:scale-110 transition-transform`}
          aria-label={`${color} 하이라이트`}
        />
      ))}

      <div className="h-5 border-l border-gray-200 mx-1"></div>

      <button className="p-2 text-amber-600 hover:text-amber-800" aria-label="노트 작성">
        <Edit className="h-5 w-5" />
      </button>
    </div>
  )
}

