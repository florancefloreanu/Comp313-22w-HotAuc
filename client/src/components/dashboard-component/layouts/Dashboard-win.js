import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Moment from "react-moment"
import axios from "axios"
import { SERVER_URL } from "../../../ConstantValue"

import Paypal from '../../paypal-component/Paypal';

function DashboardWin() {
	const userId = useSelector((state) => state.userInfor.user._id)
	//Set dispatch for Redux
	const [items, setItems] = useState([])

	const [loading, setLoading] = useState(true)

	// const [payResult, setPayResult] = useState()

	useEffect(() => {
		const fetchItems = async () => {
			console.log("called")
			//Set request header
			const config = {
				headers: {
					"Content-Type": "Application/json"
				}
			}
			console.log(userId)
			const res = await axios.get(`${SERVER_URL}item/${userId}/winning`, config)
			setItems(res.data)

			console.log(res.data)
			setLoading(false)
		}

		fetchItems()
	}, [])

	// useEffect(() => {
	// 	console.log("Bob, do something!");
	// }, [payResult])

	const handlePaypal = (resultBool, resultRes) => {
		if (resultBool === true) {
			console.log("Good");
		} else {
			console.log("Bad");
		}
		if (resultRes) console.log(resultRes);
		window.location.reload();
	}

	const testOnlyCancelPayment = async (item) => {
        let newItem = item;
        newItem.isPaid = false;

        const body = newItem;
        const config = {
            headers: {
                "Content-Type": "Application/json",
            },
        };

        const res = await axios.put(
            `${SERVER_URL}item/${newItem._id}`,
            body,
            config
        );

		console.log("Reset done")
	}

	const page = (
		<div className="dashboard-bid">
			{items?.map((item) => {
				console.log(item)
				console.log(item.bids)
				let maxPrice = Math.max.apply(
					Math,
					item.bids.map(function (o) {
						return o.price
					})
				)
				let myPrice = item.bids.map(function (o) {
					if (o.bidder == userId) {
						return o.price
					}
				})
				console.log(maxPrice)
				console.log(myPrice[0])

				return (
					<div className="card">
						<div className="card-body">
							{item.images.map((prop) => (
								<img src={item.images[0].uri} alt="hotwheels image" />
							))}
							<p> </p>
							<h2>{item.title}</h2>
							<p>Color: {item.color}</p>
							<p>Description: {item.description}</p>
							<p>Year: {item.year}</p>
							<br />
							<p>Final Price: {item.currentPrice}</p>
								<Moment parse="YYYY-MM-DD">{item.endTime}</Moment>
							
							{item.isPaid && (
								<p>Paid: This item is paid!</p>
							)}
							{!item.isPaid && (
								<Paypal
									targetItem={!loading && item}
									subTotal={!loading && item.currentPrice}
									onPaymentDone={handlePaypal}
									/>
							)}
							<button onClick={() => {testOnlyCancelPayment(item)}}>Reset4Test</button>
						</div>
					</div>
				)
			})}
		</div>
	)

	return <>{!loading && page}</>
}

export default DashboardWin