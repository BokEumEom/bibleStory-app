"use client"

import { Play, Pause, ChevronLeft, ChevronRight, Settings } from "lucide-react"

interface StoryControlsProps {
  isVisible: boolean
  isPlaying: boolean
  toggleAudio: () => void
  prevSection: () => void
  nextSection: () => void
  currentSection: number
  totalSections: number
  onSettingsClick: () => void
}

export default function StoryControls({
  isVisible,
  isPlaying,
  toggleAudio,
  prevSection,
  nextSection,
  currentSection,
  totalSections,
  onSettingsClick,
}: StoryControlsProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-amber-200 p-4 transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={prevSection}
          disabled={currentSection === 0}
          className={`p-2 rounded-full ${currentSection === 0 ? "text-amber-300" : "text-amber-700"}`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="flex items-center">
          <button
            onClick={toggleAudio}
            className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </button>
        </div>

        <button
          onClick={nextSection}
          disabled={currentSection === totalSections - 1}
          className={`p-2 rounded-full ${currentSection === totalSections - 1 ? "text-amber-300" : "text-amber-700"}`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-amber-700">
          {currentSection + 1} / {totalSections}
        </span>
        <button onClick={onSettingsClick} className="p-2 text-amber-700">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

