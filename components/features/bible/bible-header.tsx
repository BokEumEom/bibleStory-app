import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BibleHeader() {
  return (
    <header className="p-4 flex items-center">
      <Link href="/" className="p-2 -ml-2 mr-2">
        <ArrowLeft className="h-6 w-6 text-amber-800" />
      </Link>
      <h1 className="text-2xl font-bold text-amber-900">성경 목록</h1>
    </header>
  )
}

