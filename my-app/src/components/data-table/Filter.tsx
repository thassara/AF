// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '../dropdownMenu';
// import { Button } from '../Button';
// import { Input } from '../input';
// import { Table } from '@tanstack/react-table';

// interface FiltersProps {
//   filters: { show: boolean; placeholder: string }[];
//   dropdownData: {
//     label: string;
//     checked: boolean;
//     onCheckedChange: (value: boolean) => void;
//   }[];
//   table: Table<any>;
// }

// export function Filters({ filters, dropdownData, table }: FiltersProps) {
//   return (
//     <div className="flex gap-2">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline">Filter</Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56">
//           <DropdownMenuLabel>Select Filter Method</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {dropdownData.map((item, index) => (
//             <DropdownMenuCheckboxItem
//               key={index}
//               checked={item.checked}
//               onCheckedChange={item.onCheckedChange}
//             >
//               {item.label}
//             </DropdownMenuCheckboxItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {filters
//         .filter((filter) => filter.show)
//         .map((filter, index) => {
//           const columnKey = filter.placeholder.toLowerCase().includes('amount')
//             ? 'amount'
//             : filter.placeholder.toLowerCase().includes('email')
//             ? 'email'
//             : 'status';
//           return (
//             <Input
//               key={index}
//               placeholder={filter.placeholder}
//               className="max-w-sm"
//               value={
//                 (table.getColumn(columnKey)?.getFilterValue() as string) ?? ''
//               }
//               onChange={(event) =>
//                 table.getColumn(columnKey)?.setFilterValue(event.target.value)
//               }
//             />
//           );
//         })}
//     </div>
//   );
// }

// import { useState } from 'react';
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '../dropdownMenu';
// import { Button } from '../Button';
// import { Input } from '../input';
// // import { Table } from '@tanstack/react-table';
// // import debounce from 'lodash.debounce';

// interface FiltersProps {
//   filters: { show: boolean; placeholder: string }[];
//   dropdownData: {
//     label: string;
//     checked: boolean;
//     onCheckedChange: (value: boolean) => void;
//   }[];
//   // table: Table<any>;
//   // fetchData: (filters: Record<string, string>) => Promise<any[]>;
//   onFilterChange: (filters: Record<string, string>) => void;
// }

// export function Filters({
//   filters,
//   dropdownData,
//   // table,
//   // fetchData,
//   onFilterChange,
// }: FiltersProps) {
//   const [filterValues, setFilterValues] = useState<Record<string, string>>({});

//   // // Debounced API call to fetch data
//   // const debouncedFetchData = debounce(
//   //   async (newFilters: Record<string, string>) => {
//   //     const data = await fetchData(newFilters); // Fetch new data based on filters
//   //     table.setState((prev) => ({ ...prev, data })); // Update table data
//   //   },
//   //   300
//   // );

//   const handleFilterChange = (columnKey: string, value: string) => {
//     const newFilterValues = { ...filterValues, [columnKey]: value };
//     setFilterValues(newFilterValues); // Update local state
//     // debouncedFetchData(newFilterValues); // Fetch filtered data
//     onFilterChange(newFilterValues);
//   };

//   return (
//     <div className="flex gap-2">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline">Filter</Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56">
//           <DropdownMenuLabel>Select Filter Method</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {dropdownData.map((item, index) => (
//             <DropdownMenuCheckboxItem
//               key={index}
//               checked={item.checked}
//               onCheckedChange={item.onCheckedChange}
//             >
//               {item.label}
//             </DropdownMenuCheckboxItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {filters
//         .filter((filter) => filter.show)
//         .map((filter, index) => {
//           const columnKey = filter.placeholder.toLowerCase().includes('amount')
//             ? 'amount'
//             : filter.placeholder.toLowerCase().includes('email')
//             ? 'email'
//             : 'status';
//           return (
//             <Input
//               key={index}
//               placeholder={filter.placeholder}
//               className="max-w-sm"
//               value={filterValues[columnKey] || ''}
//               onChange={(event) =>
//                 handleFilterChange(columnKey, event.target.value)
//               }
//             />
//           );
//         })}
//     </div>
//   );
// }

//-------------------------------------------------------------

// import { useState } from 'react';
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '../dropdownMenu';
// import { Button } from '../Button';
// import { Input } from '../input';

// interface FiltersProps {
//   filters: { show: boolean; placeholder: string }[];
//   dropdownData: {
//     label: string;
//     checked: boolean;
//     onCheckedChange: (value: boolean) => void;
//   }[];
//   onFilterChange: (filters: Record<string, string>) => void;
// }

// export function Filters({
//   filters,
//   dropdownData,
//   onFilterChange,
// }: FiltersProps) {
//   const [filterValues, setFilterValues] = useState<Record<string, string>>({});

//   const handleFilterChange = (columnKey: string, value: string) => {
//     const newFilterValues = { ...filterValues, [columnKey]: value };
//     setFilterValues(newFilterValues); // Update local state
//     onFilterChange(newFilterValues); // Trigger server-side filter update
//   };

//   return (
//     <div className="flex gap-2">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline">Filter</Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56">
//           <DropdownMenuLabel>Select Filter Method</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {dropdownData.map((item, index) => (
//             <DropdownMenuCheckboxItem
//               key={index}
//               checked={item.checked}
//               onCheckedChange={item.onCheckedChange}
//             >
//               {item.label}
//             </DropdownMenuCheckboxItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {filters
//         .filter((filter) => filter.show)
//         .map((filter, index) => {
//           const columnKey = filter.placeholder.toLowerCase().includes('amount')
//             ? 'amount'
//             : filter.placeholder.toLowerCase().includes('email')
//             ? 'email'
//             : 'status';
//           return (
//             <Input
//               key={index}
//               placeholder={filter.placeholder}
//               className="max-w-sm"
//               value={filterValues[columnKey] || ''}
//               onChange={(event) =>
//                 handleFilterChange(columnKey, event.target.value)
//               }
//             />
//           );
//         })}
//     </div>
//   );
// }

import React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface FiltersProps {
  filters: { key: string; show: boolean; placeholder: string }[];
  dropdownData: {
    label: string;
    checked: boolean;
    onCheckedChange: (value: boolean) => void;
  }[];
  onFilterChange: (filters: Record<string, string>) => void;
}

export function Filters({
  filters,
  dropdownData,
  onFilterChange,
}: FiltersProps) {
  const [filterValues, setFilterValues] = React.useState<
    Record<string, string>
  >({});

  const handleFilterChange = (key: string, value: string) => {
    const newFilterValues = { ...filterValues, [key]: value };
    setFilterValues(newFilterValues); // Update local state
    onFilterChange(newFilterValues); // Trigger server-side filter update
  };

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filter</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Filter</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {dropdownData.map((item, index) => (
            <DropdownMenuCheckboxItem
              key={index}
              checked={item.checked}
              onCheckedChange={item.onCheckedChange}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render active filters */}
      {filters
        .filter((filter) => filter.show)
        .map((filter) => (
          <Input
            key={filter.key}
            placeholder={filter.placeholder}
            className="max-w-sm"
            value={filterValues[filter.key] || ""}
            onChange={(event) =>
              handleFilterChange(filter.key, event.target.value)
            }
          />
        ))}
    </div>
  );
}

// import React, { useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";

// interface FiltersProps {
//   /** Array of all possible filters */
//   allFilters: { key: string; placeholder: string }[];
//   /** Callback invoked when filter values change */
//   onFilterChange: (filters: Record<string, string>) => void;
// }

// const FiltersComponent: React.FC<FiltersProps> = ({
//   allFilters,
//   onFilterChange,
// }) => {
//   // State for selected filters (keys of filters to show)
//   const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

//   // State for filter input values
//   const [filterValues, setFilterValues] = useState<Record<string, string>>({});

//   // Handle dropdown checkbox changes
//   const handleDropdownChange = (key: string, checked: boolean) => {
//     setSelectedFilters((prev) =>
//       checked ? [...prev, key] : prev.filter((k) => k !== key)
//     );
//   };

//   // Handle input value changes
//   const handleInputChange = (key: string, value: string) => {
//     const newFilterValues = { ...filterValues, [key]: value };
//     setFilterValues(newFilterValues);
//     onFilterChange(newFilterValues); // Notify parent of filter changes
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       {/* Dropdown for selecting filters */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline">Select Filters</Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56">
//           <DropdownMenuLabel>Select Filters to Apply</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {allFilters.map((filter) => (
//             <DropdownMenuCheckboxItem
//               key={filter.key}
//               checked={selectedFilters.includes(filter.key)}
//               onCheckedChange={(checked) =>
//                 handleDropdownChange(filter.key, checked)
//               }
//             >
//               {filter.placeholder}
//             </DropdownMenuCheckboxItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Dynamically render selected filters */}
//       <div className="flex flex-wrap gap-2">
//         {selectedFilters.map((key) => {
//           const filter = allFilters.find((f) => f.key === key);
//           if (!filter) return null;

//           return (
//             <Input
//               key={filter.key}
//               placeholder={filter.placeholder}
//               className="max-w-sm"
//               value={filterValues[filter.key] || ""}
//               onChange={(e) => handleInputChange(filter.key, e.target.value)}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export const Filters = React.memo(FiltersComponent);
