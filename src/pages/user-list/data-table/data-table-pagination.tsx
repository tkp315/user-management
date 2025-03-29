import { type Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Pagination } from "./data-table"
import { RootState } from "@/redux/store"
import { updatePaginationOptions } from "@/redux/slice/filteration"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pagination: Pagination
}

export function DataTablePagination<TData>({
  table,
  pagination,
}: DataTablePaginationProps<TData>) {
  const dispatch = useDispatch()
  const pageParams = useSelector((state: RootState) => state.filter)

  const [paginationParameter, setPaginationParameter] = useState({
    limit: pageParams.limit,
    page: pageParams.page,
  })

  useEffect(() => {
    dispatch(
      updatePaginationOptions({
        limit: paginationParameter.limit,
        page: paginationParameter.page,
      })
    )
  }, [paginationParameter, dispatch])



  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {pageParams.page} of {pagination.totalPages || "Loading.."}
      </div>

      <div className="flex items-center space-x-2">
        {/* First Page Button */}
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => {
            table.setPageIndex(0)
            setPaginationParameter({ ...paginationParameter, page: 1 })
          }}
          disabled={!pagination.hasPreviousPage}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous Page Button */}
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            table.previousPage()
            setPaginationParameter({
              ...paginationParameter,
              page: Math.max((paginationParameter.page || 1) - 1, 1),
            })
          }}
          disabled={!pagination.hasPreviousPage}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Next Page Button */}
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            table.nextPage()
            setPaginationParameter({
              ...paginationParameter,
              page: Math.min(
                (paginationParameter.page || 1) + 1,
                pagination.totalPages
              ),
            })
          }}
          disabled={!pagination.hasNextPage}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last Page Button */}
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() =>
            setPaginationParameter({
              ...paginationParameter,
              page: pagination.totalPages,
            })
          }
          disabled={!pagination.hasNextPage}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
