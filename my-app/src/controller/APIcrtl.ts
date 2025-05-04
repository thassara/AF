import { useEffect } from 'react';

interface CountryData {
  common: string;
  Population: number;
  region: string;
  languages: string;
  flags: string;
  Capital: string;
}
import { useAllcontryQuery, useLazyFliterbynameQuery, useLazyFliterbylanguageQuery, useLazyFliterbyregionQuery,useLazyFliterbycodeQuery } from "../features/API";

export const useCountryController = (searchData: string, filter: string, setData: (data: any) => void) => {
  const { data: allCountries } = useAllcontryQuery({ skip: false });
  const [getByName, nameResult] = useLazyFliterbynameQuery();
  const [getByRegion, regionResult] = useLazyFliterbyregionQuery();
  const [getByLanguage, languageResult] = useLazyFliterbylanguageQuery();
  const [getBycode, codeResult] = useLazyFliterbycodeQuery();
 // const [getall, getalldata] = useLazyFliterbylanguageQuery();

  console.log("controller", filter);
  console.log("controller search", searchData);

  useEffect(() => {
    if (searchData && !filter) {
      getByName(searchData);
    } else if (filter && searchData) {
     
      if (filter == "language" ) {
        getByLanguage(searchData); 
      } else if (filter == "region") {
        getByRegion(searchData); 
      }
      else if (filter == "code") {
        getBycode(searchData); 
      }
      else if (filter == "non") {
        getByName(searchData); 
      }
    } 
    else if (searchData == "" && filter == "") {
        useAllcontryQuery({ skip: false });
    }
  }, [searchData, filter]);

  useEffect(() => {
    if (nameResult.data) {
      const formatted = nameResult.data.map((country: any) => ({
        common: country.name?.common || "N/A",
        Population: country.population || 0,
        region: country.region || "N/A",
        languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
        flags: country.flags?.png || "",
        Capital: country.capital?.[0] || "N/A",
      }));

      if (filter) {
        const filtered = formatted.filter(
          (item: CountryData) =>
            item.region === filter ||
            item.languages.toLowerCase().includes(filter.toLowerCase())
        );
        setData(filtered);
      } else {
        setData(formatted);
      }
    }
  }, [nameResult.data]);

  useEffect(() => {
    if (regionResult.data) {
      const formatted = regionResult.data.map((country: any) => ({
        common: country.name?.common || "N/A",
        Population: country.population || 0,
        region: country.region || "N/A",
        languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
        flags: country.flags?.png || "",
        Capital: country.capital?.[0] || "N/A",
      }));
      setData(formatted);
    }
  }, [regionResult.data]);

  useEffect(() => {
    if (languageResult.data) {
      const formatted = languageResult.data.map((country: any) => ({
        common: country.name?.common || "N/A",
        Population: country.population || 0,
        region: country.region || "N/A",
        languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
        flags: country.flags?.png || "",
        Capital: country.capital?.[0] || "N/A",
      }));
      setData(formatted);
    }
  }, [languageResult.data]);

  useEffect(() => {
    if (codeResult.data) {
      const formatted = codeResult.data.map((country: any) => ({
        common: country.name?.common || "N/A",
        Population: country.population || 0,
        region: country.region || "N/A",
        languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
        flags: country.flags?.png || "",
        Capital: country.capital?.[0] || "N/A",
      }));
      setData(formatted);
    }
  }, [codeResult.data]);

  useEffect(() => {
    if (!searchData && !filter && allCountries) {
      const formatted = allCountries.map((country: any) => ({
        common: country.name?.common || "N/A",
        Population: country.population || 0,
        region: country.region || "N/A",
        languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
        flags: country.flags?.png || "",
        Capital: country.capital?.[0] || "N/A",
      }));
      setData(formatted);
    }
  }, [allCountries]);
};
