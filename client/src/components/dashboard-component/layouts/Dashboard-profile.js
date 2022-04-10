import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "../Dashboard.css"

function DashboardProfile(){
	const userEmail = useSelector(state => state.userInfor.user?.email)
	const userName = useSelector(state => state.userInfor.user?.name)
	return (
		<div className="dashboard-profile">
			<h2>Profile</h2>
			<p>User Name: {userName}</p>
			<p>User Email: {userEmail}</p>
			<Link to="/dashboard/profile/edit"> Go to edit</Link>
		</div>
	)
}

export default DashboardProfile
