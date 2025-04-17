import React, { useEffect, useState } from "react";
import { DataTable } from "../components/data-table/DataTable";
import { createDynamicColumns } from "../components/data-table/Columns";
import { useAllcontryQuery } from "../features/API";

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
    <div className="flex flex-col space-y-4 p-4 sm:p-6 lg:p-6">
          <div>
        <div className="text-3xl text-center font-bold p-4 rounded-xl">
        All Contrys
        </div>
      </div>

         <div className="p-4 border rounded-lg shadow-md overflow-auto">
      <DataTable columns={columns} data={Allcontrysdata} showPagination={true} />
      </div>
    </div>
  );
};

export default AllCountrys;
