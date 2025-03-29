import { FilterFn } from "@tanstack/react-table";
import { UserI } from "./columns";

// custom filter function

export const startsWithFilter : FilterFn<UserI> = (row,column,value)=>{
    const rowValue = String(row.getValue(column)||"").toLowerCase()  // getting Values of row
    const filter = String(value ||"").toLowerCase() // search value

    return rowValue.startsWith(filter) // return all rows which starts with search value

}