interface CountryHeaderProps {
  name: {
    common: string
    official: string
  }
  flagUrl: string
  flagAlt: string
}
export function CountryHeader({ name, flagUrl, flagAlt }: CountryHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-300 to-purple-300 rounded-lg shadow-lg p-8 text-white">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <img
            src={flagUrl}
            alt={flagAlt}
            className="h-32 md:h-40 rounded-lg shadow-2xl ring-4 ring-white/20"
          />
        </div>
        <div className="w-full md:w-2/3 mt-6 md:mt-0 text-center md:text-left md:pl-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {name.common}
          </h1>
          <p className="text-lg text-indigo-100 mt-2 font-medium">
            {name.official}
          </p>
        </div>
      </div>
    </div>
  )
}
