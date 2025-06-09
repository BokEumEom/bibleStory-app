"use client"

import type React from "react"

import { Search, X } from "lucide-react"

interface SearchBarProps {
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}

export default function SearchBar({ placeholder, value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-5 w-5 text-amber-500" />
      </div>
      <input
        type="text"
        className="bg-white w-full pl-10 pr-10 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {value && (
        <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={onClear}>
          <X className="h-5 w-5 text-amber-500" />
        </button>
      )}
    </div>
  )
}

