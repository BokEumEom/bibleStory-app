import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as LucideIcons from "lucide-react"

// 클래스 이름 조합 유틸리티
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Lucide 아이콘 가져오기
export function getLucideIcon(iconName: string) {
  const icon = (LucideIcons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)] || LucideIcons.HelpCircle
  return icon
}

// 날짜 포맷팅
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// 읽기 시간 포맷팅
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return "1분 미만"
  } else if (minutes < 60) {
    return `${minutes}분`
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (remainingMinutes === 0) {
      return `${hours}시간`
    } else {
      return `${hours}시간 ${remainingMinutes}분`
    }
  }
}

