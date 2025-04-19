import React, { useEffect, useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
interface Option {
  value: string
  label: string
}
interface DropdownProps {
  label: string
  options: Option[]
  value: string
  onChange: (value: string) => void
}
export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const selectedOption = options.find((option) => option.value === value)
  return (
    <div className="relative min-w-[180px]" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between w-full p-2.5 text-sm border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-muted-foreground">
          {selectedOption ? selectedOption.label : label}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-background border border-input rounded-lg shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary ${value === option.value ? 'bg-secondary/50' : ''}`}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
