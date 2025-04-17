import React from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import { ArrowUpDown } from "lucide-react";
// import { Button } from "../ui/button";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "../ui/dropdown-menu";
// // import { MoreHorizontal } from "lucide-react";

// // import { Checkbox } from "../ui//checkbox";

// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

// export const columns: ColumnDef<Payment>[] = [
//   // {
//   //   id: "select",
//   //   header: ({ table }) => (
//   //     <Checkbox
//   //       checked={
//   //         table.getIsAllPageRowsSelected() ||
//   //         (table.getIsSomePageRowsSelected() && "indeterminate")
//   //       }
//   //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//   //       aria-label="Select all"
//   //     />
//   //   ),
//   //   cell: ({ row }) => (
//   //     <Checkbox
//   //       checked={row.getIsSelected()}
//   //       onCheckedChange={(value) => row.toggleSelected(!!value)}
//   //       aria-label="Select row"
//   //     />
//   //   ),
//   //   enableSorting: false,
//   //   enableHiding: false,
//   // },
//   {
//     id: "status",
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },

//   {
//     accessorKey: "amount",
//     header: () => <div className="">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"));
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount);

//       return <div className="font-medium">{formatted}</div>;
//     },
//     filterFn: (row, columnId, value) => {
//       const cellValue = Number(row.getValue(columnId));
//       const filterValue = Number(value);

//       return !isNaN(filterValue) && cellValue >= filterValue;
//     },
//   },
//   // {
//   //   id: "actions",
//   //   accessorKey: "actions",
//   //   header: "Actions",
//   //   cell: ({ row }) => {
//   //     const payment = row.original;
//   //     return (
//   //       <DropdownMenu>
//   //         <DropdownMenuTrigger asChild>
//   //           <Button variant="ghost" className="h-8 w-8 p-0">
//   //             <span className="sr-only">Open menu</span>
//   //             <MoreHorizontal className="h-4 w-4" />
//   //           </Button>
//   //         </DropdownMenuTrigger>
//   //         <DropdownMenuContent align="end">
//   //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//   //           <DropdownMenuItem
//   //             onClick={() => navigator.clipboard.writeText(payment.id)}
//   //           >
//   //             Copy payment ID
//   //           </DropdownMenuItem>
//   //           <DropdownMenuSeparator />
//   //           <DropdownMenuItem>View customer</DropdownMenuItem>
//   //           <DropdownMenuItem>View payment details</DropdownMenuItem>
//   //         </DropdownMenuContent>
//   //       </DropdownMenu>
//   //     );
//   //   },
//   // },
// ];

import { ColumnDef } from "@tanstack/react-table";

/**
 * A utility function to dynamically generate column definitions
 * @param keys - Array of keys from the data type to include as columns
 * @param customizations - Optional custom behaviors for specific keys
 * @returns Array of ColumnDef for the given keys
 */
export function createDynamicColumns<T>(
  keys: (keyof T)[],
  customizations: Partial<Record<keyof T, ColumnDef<T>>> = {}
): ColumnDef<T>[] {
  return keys.map((key) => {
    const customization = customizations[key];

    return (
      customization ?? {
        accessorKey: key as string,
        header: key.toString(),
        cell: ({ row }) => {
          const value = row.getValue(key as string);
          return <div>{value as React.ReactNode}</div>;
        },
      }
    );
  });
}
