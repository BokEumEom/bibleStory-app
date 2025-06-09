import type React from "react"
import { render, screen } from "@testing-library/react"
import BottomNavigation from "@/components/navigation/bottom-navigation"

// 링크 컴포넌트 모킹
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe("BottomNavigation", () => {
  it("renders all navigation items", () => {
    render(<BottomNavigation activeTab="home" />)

    expect(screen.getByText("홈")).toBeInTheDocument()
    expect(screen.getByText("성경 목록")).toBeInTheDocument()
    expect(screen.getByText("퀴즈")).toBeInTheDocument()
    expect(screen.getByText("내 프로필")).toBeInTheDocument()
  })

  it("highlights the active tab", () => {
    render(<BottomNavigation activeTab="bible" />)

    const homeLink = screen.getByText("홈").parentElement
    const bibleLink = screen.getByText("성경 목록").parentElement

    expect(homeLink).not.toHaveClass("text-amber-600")
    expect(bibleLink).toHaveClass("text-amber-600")
  })
})

