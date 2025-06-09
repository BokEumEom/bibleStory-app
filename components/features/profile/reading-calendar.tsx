import type { ReadingHistory } from "@/types"

interface ReadingCalendarProps {
  readingHistory: ReadingHistory[]
}

export default function ReadingCalendar({ readingHistory }: ReadingCalendarProps) {
  // 현재 날짜 기준으로 최근 4주 날짜 생성
  const generateCalendarDays = () => {
    const days = []
    const today = new Date()

    for (let i = 27; i >= 0; i--) {
      const date = new Date()
      date.setDate(today.getDate() - i)

      // 해당 날짜에 읽은 기록이 있는지 확인
      const hasRead = readingHistory.some((history) => new Date(history.date).toDateString() === date.toDateString())

      days.push({
        date,
        hasRead,
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-7 gap-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-center text-xs text-amber-700 mb-1">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`h-9 rounded-md flex items-center justify-center ${
              day.hasRead ? "bg-amber-500" : "bg-amber-100"
            }`}
          >
            <span className={day.hasRead ? "text-white" : "text-amber-800"}>{day.date.getDate()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

