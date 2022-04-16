/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\admin-component\users\EditUser.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Tuesday, March 29th 2022, 7:02:01 pm
 * Author: han
 *
 * Copyright (c) 2022 HotAuc
 *
 * Purpose: edit user in admin dashboard
 */

import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { SERVER_URL } from "../../../ConstantValue"

function EditUser() {
	const [user, setUser] = useState({
		name: "",
		email: ""
	})

	const navigate = useNavigate()

	const { userId } = useParams()

	useEffect(() => {
		const fetchData = async () => {
			try {
				//Set request header
				const config = {
					headers: {
						"Content-Type": "Application/json"
					}
				}

				//Make request
				const res = await axios.get(
					`${SERVER_URL}admin/users/${userId}`,
					config
				)
				setUser(res.data)
			} catch (err) {
				console.log(err.message)
			}
		}

		fetchData()
	}, [])

	const onInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}
	const updateUser = async (e) => {
		e.preventDefault()
		try {
			//Set request header
			const config = {
				headers: {
					"Content-Type": "Application/json"
				}
			}

			//Make request
			const res = await axios.put(
				`${SERVER_URL}admin/users/${userId}`,
				user,
				config
			)

			navigate("/admin/dashboard/users")
		} catch (err) {
			console.log(err.message)
		}
	}

	const handleBack = () => {
		navigate("/admin/dashboard/users")
	}

	return (
		<div className="admin-dashboard-content">
			<Form onSubmit={(e) => updateUser(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>name</Form.Label>
					<Form.Control
						type="txt"
						placeholder="Enter your name"
						name="name"
						value={user.name}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>email</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your email"
						name="email"
						value={user.email}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Update
				</Button>
				<Button variant="primary" onClick={() => handleBack()}>
					Back
				</Button>
			</Form>
		</div>
	)
}

export default EditUser
