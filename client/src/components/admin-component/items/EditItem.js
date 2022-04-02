import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams, Navigate, useNavigate } from "react-router-dom"

function EditItem() {
	const [item, setitem] = useState({
		title: "",
		color: "",
		year: "",
		brand: "",
		description: ""
	})

	const navigate = useNavigate()

	const { itemId } = useParams()

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
					`http://localhost:5000/api/admin/items/${itemId}`,
					config
				)
				setitem(res.data)
			} catch (err) {
				console.log(err.message)
			}
		}

		fetchData()
	}, [])

	const onInputChange = (e) => {
		setitem({ ...item, [e.target.name]: e.target.value })
	}
	const updateitem = async (e) => {
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
				`http://localhost:5000/api/admin/items/${itemId}`,
				item,
				config
			)

			navigate("/admin/dashboard/items")
		} catch (err) {
			console.log(err.message)
		}
	}

	const handleBack = () => {
		navigate("/admin/dashboard/items")
	}

	return (
		<div className="admin-dashboard-content">
			<Form onSubmit={(e) => updateitem(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your name"
						name="title"
						value={item.title}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Color</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your name"
						name="color"
						value={item.color}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Description</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your name"
						name="description"
						value={item.description}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Brand</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter brand"
						name="brand"
						value={item.brand}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Year</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your name"
						name="year"
						value={item.year}
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

export default EditItem
