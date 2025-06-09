import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import type { BibleStory } from "@/types"

interface StoryCardProps {
  story: BibleStory
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/bible/story/${story.id}`} className="block">
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
  )
}

