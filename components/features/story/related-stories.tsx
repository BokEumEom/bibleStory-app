import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import type { BibleStory } from "@/types"

interface RelatedStoriesProps {
  stories: BibleStory[]
}

export default function RelatedStories({ stories }: RelatedStoriesProps) {
  if (stories.length === 0) return null

  return (
    <section className="px-4 mb-8">
      <h2 className="text-xl font-bold text-amber-900 mb-3">관련 이야기</h2>

      <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 hide-scrollbar">
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0 w-40">
            <Link href={`/bible/story/${story.id}`} className="block">
              <div className="relative h-56 w-40 rounded-lg overflow-hidden shadow-sm mb-2">
                <Image src={story.coverImage || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent flex items-end">
                  <div className="p-3 text-white">
                    <div className="flex items-center mb-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="text-xs">{story.readingTime}분</span>
                    </div>
                    <h3 className="font-bold">{story.title}</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

