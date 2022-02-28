import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

export const PrivateRoute = ({ children }) => {


	const reduxEmail = useSelector((state) => state.userInfor.user?.email)
	if (reduxEmail != null) {
		return children
	}

	return <Navigate to="/login" />
}
