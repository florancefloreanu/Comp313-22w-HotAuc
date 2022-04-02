import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
// import Chart from "chart.js/auto";
import axios from "axios"
import { SERVER_URL } from "../../ConstantValue"
import "chart.js/auto"
import { Bar, Pie, Line } from "react-chartjs-2"
import "./chart.css"

const MonthlyItemsPostedBarChart = () => {
	//value for all the list of brands that has count > 1
	const [monthLabels, setMonthLabels] = useState([])
	//corresponding count for brandlist
	const [monthlyItemsPosted, setMonthlyItemsPosted] = useState([])

	const loadData = async () => {
		try {
			//Set request header
			const config = {
				headers: {
					"Content-Type": "Application/json"
				}
			}
			console.log("try block conditions: ")
			const res = await axios.get(
				`${SERVER_URL}item/all/monthly-items-posted`,
				config
			)
			setMonthLabels(res.data.currentMonth)
			setMonthlyItemsPosted(res.data.monthlyItemsPosted)
			console.log(res)
		} catch (error) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		loadData()
	}, [])

	return (
		<div className="chart">
			<Bar
				height={400}
				width={600}
				options={{
					maintainAspectRatio: false,
					plugins: {
						title: {
							display: true,
							text: "Bar Chart for Monthly Item Postings",
							padding: { top: 10, bottom: 30 },
							font: {
								size: 24
							}
						}
					}
				}}
				data={{
					labels: monthLabels,
					datasets: [
						{
							label: "Number of Item Posts",
							data: monthlyItemsPosted,
							backgroundColor: [
								"rgba(255, 99, 132, 0.2)",
								"rgba(54, 162, 235, 0.2)",
								"rgba(255, 206, 86, 0.2)",
								"rgba(75, 192, 192, 0.2)",
								"rgba(153, 102, 255, 0.2)",
								"rgba(255, 159, 64, 0.2)",
								"rgba(146, 47, 98, 0.2)",
								"rgba(57, 46, 192, 0.2)",
								"rgba(67, 109, 107, 0.2)",
								"rgba(86, 182, 67, 0.2)",
								"rgba(245, 97, 39, 0.2)",
								"rgba(245, 39, 72, 0.8)"
							],
							borderColor: [
								"rgba(255, 99, 132, 1)",
								"rgba(54, 162, 235, 1)",
								"rgba(255, 206, 86, 1)",
								"rgba(75, 192, 192, 1)",
								"rgba(153, 102, 255, 1)",
								"rgba(255, 159, 64, 1)",
								"rgba(146, 47, 98, 1)",
								"rgba(57, 46, 192, 1)",
								"rgba(67, 109, 107, 1)",
								"rgba(86, 182, 67, 1)",
								"rgba(245, 97, 39, 1)",
								"rgba(245, 39, 72, 1)"
							],
							borderWidth: 1
						}
					]
				}}
			/>
		</div>
	)
}

export default MonthlyItemsPostedBarChart
