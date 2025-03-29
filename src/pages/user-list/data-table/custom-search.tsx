import { FilterFn } from "@tanstack/react-table";
import { UserI } from "./columns";

export const startsWithFilter : FilterFn<UserI> = (row,column,value)=>{
    const rowValue = String(row.getValue(column)||"").toLowerCase()
    const filter = String(value ||"").toLowerCase()

    return rowValue.startsWith(filter)

}