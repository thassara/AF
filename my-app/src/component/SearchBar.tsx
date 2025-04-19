import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Dropdown } from './Dropdown'

interface SearchBarProps {
  onSearch: (query: string) => void
  selectedRegion: string
  setSelectedRegion: (region: string) => void
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  selectedRegion,
  setSelectedRegion,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const [query, setQuery] = useState('')

  const regions = [
    { value: 'region', label: 'Region' },
    { value: 'language', label: 'Language' },
    { value: 'non', label: 'Non' },
  ]

  return (
    <div className="w-full bg-card p-4 rounded-lg shadow">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="search"
              className="block w-full p-3 pl-10 text-sm text-foreground bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                const value = e.target.value
                setQuery(value)
                onSearch(value) // 🔥 Call on every change
              }}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Dropdown
              label="Filter"
              options={regions}
              value={selectedRegion}
              onChange={setSelectedRegion}
            />
          </div>
        </div>
        <div className="flex justify-end">
         
        </div>
      </form>
    </div>
  )
}
