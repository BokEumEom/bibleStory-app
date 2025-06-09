interface DailyVerseProps {
  verse: {
    text: string
    reference: string
  }
}

export default function DailyVerse({ verse }: DailyVerseProps) {
  return (
    <section className="px-4 mb-8">
      <div className="bg-amber-100/50 rounded-lg p-4">
        <h2 className="text-lg font-bold text-amber-900 mb-2">오늘의 말씀</h2>
        <p className="text-amber-800 italic mb-2">"{verse.text}"</p>
        <p className="text-right text-amber-700 text-sm">{verse.reference}</p>
      </div>
    </section>
  )
}

