import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';

import { LoadingSkeleton } from '../components/LoadingSkeleton';


import { useAllcontryQuery, useLazyFliterbynameQuery, useLazyFliterbylanguageQuery, useLazyFliterbyregionQuery } from '../features/API';
import { useSelector } from 'react-redux';
import { useCountryController } from '../controller/APIcrtl';
import { useNavigate } from 'react-router-dom';
import { SearchFun } from "../components/SearchFun";

type Country = {
  common: string;
  Population: number;
  region: string;
  languages: string;
  flags: string;
  Capital: string;
};

const AllCountrys: React.FC = () => {
  const [Allcontrysdata, setAllcontrysdata] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  const { data: alls } = useAllcontryQuery({ skip: false });
  const [, searchresult] = useLazyFliterbynameQuery();
  const [] = useLazyFliterbylanguageQuery();
  const [] = useLazyFliterbyregionQuery();

  const inputData = useSelector((state: any) => state.inputs.inputData);
  const searchData = inputData.searchdata;
  const filterData = inputData.fliter;
  const navigate = useNavigate();

  useCountryController(searchData, filterData, setAllcontrysdata);

  useEffect(() => {
    if (searchresult.data && Array.isArray(searchresult.data)) {
      const formatted = searchresult.data.map((country: any) => ({
        common: country.name?.common || "N/A",
        Population: country.population || 0,
        region: country.region || "N/A",
        languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
        flags: country.flags?.png || "",
        Capital: country.capital?.[0] || "N/A",
      }));
      setAllcontrysdata(formatted);
    }
  }, [searchresult.data]);

  useEffect(() => {
    if (alls && Array.isArray(alls)) {
      const formatted = alls.map((country: any) => ({
        common: country.name?.common || "N/A",
        Population: country.population || 0,
        region: country.region || "N/A",
        languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
        flags: country.flags?.png || "",
        Capital: country.capital?.[0] || "N/A",
      }));
      setAllcontrysdata(formatted);
      setIsLoading(false);
    }
  }, [alls]);

  const handleCountryClick = (country: Country) => {
    navigate(`/country`, { state: { countryName: country.common } });
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-end items-center">
        
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center tracking-widest text-gray-800 dark:text-gray-200 bg-blue-100 dark:bg-blue-900 p-4 rounded-xl shadow-sm">
          A L L &nbsp; C O U N T R I E S
        </h2>
      </div>

      <div>
      <SearchFun />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading
          ? Array(8).fill(0).map((_, i) => <LoadingSkeleton key={i} />)
          : Allcontrysdata.map((country) => (
              <CountryCard
                key={country.common}
                country={country}
                onClick={() => handleCountryClick(country)}
              />
            ))}
      </div>

      {!isLoading && Allcontrysdata.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No countries found matching your search criteria
        </div>
      )}
    </div>
  );
};

export default AllCountrys;
