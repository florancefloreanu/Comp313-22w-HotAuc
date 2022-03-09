import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Moment from "react-moment"
import axios from "axios"
import { SERVER_URL } from "../../../ConstantValue"

function DashboardWin() {
	const userId = useSelector((state) => state.userInfor.user._id)
	//Set dispatch for Redux
	const [items, setItems] = useState([])

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
			const res = await axios.get(`${SERVER_URL}item/bidder/${userId}`, config)
			setItems(res.data)

			console.log(res.data)
			setLoading(false)
		}

		fetchItems()
	}, [])

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


                            {/* Here Paypal API */}
							 <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
								<input type="hidden" name="cmd" value="_xclick"/>
								<input type="hidden" name="business" value="lynn.yeong.102@gmail.com"/>
								<input type="hidden" name="lc" value="US"/>
								<input type="hidden" name="item_name" value={item.title}/>
								<input type="hidden" name="amount" value="1"/>
								<input type="hidden" name="currency_code" value="CAD"/>
								<input type="hidden" name="button_subtype" value="services"/>
								<input type="hidden" name="no_note" value="0"/>
								<input type="hidden" name="tax_rate" value="0.000"/>
								<input type="hidden" name="shipping" value="0.00"/>
								<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHostedGuest"/>
								<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
								<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
							</form> 
						</div>
					</div>
				)
			})}
		</div>
	)

	return <>{!loading && page}</>
}

export default DashboardWin