import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MapPin,
  Globe,
  Users,
  Clock,
  Car,
  Flag,
  Coins,
  Map,
  Languages,
} from 'lucide-react';

import { useLazyFliterbynameQuery } from '../features/API';
import { CountryHeader } from '../components/CountryHeader';
import { InfoCard } from '../components/InfoCard';
import { CountryMap } from '../components/CountryMap';

const CountryDashboard: React.FC = () => {
  const [getByName, nameResult] = useLazyFliterbynameQuery();
  const location = useLocation();
  const countryName = location.state?.countryName;

  useEffect(() => {
    if (countryName) {
      getByName(countryName);
    }
  }, [countryName]);

  const countryData = nameResult.data?.[0];

  const cardColors = [
    'bg-blue-200',
    'bg-purple-400',
    'bg-green-400',
    'bg-yellow-300',
    'bg-red-400',
    'bg-indigo-400',
  ];

  if (nameResult.isLoading) {
    return <div className="p-8 text-center text-lg">Loading...</div>;
  }

  if (!countryData) {
    return <div className="p-8 text-center text-red-600">Country data not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full">
      <div className="container mx-auto px-4 py-8">
        <CountryHeader
          name={countryData.name}
          flagUrl={countryData.flags?.png}
          flagAlt={countryData.flags?.alt}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: 'Capital',
              value: countryData.capital?.[0],
              icon: <MapPin className="h-5 w-5" />,
              color: cardColors[0],
            },
            {
              title: 'Region',
              value: `${countryData.region}, ${countryData.subregion}`,
              icon: <Globe className="h-5 w-5" />,
              color: cardColors[1],
            },
            {
              title: 'Population',
              value: countryData.population?.toLocaleString(),
              icon: <Users className="h-5 w-5" />,
              color: cardColors[2],
            },
            {
              title: 'Area',
              value: `${countryData.area?.toLocaleString()} km²`,
              icon: <Map className="h-5 w-5" />,
              color: cardColors[3],
            },
            {
              title: 'Timezone',
              value: countryData.timezones?.[0],
              icon: <Clock className="h-5 w-5" />,
              color: cardColors[4],
            },
            {
              title: 'Driving Side',
              value:
                countryData.car?.side.charAt(0).toUpperCase() +
                countryData.car?.side.slice(1),
              icon: <Car className="h-5 w-5" />,
              color: cardColors[5],
            },
          ].map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              gradient={card.color}
            />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg shadow-md p-6 border border-purple-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-purple-700">
              <Languages className="h-5 w-5 mr-2" />
              Languages
            </h2>
            <div className="space-y-2">
              {countryData.languages &&
                Object.entries(countryData.languages).map(([code, language]) => (
                  <div
                    key={code}
                    className="flex justify-between bg-white p-3 rounded-lg shadow-sm"
                  >
                    <span className="text-purple-600 font-medium">
                      {code.toUpperCase()}:
                    </span>
                    <span className="font-medium text-purple-900">
                      {String(language)}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-md p-6 border border-blue-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-700">
              <Coins className="h-5 w-5 mr-2" />
              Currency
            </h2>
            {countryData.currencies &&
              Object.entries(countryData.currencies).map(([code, currency]) => (
                <div key={code} className="space-y-2">
                  {[
                    { label: 'Code', value: code },
                    { label: 'Name', value: currency.name },
                    { label: 'Symbol', value: currency.symbol },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between bg-white p-3 rounded-lg shadow-sm"
                    >
                      <span className="text-blue-600">{item.label}:</span>
                      <span className="font-medium text-blue-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-md p-6 border border-green-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-green-700">
              <Map className="h-5 w-5 mr-2" />
              Location
            </h2>
            <CountryMap
              latlng={countryData.latlng}
              name={countryData.name?.common}
            />
          </div>
        </div>

        {countryData.borders && countryData.borders.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-md p-6 border border-orange-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-orange-700">
              <Flag className="h-5 w-5 mr-2" />
              Borders
            </h2>
            <div className="flex flex-wrap gap-2">
              {countryData.borders.map((border) => (
                <span
                  key={border}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-medium shadow-sm"
                >
                  {border}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDashboard;
