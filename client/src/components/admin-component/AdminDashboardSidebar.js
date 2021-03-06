/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\admin-component\AdminDashboardSidebar.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Wednesday, March 30th 2022, 7:12:46 pm
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Navbar for admin Dashboard
 */

import React from "react"
import {
	CDBSidebar,
	CDBSidebarContent,
	CDBSidebarFooter,
	CDBSidebarHeader,
	CDBSidebarMenu,
	CDBSidebarMenuItem,
	CDBSidebarSubMenu
} from "cdbreact"
import { Link, NavLink } from "react-router-dom"
import "./Admin.css"
import { useState } from "react"
import { Nav } from "react-bootstrap"

const AdminDashboardSidebar = () => {
	const [activeComponent, setActiveComponent] = useState("users")

	const handleSelectSection = (e) => {
		console.log(e.target.value)
	}
	return (
		<div
			style={{
				display: "flex",
				height: "100%",
				overflow: "scroll initial",
				position: "relative"
			}}
		>
			<CDBSidebar textColor="#fff" backgroundColor="#0275d8">
				<CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
					<a
						href="/admin/dashboard/home"
						className="text-decoration-none"
						style={{ color: "inherit" }}
					>
						Dashboard
					</a>
				</CDBSidebarHeader>

				<CDBSidebarContent className="sidebar-content">
					<CDBSidebarMenu>
						<NavLink
							exact
							to="/admin/dashboard/users"
							activeClassName="activeClicked"
						>
							<CDBSidebarMenuItem icon="users">Users</CDBSidebarMenuItem>
						</NavLink>
						<NavLink
							exact
							to="/admin/dashboard/items"
							activeClassName="activeClicked"
						>
							<CDBSidebarMenuItem icon="th-large">Items</CDBSidebarMenuItem>
						</NavLink>

						<NavLink
							exact
							to="/admin/dashboard/brands-piechart"
							activeClassName="activeClicked"
						>
							<CDBSidebarMenuItem icon="chart-pie">
								Item Brand Chart
							</CDBSidebarMenuItem>
						</NavLink>
						<NavLink
							exact
							to="/admin/dashboard/user-registrations-linechart"
							activeClassName="activeClicked"
						>
							<CDBSidebarMenuItem icon="chart-line">
								Registration Chart
							</CDBSidebarMenuItem>
						</NavLink>
						<NavLink
							exact
							to="/admin/dashboard/monthly-itemposting-barchart"
							activeClassName="activeClicked"
						>
							<CDBSidebarMenuItem icon="chart-bar">
								Item Posting Chart
							</CDBSidebarMenuItem>
						</NavLink>
					</CDBSidebarMenu>
				</CDBSidebarContent>

				<CDBSidebarFooter style={{ textAlign: "center" }}>
					<div
						style={{
							padding: "20px 5px"
						}}
					>
						Admin
					</div>
				</CDBSidebarFooter>
			</CDBSidebar>
		</div>
	)
}

export default AdminDashboardSidebar
