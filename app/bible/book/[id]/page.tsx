import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BookOpen, Clock } from "lucide-react"
import { getBookById } from "@/lib/services/bible-service"
import { getBookProgress } from "@/lib/services/user-service"
import { bibleStories } from "@/lib/data/mock-data"

export default function BookDetailPage({ params }: { params: { id: string } }) {
  // 이 데이터는 실제로는 서버 컴포넌트에서 데이터베이스나 API에서 가져올 것입니다
  const book = getBookById(params.id)
  const progress = getBookProgress(params.id)

  // 해당 책의 이야기들 가져오기 (임시로 필터링)
  const stories = bibleStories.filter((story) => story.bookId === params.id)

  return (
    <main className="flex flex-col min-h-screen bg-amber-50">
      <div className="flex-1 pb-20">
        {/* 헤더 */}
        <header className="p-4 flex items-center">
          <Link href="/bible" className="p-2 -ml-2 mr-2">
            <ArrowLeft className="h-6 w-6 text-amber-800" />
          </Link>
          <h1 className="text-2xl font-bold text-amber-900">{book.name}</h1>
        </header>

        {/* 책 정보 */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-40 w-full">
              <Image src={book.coverImage || "/placeholder.svg"} alt={book.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <span className="text-xs bg-amber-600 px-2 py-1 rounded-full mb-2 inline-block">
                    {book.testament === "old" ? "구약" : "신약"}
                  </span>
                  <h2 className="text-2xl font-bold">{book.name}</h2>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-amber-800 mb-3">{book.description}</p>

              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-amber-700">읽기 진행률</span>
                <span className="text-sm font-medium text-amber-900">{progress}%</span>
              </div>

              <div className="w-full h-2 bg-amber-100 rounded-full">
                <div className="h-2 bg-amber-600 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 이야기 목록 */}
        <div className="px-4">
          <h2 className="text-xl font-bold text-amber-900 mb-3">이야기 목록</h2>

          <div className="grid grid-cols-1 gap-3">
            {stories.length > 0 ? (
              stories.map((story) => (
                <Link
                  key={story.id}
                  href={`/bible/story/${story.id}`}
                  className="flex bg-white rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={story.coverImage || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <h3 className="font-bold text-amber-800">{story.title}</h3>
                    <p className="text-sm text-amber-700 line-clamp-1">{story.summary}</p>
                    <div className="flex items-center mt-1 text-xs text-amber-600">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{story.readingTime}분</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-white rounded-lg p-4 text-center text-amber-700">
                <BookOpen className="h-10 w-10 mx-auto mb-2 text-amber-400" />
                <p>아직 이 책에 이야기가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

