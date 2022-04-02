import { createSlice } from "@reduxjs/toolkit"

const adminDashboardSlice = createSlice({
	name: "admin-dashboard",
	initialState: {
		value: { activeComponent: "users" }
	},
	reducers: {
		setActiveComponent: (state, action) => {
			state.value.activeComponent = action.payload
		}
	}
})

export const { setActiveComponent } = adminDashboardSlice.actions
export default adminDashboardSlice.reducer
