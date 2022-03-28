import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setlocalUser } from "../redux/features/userInforSlice"

export const LocalUser = ({ children }) => {
	const dispatch = useDispatch()
	const localEmail = localStorage.getItem("email")
	const localToken = localStorage.getItem("token")
	const localId = localStorage.getItem("_id")
	const localName = localStorage.getItem("name")
	const reduxEmail = useSelector((state) => state.userInfor.user?.email)

	if (reduxEmail == null && localEmail != null) {
		const payload = {
			user: {
				email: localEmail,
				_id: localId,
				name: localName
			},
			token: localToken
        }
		dispatch(setlocalUser(payload))
	}


	return children
}
