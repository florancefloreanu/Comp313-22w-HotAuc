import React from "react"
import AdminAllUsers from "./users/AdminAllUsers"
import AdminDashboardSidebar from "./AdminDashboardSidebar"
import {
	BrowserRouter as Router,
	Outlet,
	Route,
	Routes
} from "react-router-dom"
import"./Admin.css"

function AdminDashboard() {
	return (
		<div className="container-height-100 container-fluid d-flex flex-row">
			<AdminDashboardSidebar />

			<Outlet className="p-3 admin-dashboard-content" />
		</div>
	)
}

export default AdminDashboard
