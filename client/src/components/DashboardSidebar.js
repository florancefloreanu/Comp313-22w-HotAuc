import React, { useState, Fragment, useEffect } from "react"
import "./dashboard-component/Dashboard.css"
import DashboardProfile from "./dashboard-component/layouts/Dashboard-profile"
import DashboardSell from "./dashboard-component/layouts/Dashboard-sell"
import DashboardBid from "./dashboard-component/layouts/Dashboard-bid"
import DashboardWin from "./dashboard-component/layouts/Dashboard-win"
import { setSideBarVisibility } from "../redux/features/layoutSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

function DashboardSidebar() {

	const dispatch = useDispatch()
    dispatch(setSideBarVisibility(false))

    const navigate = useNavigate();
	const [selectedSection, setSelectedSection] = useState("profile")	
	
	const handleProfileSelection = () => {
		setSelectedSection("profile")
	}

	const handleSellSelection = () => {
		setSelectedSection("sell")
	}

	const handleBidSelection = () => {
		setSelectedSection("bid")
	}

	const handleWinSelection = () => {
		navigate('/dashboard/win');
	}

	const profile = <DashboardProfile />
	const sell = <DashboardSell />
	const bid = <DashboardBid />
	const win = <DashboardWin />

	return (
		<table className="table-dashboard">
			<thead>
				<tr>
					<td className="sidebar-col">
					<body>
						<ul class="menu">
						<li><a  onClick={handleProfileSelection}>Profile</a></li>
						<li><a onClick={handleSellSelection}>Sell</a></li>
						<li><a nClick={handleBidSelection}>Bid</a></li>
						<li><a onClick={handleWinSelection}>Win</a></li>
						</ul>
					</body>

					</td>
					<td className="content-col">
						<div>
							{(selectedSection === "profile" && profile) ||
								(selectedSection === "sell" && sell) ||
								(selectedSection === "bid" && bid) ||
								(selectedSection === "win" && win)}
						</div>
					</td>
				</tr>
			</thead>
		</table>
	)

}

export default DashboardSidebar
