import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Copy, MoreHorizontal } from "lucide-react";
import { UserI, userSchema } from "./columns";
import { Dialog } from "@/components/ui/dialog";
import DeleteModal from "./user-edit/DeleteModal";

import EditModal from "./user-edit/EditModal";

interface DataTableRowActionsProps {
  row: Row<UserI>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const user = userSchema.parse(row.original);
  return (
    <Dialog>
      {/* Actions List DropDown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {/* Copy Email Button */}
            <DropdownMenuItem
              className="px-6 py-2"
              onClick={() => navigator.clipboard.writeText(String(user.email))}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Email
            </DropdownMenuItem>
            
            {/* Edit and Delete Dialog */}
            <div className="flex flex-col gap-2">
              <EditModal userDetails={row.original} />
              <DeleteModal userId={row.original.id} />
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
