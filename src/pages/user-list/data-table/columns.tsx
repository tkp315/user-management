import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { number, z } from "zod";
import { startsWithFilter } from "./custom-search";

export const userSchema = z.object({
  id: number(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string(),
  email: z.string(),
}); // table columns

export type UserI = z.infer<typeof userSchema>;
export const columns: ColumnDef<UserI>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value:boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
    
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }, // id

  {
    accessorKey: "avatar",
    header: () => <div className="font-semibold text-lg">Avatar</div>,
    cell: ({ row }) => (
      <div className="">
        {
          <img
            src={row.getValue("avatar")}
            className="w-14 h-14 rounded-full"
          ></img>
        }
      </div>
    ),
  }, // checkbox

  {
    accessorKey: "first_name",
    header: () => <div className="font-semibold text-lg">First Name</div>,
    cell: ({ row }) => <div className="">{row.getValue("first_name")}</div>,
    filterFn: startsWithFilter,
  }, // first_name  with filter
  {
    accessorKey: "last_name",
    header: () => <div className="font-semibold text-lg">Last Name</div>,
    cell: ({ row }) => <div className="">{row.getValue("last_name")}</div>,
    
  }, // last name
  {
    accessorKey: "email",
    header: () => <div className="font-semibold text-lg">Email</div>,
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    
  }, // email

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },// action column
];
