import React, { useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import { useDispatch } from 'react-redux'
import { inputActions } from '../features/SearchSlice'

export function SearchFun() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterdata, setFilterdata] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const dispatch = useDispatch()

  // Debounce search query
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery !== '' || filterdata !== '') {
        dispatch(
          inputActions.setdata({
            searchdata: searchQuery,
            fliter: filterdata,
          })
        )
      }
    }, 300) // wait 300ms after last keystroke

    return () => clearTimeout(delayDebounce)
  }, [searchQuery, filterdata, dispatch])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <SearchBar
          onSearch={handleSearch}
          selectedRegion={filterdata}
          setSelectedRegion={setFilterdata}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>
    </div>
  )
}
