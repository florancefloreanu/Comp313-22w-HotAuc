import { createSlice } from "@reduxjs/toolkit"

const layoutSlice = createSlice({
	name: "layout",
	initialState: {
		value: {
			sidebar: true
		}
	},
	reducers: {
		setSideBarVisibility: (state, action) => {
			state.value.sidebar = action.payload
		}
	}
})

export const { setSideBarVisibility } = layoutSlice.actions
export default layoutSlice.reducer
