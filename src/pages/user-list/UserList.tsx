import useApiCall from "@/hooks/useApiCall"
import axios from "axios"
import { useEffect, useState } from "react"
import { DataTable, Pagination } from "./data-table/data-table"
import { columns } from "./data-table/columns"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import Navbar from "../components/Navbar"


function UserList() {
    const [userList,setUserList] = useState([])

    const [pagination,setPagination] = useState<Pagination>({
        hasNextPage:false,
        hasPreviousPage:false,
        totalPages:0,
        page:0
    })
    
    const fetchCurrentPage = useSelector((state:RootState)=>state.filter)


    const apiCaller = useApiCall()
    async function fetchUserList(){
        const url = `https://reqres.in/api/users?page=${fetchCurrentPage.page}`
        const res = await apiCaller(url,axios.get)
        setUserList(res.data)
        setPagination({
            hasNextPage:res.page<res.total_pages,
            hasPreviousPage:res.page>1,
            totalPages:res.total_pages,
            page:res.page
        })   
    }

    useEffect(()=>{
    fetchUserList()
    },[fetchCurrentPage])
  return (
    <Navbar>
        <DataTable 
        columns={columns}
        data={userList}
        pagination={pagination}
        />
      
    </Navbar>
  )
}

export default UserList
