"use client";

import type { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex lg:flex-row gap-2 w-full lg:justify-between  ">
      {/*first_name Search Input  */}
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search users..."
          value={
            (table.getColumn("first_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("first_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      {/* Toggle View Dropdown */}
      <DataTableViewOptions table={table} />
    </div>
  );
}
