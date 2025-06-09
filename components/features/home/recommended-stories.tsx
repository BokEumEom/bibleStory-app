import Link from "next/link"
import Image from "next/image"
import { Clock, ChevronRight } from "lucide-react"
import type { BibleStory } from "@/lib/types"

interface RecommendedStoriesProps {
  stories: BibleStory[]
}

export default function RecommendedStories({ stories }: RecommendedStoriesProps) {
  return (
    <section className="px-4 mb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-amber-900">추천 이야기</h2>
        <Link href="/bible" className="text-amber-600 flex items-center text-sm font-medium">
          더보기 <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stories.map((story) => (
          <Link key={story.id} href={`/bible/story/${story.id}`} className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-32 w-full">
                <Image src={story.coverImage || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/70 to-transparent p-2">
                  <div className="flex items-center text-white text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{story.readingTime}분</span>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <h3 className="font-bold text-amber-800 line-clamp-1">{story.title}</h3>
                <p className="text-xs text-amber-600 line-clamp-1">{story.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

