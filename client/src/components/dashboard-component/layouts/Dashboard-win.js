import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Moment from "react-moment"
import axios from "axios"
import { SERVER_URL } from "../../../ConstantValue"
import Swal from 'sweetalert2';
import Sidebar from "../../Sidebar";

import Paypal from '../../paypal-component/Paypal';
import { Navbar } from "react-bootstrap"

function DashboardWin() {
	const userId = useSelector((state) => state.userInfor.user._id)
	//Set dispatch for Redux
	const [items, setItems] = useState([])
	const [paidResult, setPaidResult] = useState()
	const [loading, setLoading] = useState(true)

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

	const handlePaypal = (resultBool, resultRes) => {
		if (resultBool === true) {
			console.log("Payment Successful");
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Payment Successful',
				text: 'Thank you for your billing',
				showConfirmButton: false,
				timer: 2000
			  });
			  setTimeout(function() {
				window.location.reload();
			  }, 1500);
		} else {
			console.log("Payment Unsuccessful");
			Swal.fire({
				icon: 'error',
				title: 'Payment Failed',
				text: 'Your transaction was cancelled. Please try again',
			  })

		}
		if (resultRes) console.log(resultRes);

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
			<h2>Winning</h2>
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
						<table>
							<thead>
							<tr>
								<td rowspan="2">
									{item.images.map((prop) => (
									<img src={item.images[0].uri} alt="hotwheels image" />
								))}
								</td>
								<td className="title-col2">
									{item.title}
								</td>
								<td rowspan="2" className="price-col">
									<p>$ {item.currentPrice}</p>
								</td>
								<td rowspan="2" className="paid-col">
								{(item.isPaid) && (
									<p>Paid</p>
									)}
									{(!item.isPaid) && (
										<Paypal
											targetItem={!loading && item}
											subTotal={!loading && item.currentPrice}
											onPaymentDone={handlePaypal}
											/>
									)}
								</td>
							</tr>
							<tr>
								<td>
									<p>Color: {item.color}</p>
									<p>Description: {item.description}</p>
									<p>Year: {item.year}</p>
								</td>
							</tr>
							</thead>
						</table>
							
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