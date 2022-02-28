import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSideBarVisibility } from "../redux/features/layoutSlice"

function ShowSidebar({ children }) {

	const dispatch = useDispatch()
	dispatch(setSideBarVisibility(true))
	return children
}

export default ShowSidebar
