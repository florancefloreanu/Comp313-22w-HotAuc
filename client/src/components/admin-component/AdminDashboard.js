/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\admin-component\AdminDashboard.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Tuesday, March 29th 2022, 7:02:01 pm
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Admin dashboard parent component
 */

import React from "react"
import AdminAllUsers from "./users/AdminAllUsers"
import AdminDashboardSidebar from "./AdminDashboardSidebar"
import {
	BrowserRouter as Router,
	Outlet,
	Route,
	Routes
} from "react-router-dom"
import "./Admin.css"

function AdminDashboard() {
	return (
		<div className="container-height-100 container-fluid d-flex flex-row">
			<AdminDashboardSidebar />

			<Outlet className="p-3 admin-dashboard-content" />
		</div>
	)
}

export default AdminDashboard
