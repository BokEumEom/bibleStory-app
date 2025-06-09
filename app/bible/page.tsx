"use client"

import { useState } from "react"
import { Filter, ChevronDown, ChevronRight } from "lucide-react"
import BottomNavigation from "@/components/common/bottom-navigation"
import BibleHeader from "@/components/features/bible/bible-header"
import TestamentTabs from "@/components/features/bible/testament-tabs"
import BookList from "@/components/features/bible/book-list"
import SearchBar from "@/components/common/search-bar"
import { getAllBibleBooks } from "@/lib/services/bible-service"

export default function BibleListPage() {
  const [activeTestament, setActiveTestament] = useState<"all" | "old" | "new">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // 이 데이터는 실제로는 서버 컴포넌트에서 데이터베이스나 API에서 가져올 것입니다
  const allBooks = getAllBibleBooks()

  // 선택된 testament와 검색어에 따라 책 필터링
  const filteredBooks = allBooks.filter((book) => {
    const testamentMatch = activeTestament === "all" || book.testament === activeTestament
    const searchMatch =
      searchQuery === "" ||
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase())
    return testamentMatch && searchMatch
  })

  return (
    <main className="flex flex-col min-h-screen bg-amber-50">
      <div className="flex-1 pb-20">
        <BibleHeader />

        {/* 검색 바 */}
        <div className="px-4 mb-4">
          <SearchBar
            placeholder="성경책 또는 이야기 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery("")}
          />
        </div>

        {/* 필터 버튼 */}
        <div className="px-4 mb-4">
          <button className="flex items-center text-amber-800 font-medium" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-1" />
            필터
            {showFilters ? <ChevronDown className="h-4 w-4 ml-1" /> : <ChevronRight className="h-4 w-4 ml-1" />}
          </button>

          {showFilters && (
            <div className="mt-2 p-3 bg-white rounded-lg shadow-sm">
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">읽지 않은 이야기</button>
                <button className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">짧은 이야기</button>
                <button className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">인기 이야기</button>
                <button className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">
                  최근 추가된 이야기
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 구약/신약 탭 */}
        <TestamentTabs activeTestament={activeTestament} onChange={setActiveTestament} />

        {/* 성경책 목록 */}
        <BookList books={filteredBooks} />
      </div>

      <BottomNavigation activeTab="bible" />
    </main>
  )
}

