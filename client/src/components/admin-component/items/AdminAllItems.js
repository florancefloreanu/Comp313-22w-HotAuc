import axios from "axios"
import React, { useEffect, useState } from "react"
import { Pagination } from "react-bootstrap"
import { Table } from "react-bootstrap"
import { Button, Card, Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function AdminAllItems() {
	const [items, setitems] = useState([])
	const [dataLength, setDataLength] = useState(0)
	const [totalPage, setTotalPage] = useState(0)
	const [pageNumbers, setPageNumbers] = useState([])
	const [itemPerPage, setItemPerPage] = useState(5)
	const [currentPage, setCurrentPage] = useState(1)
	const [currentData, setCurrentData] = useState()
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

			const res = await axios.get(
				`http://localhost:5000/api/admin/items`,
				config
			)
			setitems(res.data)
			const total = Math.ceil(res.data.length / itemPerPage)
			setTotalPage(total)
			//Set each page number
			var pages = []
			for (let i = 0; i < total; i++) {
				pages.push(i + 1)
			}
			setPageNumbers(pages)
			const page = 1
			var data = res.data

			const startingIndex = (page - 1) * itemPerPage
			const remainingLength = data.length - (page - 1) * itemPerPage
			if (remainingLength > itemPerPage) {
				data = data.slice(startingIndex, startingIndex + itemPerPage)
			} else {
				data = data.slice(startingIndex, startingIndex + remainingLength)
			}
			setCurrentData(data)
		}

		fetchData()
	}, [])
	const navigate = useNavigate()
	const handleEdit = (e) => {
		const userId = e.target.value
		navigate(`/admin/dashboard/items/edit/${userId}`)
	}
	const handleClickPage = (page) => {
		if (page > totalPage) {
			page = totalPage
		}
		if (page < 1) {
			page = 1
		}
		//const page = e.target.id
		setCurrentPage(page)

		var data = items

		const startingIndex = (page - 1) * itemPerPage
		const remainingLength = data.length - (page - 1) * itemPerPage
		if (remainingLength > itemPerPage) {
			data = data.slice(startingIndex, startingIndex + itemPerPage)
		} else {
			data = data.slice(startingIndex, startingIndex + remainingLength)
		}

		console.log(data)
		setCurrentData(data)
	}
	return (
		<div className="admin-dashboard-content">
			<h2>items list</h2>
			{currentData && (
				<Table striped bordered hover className="w-75 mx-auto">
					<thead>
						<tr>
							<th>Title</th>
							<th>Color</th>
							<th>Description</th>
							<th>Brand</th>
							<th>Year</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{currentData.map((item) => (
							<tr>
								<td>{item.title}</td>
								<td>{item.color}</td>
								<td>{item.description}</td>
								<td>{item.brand}</td>
								<td>{item.year}</td>
								<td>
									{" "}
									<Button
										value={item._id}
										variant="primary"
										onClick={(e) => handleEdit(e)}
									>
										Edit
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
			{totalPage !== 0 && (
				<Pagination className="m-auto justify-content-center">
					<Pagination.First onClick={(e) => handleClickPage(1)} />
					<Pagination.Prev onClick={(e) => handleClickPage(currentPage - 1)} />
					{pageNumbers.length > 0 &&
						pageNumbers.map((pageNumber) => (
							<Pagination.Item
								id={pageNumber}
								onClick={(e) => handleClickPage(e.target.id)}
							>
								{pageNumber}
							</Pagination.Item>
						))}

					<Pagination.Next onClick={(e) => handleClickPage(currentPage + 1)} />
					<Pagination.Last onClick={(e) => handleClickPage(totalPage)} />
				</Pagination>
			)}
		</div>
	)
}

export default AdminAllItems
