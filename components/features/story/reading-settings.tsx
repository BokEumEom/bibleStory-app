"use client"

import { X } from "lucide-react"
import type { PageTransition } from "@/types"

interface ReadingSettingsProps {
  fontSize: "small" | "medium" | "large"
  pageTransition: PageTransition
  setFontSize: (size: "small" | "medium" | "large") => void
  setPageTransition: (transition: PageTransition) => void
  onClose: () => void
}

export default function ReadingSettings({
  fontSize,
  pageTransition,
  setFontSize,
  setPageTransition,
  onClose,
}: ReadingSettingsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center animate-fade">
      <div className="bg-white rounded-t-xl w-full p-4 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-amber-900">읽기 설정</h3>
          <button onClick={onClose} className="p-2 -mr-2" aria-label="닫기">
            <X className="h-6 w-6 text-amber-800" />
          </button>
        </div>

        <div className="mb-4">
          <h4 className="text-amber-800 font-medium mb-2">글자 크기</h4>
          <div className="flex gap-3">
            <button
              onClick={() => setFontSize("small")}
              className={`flex-1 py-2 border rounded-lg text-center transition-all ${
                fontSize === "small"
                  ? "border-amber-600 bg-amber-50 text-amber-800 font-medium"
                  : "border-amber-200 text-amber-600"
              }`}
            >
              작게
            </button>
            <button
              onClick={() => setFontSize("medium")}
              className={`flex-1 py-2 border rounded-lg text-center transition-all ${
                fontSize === "medium"
                  ? "border-amber-600 bg-amber-50 text-amber-800 font-medium"
                  : "border-amber-200 text-amber-600"
              }`}
            >
              중간
            </button>
            <button
              onClick={() => setFontSize("large")}
              className={`flex-1 py-2 border rounded-lg text-center transition-all ${
                fontSize === "large"
                  ? "border-amber-600 bg-amber-50 text-amber-800 font-medium"
                  : "border-amber-200 text-amber-600"
              }`}
            >
              크게
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-amber-800 font-medium mb-2">페이지 전환 효과</h4>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setPageTransition("slide")}
              className={`flex-1 py-2 border rounded-lg text-center transition-all ${
                pageTransition === "slide"
                  ? "border-amber-600 bg-amber-50 text-amber-800 font-medium"
                  : "border-amber-200 text-amber-600"
              }`}
            >
              슬라이드
            </button>
            <button
              onClick={() => setPageTransition("fade")}
              className={`flex-1 py-2 border rounded-lg text-center transition-all ${
                pageTransition === "fade"
                  ? "border-amber-600 bg-amber-50 text-amber-800 font-medium"
                  : "border-amber-200 text-amber-600"
              }`}
            >
              페이드
            </button>
            <button
              onClick={() => setPageTransition("flip")}
              className={`flex-1 py-2 border rounded-lg text-center transition-all ${
                pageTransition === "flip"
                  ? "border-amber-600 bg-amber-50 text-amber-800 font-medium"
                  : "border-amber-200 text-amber-600"
              }`}
            >
              플립
            </button>
            <button
              onClick={() => setPageTransition("none")}
              className={`flex-1 py-2 border rounded-lg text-center transition-all ${
                pageTransition === "none"
                  ? "border-amber-600 bg-amber-50 text-amber-800 font-medium"
                  : "border-amber-200 text-amber-600"
              }`}
            >
              없음
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-amber-800 font-medium mb-2">배경 색상</h4>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-amber-600"></div>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200"></button>
            <button className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200"></button>
            <button className="w-10 h-10 rounded-full bg-green-50 border border-green-200"></button>
            <button className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700"></button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-amber-600 text-white rounded-lg font-medium transition-colors hover:bg-amber-700"
        >
          설정 저장
        </button>
      </div>
    </div>
  )
}

