
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Filters } from "./Filter";
import { useFormat } from "../../hooks/use-format";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showPagination?: boolean;
  showFiltering?: boolean;
  filters?: string[];
  filterNames?: string[]; // Change filterNames to an array
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showPagination,
  showFiltering,
  filterNames = [],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [tableData, setTableData] = React.useState(data);

  const [showFilters, setShowFilters] = React.useState<Record<string, boolean>>(
    filterNames.reduce((acc, name) => ({ ...acc, [name]: false }), {})
  );
  const { formatTitleCase } = useFormat();

  const fetchData = React.useCallback(
    async (filters: Record<string, string>) => {
      const filteredData = data.filter((row) =>
        Object.entries(filters).every(([key, value]) => {
          const cellValue = row[key as keyof TData];
          return String(cellValue)
            .toLowerCase()
            .includes(String(value).toLowerCase());
        })
      );
      setTableData(filteredData);
    },
    [data]
  );

  React.useEffect(() => {
    const filtersObject = columnFilters.reduce(
      (acc, filter) => ({ ...acc, [filter.id]: filter.value as string }),
      {} as Record<string, string>
    );
    fetchData(filtersObject);
  }, [columnFilters, fetchData]);

  const handleFilterChange = React.useCallback(
    (filters: Record<string, string>) => {
      const filteredData = data.filter((row) =>
        Object.entries(filters).every(([key, value]) => {
          const cellValue = row[key as keyof TData];
          return String(cellValue)
            .toLowerCase()
            .includes(String(value).toLowerCase());
        })
      );
      setTableData(filteredData);
    },
    [data]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  // Generate filters dynamically
  const filters = filterNames.map((name) => ({
    key: name,
    show: !!showFilters[name],
    placeholder: `Filter ${name}...`,
  }));

  const dropdownData = filterNames.map((name) => ({
    label: formatTitleCase(name),
    checked: !!showFilters[name],
    onCheckedChange: (checked: boolean) =>
      setShowFilters((prev) => ({ ...prev, [name]: checked })),
  }));

  return (
    <div>
      <div className="flex gap-4">
        {showFiltering ? (
          <Filters
            filters={filters}
            dropdownData={dropdownData}
            onFilterChange={handleFilterChange}
          />
        ) : null}

        <div className="flex items-center pb-4 gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table id="table1">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
