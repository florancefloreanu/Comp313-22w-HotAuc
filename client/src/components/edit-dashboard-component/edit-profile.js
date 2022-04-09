/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\edit-dashboard-component\edit-profile.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Monday, January 17th 2022, 9:55:29 am
 * Author: Han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Edit profile page in user dashboard
 */

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SERVER_URL } from "../../ConstantValue"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import "./Edit-Profile.css"
import { setUserInfo } from "../../redux/features/userInforSlice"

const EditProfile = () => {
	const token = useSelector((state) => state.userInfor.user?.token)
	const userEmail = useSelector((state) => state.userInfor.user?.email)
	const userName = useSelector((state) => state.userInfor.user?.name)

	const navigate = useNavigate()

	const [user, setUser] = useState({})

	const [update, setUpdate] = useState({
		name: userName
	})

	const [loading, setLoading] = useState(true)

	const dispatch = useDispatch()

	const handleInputChange = (e) => {
		setUpdate({ ...update, [e.target.name]: e.target.value })
	}

	const handleUpdate = async (e) => {
		e.preventDefault()
		try {
			//Set request header

			const config = {
				headers: {
					"Content-Type": "Application/json",
					"x-auth-token": token
				}
			}

			const res = await axios.put(
				`${SERVER_URL}user/${user._id}`,
				update,
				config
			)

			console.log(res)
			setUpdate({ name: res.data.name, email: res.data.name })
			setUser(res.data)
			dispatch(setUserInfo(res.data))
			navigate("/dashboard")
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const fetchItem = async () => {
			try {
				//Set request header

				const config = {
					headers: {
						"Content-Type": "Application/json",
						"x-auth-token": token
					}
				}

				const res = await axios.get(
					`${SERVER_URL}user/email/${userEmail}`,
					config
				)

				setUser(res.data)
				setLoading(false)
			} catch (error) {
				console.log(error)
			}
		}

		fetchItem()
	}, [])

	const page = (
		<div class="boxProfile">
			<form onSubmit={(e) => handleUpdate(e)}>
				<img
					id="profileImage"
					src={
						"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
					}
					alt="profile img"
					width="30px"
					height="30px"
				/>
				<label id="UserLabel">User Name:</label>
				<input
					type="text"
					id="userNameInp"
					placeholder="User Name"
					name="name"
					value={update.name}
					onChange={(e) => handleInputChange(e)}
				/>
				<label id="UserLabel">User Email:</label>
				<input
					type="email"
					id="EmailInp"
					placeholder="Email ID"
					name="email"
					value={userEmail}
					disabled
				/>

				<button class="buttonEdit" id="cancelBtn" type="reset">
					CANCEL
				</button>

				<button type="submit" class="buttonEdit">
					SAVE
				</button>
			</form>
		</div>
	)

	return <>{!loading && page}</>
}

export default EditProfile
