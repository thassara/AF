import React from 'react'
import { MapPinIcon, UsersIcon, GlobeIcon } from 'lucide-react'
type Country = {
  common: string
  Population: number
  region: string
  languages: string
  flags: string
  Capital: string
}
type CountryCardProps = {
  country: Country
  onClick: () => void
}
const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={country.flags}
          alt={`${country.common} flag`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {country.common}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <UsersIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {country.Population.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <GlobeIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">{country.region}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPinIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">{country.Capital}</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Languages: {country.languages}
          </p>
        </div>
      </div>
    </div>
  )
}
export default CountryCard
