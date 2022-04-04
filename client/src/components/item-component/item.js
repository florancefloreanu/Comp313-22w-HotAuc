/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\item-component\item.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Thursday, March 17th 2022, 11:03:03 am
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Detail for one item
 */

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"
import Moment from "react-moment"
import { useEffect, useState } from "react"

import "./Items.css"
import { SERVER_URL } from "../../ConstantValue"
import axios from "axios"
import { async } from "@firebase/util"
import { calculateTimeLeft } from "../../helper/time"
import "./item.css"
import { Alert } from "react-bootstrap"

const Item = () => {
	const { id } = useParams()
	const userId = useSelector((state) => state.userInfor.user._id)

	const [price, setPrice] = useState(0)

	const [isAlert, setIsAlert] = useState(false)

	const [data, setData] = useState(null)
	const [images, setImages] = useState([])
	const [selectedImg, setSelectedImg] = useState()

	const [loading, setLoading] = useState(true)

	const onPriceInputChange = (e) => {
		setPrice(e.target.value)
	}

	const handleSubmitPrice = async (e) => {
		e.preventDefault()
		if (price <= data.currentPrice) {
			setIsAlert(true)
			setTimeout(() => {
				setIsAlert(false)
			}, 3000)
			return
		}

		const body = { price }
		const config = {
			headers: {
				"Content-Type": "Application/json"
			}
		}

		const res = await axios.put(
			`${SERVER_URL}item/${data._id}/user/${userId}`,
			body,
			config
		)
		setData(res.data)
		console.log(res.data)
	}

	useEffect(() => {
		const fetchItem = async () => {
			try {
				//Set request header

				const config = {
					headers: {
						"Content-Type": "Application/json"
					}
				}

				const res = await axios.get(`${SERVER_URL}item/${id}`, config)

				console.log(res)

				setData(res.data)
				setImages(res.data.images)
				setSelectedImg(res.data.images[0].uri)
				console.log(images)
				setLoading(false)
			} catch (error) {
				console.log(error)
			}
		}

		fetchItem()
	}, [])

	const [timeLeft, setTimeLeft] = useState()

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft(data.endTime))
			//console.log(timeLeft);
		}, 1000)
		//console.log(timeLeft)

		return () => clearTimeout(timer)
	})

	return (
		<div className="items">
			<div className="home">
				<h1>{!loading && data.title}</h1>
				<div className="stuff">
					<div className="App">
						<div className="container">
							<img src={selectedImg} alt="Selected" className="selected" />
							<div className="imgContainer">
								{images.map((img, index) => (
									<img
										className="unselected"
										style={{
											border:
												selectedImg === img.uri
													? "4px solid #0d6efd"
													: "4px solid #6c757d"
										}}
										key={index}
										src={!loading && img.uri}
										alt={"car " + index}
										onClick={() => setSelectedImg(img.uri)}
									/>
								))}
							</div>
						</div>
					</div>

					<p class="text">Brand: {!loading && data.brand}</p>
					<p class="text">Year Make: {!loading && data.year}</p>
					<p class="text">Current Price: ${!loading && data.currentPrice}</p>
					<p class="text">
						End Date:
						{!loading && <Moment format="YYYY-MM-DD">{data.endTime}</Moment>}
					</p>
					<p class="text">
						End Time:
						{!loading && <Moment format="HH:mm">{data.endTime}</Moment>}
					</p>
					<p class="text">
						Time Left:
						{!loading && timeLeft != null && timeLeft.seconds > 0 && (
							<span>
								{timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes}{" "}
								Minutes {timeLeft.seconds} Seconds
							</span>
						)}
						{!loading && timeLeft != null && timeLeft.seconds === 0 && (
							<span>Auction expires</span>
						)}
					</p>
					<form onSubmit={(e) => handleSubmitPrice(e)}>
						<div class="bid">
							Bidding Price :
							<input
								class="txtPrice"
								value={price}
								onChange={(e) => onPriceInputChange(e)}
							></input>
							<button type="submit" class="btn btn-primary">
								Bid
							</button>
						</div>
					</form>
					{isAlert && (
						<Alert variant="danger">
							Bidding price should be higher than current price
						</Alert>
					)}
				</div>
			</div>
		</div>
	)
}

export default Item
