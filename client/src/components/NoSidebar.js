import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSideBarVisibility } from "../redux/features/layoutSlice"

function NoSidebar({ children }) {
   
    const dispatch = useDispatch()
    dispatch(setSideBarVisibility(false))

    return children
}

export default NoSidebar
