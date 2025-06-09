"use client"

import { useState } from "react"
import { Pencil, Save } from "lucide-react"
import { getUserNotes, saveUserNote } from "@/lib/services/user-service"

interface StoryNotesProps {
  storyId: string
}

export default function StoryNotes({ storyId }: StoryNotesProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [noteText, setNoteText] = useState("")

  // 이 데이터는 실제로는 서버 컴포넌트에서 데이터베이스나 API에서 가져올 것입니다
  const existingNote = getUserNotes(storyId)

  const handleEditClick = () => {
    setNoteText(existingNote || "")
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    saveUserNote(storyId, noteText)
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
  }

  return (
    <section className="px-4 mb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-amber-900">내 노트</h2>
        {!isEditing && (
          <button onClick={handleEditClick} className="flex items-center text-amber-600 text-sm">
            <Pencil className="h-4 w-4 mr-1" />
            {existingNote ? "수정" : "작성"}
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full p-2 border border-amber-200 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="이 이야기에 대한 생각이나 느낌을 적어보세요..."
          />
          <div className="flex justify-end gap-2 mt-2">
            <button onClick={handleCancelClick} className="px-3 py-1 border border-amber-200 rounded-lg text-amber-700">
              취소
            </button>
            <button
              onClick={handleSaveClick}
              className="px-3 py-1 bg-amber-600 text-white rounded-lg flex items-center"
            >
              <Save className="h-4 w-4 mr-1" />
              저장
            </button>
          </div>
        </div>
      ) : existingNote ? (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-amber-800">{existingNote}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-dashed border-amber-300 text-center">
          <p className="text-amber-600">이 이야기에 대한 생각이나 느낌을 기록해보세요.</p>
        </div>
      )}
    </section>
  )
}

