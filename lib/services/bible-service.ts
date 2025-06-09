import type { BibleBook } from "@/lib/types"
import { bibleBooks } from "@/lib/data/mock-data"

// 모든 성경책 가져오기
export function getAllBibleBooks(): BibleBook[] {
  return bibleBooks
}

// 구약 성경책 가져오기
export function getOldTestamentBooks(): BibleBook[] {
  return bibleBooks.filter((book) => book.testament === "old")
}

// 신약 성경책 가져오기
export function getNewTestamentBooks(): BibleBook[] {
  return bibleBooks.filter((book) => book.testament === "new")
}

// ID로 성경책 가져오기
export function getBookById(id: string): BibleBook {
  const book = bibleBooks.find((book) => book.id === id)

  if (!book) {
    throw new Error(`Book with id ${id} not found`)
  }

  return book
}

// 책의 모든 이야기 가져오기
export function getStoriesByBookId(bookId: string) {
  // 실제로는 데이터베이스나 API에서 가져올 것입니다
  return []
}

