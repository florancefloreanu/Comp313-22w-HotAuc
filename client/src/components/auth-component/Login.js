/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\auth-component\Login.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Monday, January 17th 2022, 9:55:29 am
 * Author: han
 *
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: select user role to login
 */

import React, { Fragment, useState } from "react"
import { Button, ButtonGroup } from "react-bootstrap"
import AdminLogin from "./AdminLogin"
import UserLogin from "./UserLogin"

function Login(props) {
	const [selectedRole, setSelectedRole] = useState("user")

	const handleUserRoleSelect = () => {
		setSelectedRole("user")
	}

	const handleAdminRoleSelect = () => {
		setSelectedRole("admin")
	}

	const userLogin = <UserLogin />
	const adminLogin = <AdminLogin />

	return (
		<Fragment>
			<div>
				<ButtonGroup aria-label="Basic example">
					<Button variant="primary" onClick={handleUserRoleSelect}>
						I'm an user
					</Button>
					<Button variant="primary" onClick={handleAdminRoleSelect}>
						I'm an admin
					</Button>
				</ButtonGroup>
			</div>
			<div>
				{(selectedRole === "user" && userLogin) ||
					(selectedRole === "admin" && adminLogin)}
			</div>
		</Fragment>
	)
}

export default Login
