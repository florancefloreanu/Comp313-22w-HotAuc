import React from 'react'
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
//a list of users
//buttons: edit and delete

function AdminAllUsers() {
	const [users, setUsers] = useState([])
	//const token = useSelector((state) => state.auth.value.token)
	useEffect(() => {
		//call api
		const fetchData = async () => {
			//Set request header
			const config = {
				headers: {
					"Content-Type": "Application/json"
				//	Authorization: `Bearer ${token}`
				}
			}

			const res = await axios.get(`http://localhost:5000/api/admin/users`, config)
			setUsers(res.data)
			console.log(res.data)
		}

		fetchData()
	}, [])
    return (
		<div>
			<h2>Users list</h2>
			<Row xs={1} md={3} className="g-4">
				{users.map((user) => (
					<Col>
						<Card>
							<Card.Header as="h5">
								Name: {user.userName}
							</Card.Header>
							<Card.Body>
								<Card.Title>Email: {user.email}</Card.Title>
								<Card.Text>Address: {user.address}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	)
}

export default AdminAllUsers
