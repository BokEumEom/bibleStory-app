import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import type { BibleBook } from "@/lib/types"
import { getBookProgress } from "@/lib/services/user-service"

interface BookListProps {
  books: BibleBook[]
}

export default function BookList({ books }: BookListProps) {
  // 책별 읽기 진행 상황 가져오기
  const getProgress = (bookId: string) => {
    return getBookProgress(bookId)
  }

  return (
    <div className="px-4">
      <div className="grid grid-cols-1 gap-3">
        {books.map((book) => {
          const progress = getProgress(book.id)

          return (
            <Link
              key={book.id}
              href={`/bible/book/${book.id}`}
              className="flex bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="relative h-24 w-24 flex-shrink-0">
                <Image src={book.coverImage || "/placeholder.svg"} alt={book.name} fill className="object-cover" />
                {progress > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-amber-900/30">
                    <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center">
                      <span className="text-amber-900 font-bold">{progress}%</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-amber-800 text-lg">{book.name}</h3>
                    <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                      {book.testament === "old" ? "구약" : "신약"}
                    </span>
                  </div>
                  <p className="text-amber-700 text-sm">{book.description}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-amber-600">{book.totalChapters}개의 이야기</span>
                  <ChevronRight className="h-4 w-4 text-amber-600" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

