/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\dashboard-component\Dashboard.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Tuesday, March 29th 2022, 7:02:01 pm
 * Author: Han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: User dashboard page
 */

import "./Dashboard.css"
import React, { Fragment, useState } from "react"
import { Button, ButtonGroup } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';

import DashboardProfile from "./layouts/Dashboard-profile"
import DashboardSell from "./layouts/Dashboard-sell"
import DashboardBid from "./layouts/Dashboard-bid"
import DashboardWin from "./layouts/Dashboard-win"


function Dashboard(props) {
	const [selectedSection, setSelectedSection] = useState("profile")
    const navigate = useNavigate();

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
		<div>
		<Fragment>
		<ButtonGroup aria-label="Basic example">

		<table className="table-dashboard">
			<thead>
				<tr>
					<td className="sidebar-col">
					<body>
						<ul class="menu">
						<li><a  onClick={handleProfileSelection}>Profile</a></li>
						<li><a onClick={handleSellSelection}>Sell</a></li>
						<li><a onClick={handleBidSelection}>Bid</a></li>
						<li><a onClick={handleWinSelection}>Win</a></li>
						</ul>
					</body>

					</td>
					<td className="content-col">
						<div>
							{(selectedSection === "profile" && profile) ||
								(selectedSection === "sell" && sell) ||
								(selectedSection === "bid" && bid) }
								{/* // (selectedSection === "win" && win)} */}
						</div>
					</td>
				</tr>
			</thead>
		</table>
		</ButtonGroup>
		</Fragment>
			</div>
	)
}

export default Dashboard
