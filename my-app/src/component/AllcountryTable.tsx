import React, { useEffect, useState } from "react";
import { DataTable } from "../components/data-table/DataTable";
import { createDynamicColumns } from "../components/data-table/Columns";
import { useAllcontryQuery, useLazyFliterbynameQuery,  useLazyFliterbylanguageQuery,useLazyFliterbyregionQuery, } from "../features/API";
import { SearchFun } from "./SearchFun";
import { useSelector } from 'react-redux';
import { useCountryController } from "../controller/APIcrtl";
import { useNavigate } from "react-router-dom";

type Allcontry = {
  common: string;
  Population: number;
  region: string;
  languages: string;
  flags: string;
  Capital: string;
};

const AllCountrys: React.FC = () => {
  const [Allcontrysdata, setAllcontrysdata] = useState<Allcontry[]>([]);
  const { data: alls } = useAllcontryQuery({ skip: false });
  const [useflitername, searchresult] = useLazyFliterbynameQuery();
  const [usefliterlanguage, searchresultlanguage] = useLazyFliterbylanguageQuery();
  const [usefliterregion, searchresultregion] = useLazyFliterbyregionQuery();
  const navigate = useNavigate();
  const inputData = useSelector((state: any) => state.inputs.inputData );
 
const searchData = inputData.searchdata;
const filterData = inputData.fliter;

console.log("searchData", searchData);
console.log("filterData", filterData);

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
    }
  }, [alls]);
  
  const handleRowClick = (row: Allcontry) => {
    navigate(`/dashboard/contry`, {
      state: { countryName: row.common }
    });
  };
  
  

  
  const columns = createDynamicColumns<Allcontry>(
    ["common", "Population", "region", "languages", "flags", "Capital"],
    {
      common: {
        accessorKey: "common",
        header: "Country Name",
      },
      Population: {
        accessorKey: "Population",
        header: "Population",
      },
      region: {
        accessorKey: "region",
        header: "Region",
      },
      languages: {
        accessorKey: "languages",
        header: "Languages",
      },
      flags: {
        accessorKey: "flags",
        header: "Flag",
        cell: ({ row }) => (
          <img
            src={row.original.flags}
            alt={`${row.original.common} flag`}
            width={40}
            height={30}
          />
        ),
      },
      Capital: {
        accessorKey: "Capital",
        header: "Capital",
      },
    }
  );

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
         <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center tracking-widest text-gray-800 bg-blue-100 p-4 rounded-xl shadow-sm">
          A L L &nbsp; C O U N T R I E S
        </h2>
      </div>
      <div>
        <SearchFun />
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md overflow-x-auto">
        <DataTable columns={columns} data={Allcontrysdata} showPagination={true} onRowClick={handleRowClick}/>
      </div>
  
    </div>
  );
  
  
};

export default AllCountrys;
