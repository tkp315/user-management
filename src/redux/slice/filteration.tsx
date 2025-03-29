import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PaginationState {
  page?: number
  limit?: number
}

const initialState: PaginationState = {
  page: JSON.parse(sessionStorage.getItem("page") || "1"),
  limit: JSON.parse(sessionStorage.getItem("limit") || "3"),
}

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    updatePaginationOptions: (state, action: PayloadAction<PaginationState>) => {
      const paginationData = action.payload
      state.page = paginationData.page || 1
      
    //   sessionStorage.setItem("page", JSON.stringify(state.page))
    //   sessionStorage.setItem("limit", JSON.stringify(state.limit))
    },
  },
})

export const { updatePaginationOptions } = paginationSlice.actions
export default paginationSlice.reducer
