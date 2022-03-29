import React from 'react'
//edit user
import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams,Navigate } from "react-router-dom"

function EditUser(props) {
	const [user, setUser] = useState({
		userName: "",
		email: "",
		address: ""
	})
	const token = useSelector((state) => state.auth.value.token)

	const { userId } = useParams()

	const [isUpdate, setIsUpdate] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				//Set request header
				const config = {
					headers: {
						"Content-Type": "Application/json",
						Authorization: `Bearer ${token}`
					}
				}

				//Make request
				const res = await axios.get(
					//`http://localhost:5000/api/users/${userId}`,
					config
				)

                console.log(res.data)
				setUser({
                    userName: res.data.userName,
					email: res.data.email,
					address: res.data.address
				}) 

			} catch (err) {
				console.log(err.message)
			}
		}

		fetchData()
	}, [])

	const onInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}
	const handleCreateUser = async (e) => {
		e.preventDefault()

		const body = course
		try {
			//Set request header
			const config = {
				headers: {
					"Content-Type": "Application/json",
					Authorization: `Bearer ${token}`
				}
			}

			//Make request
			const res = await axios.put(
				//`http://localhost:5000/api/users/${userId}`,
				body,
				config
			)
			setIsUpdate(true)
		} catch (err) {
			console.log(err.message)
		}
    }
    
    if (isUpdate) {
        return <Navigate to="/admin/users/all" />
    }

	return (
		<>
			<Form onSubmit={(e) => handleCreateCourse(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>userName</Form.Label>
					<Form.Control
						type="txt"
						placeholder="Enter your user name"
						name="userName"
						value={user.userName}
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
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>address</Form.Label>
					<Form.Control
						type="text"
						placeholder="address"
						name="address"
						value={user.address}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				
				<Button variant="primary" type="submit">
					Update
				</Button>
			</Form>
		</>
	)
}

export default EditUser
