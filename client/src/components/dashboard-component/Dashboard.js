import "./Dashboard.css"
import React, { Fragment, useState } from "react"
import { Button, ButtonGroup } from "react-bootstrap"
import DashboardProfile from "./layouts/Dashboard-profile"
import DashboardSell from "./layouts/Dashboard-sell"
import DashboardBid from "./layouts/Dashboard-bid"
import DashboardWin from "./layouts/Dashboard-win"

function Dashboard(props) {
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
		setSelectedSection("win")
	}

	const profile = <DashboardProfile />
	const sell = <DashboardSell />
	const bid = <DashboardBid />
	const win = <DashboardWin />

	return (
		<Fragment>
			<div>
				<ButtonGroup aria-label="Basic example">
					<Button variant="primary" onClick={handleProfileSelection}>
						Profile
					</Button>
					<Button variant="primary" onClick={handleSellSelection}>
						Sell
					</Button>
					<Button variant="primary" onClick={handleBidSelection}>
						Bid
					</Button>
					<Button variant="primary" onClick={handleWinSelection}>
						Win
					</Button>
				</ButtonGroup>
			</div>
			<div>
				{(selectedSection === "profile" && profile) ||
					(selectedSection === "sell" && sell) ||
					(selectedSection === "bid" && bid) ||
					(selectedSection === "win" && win)}
					
			</div>
		</Fragment>
	)
}

export default Dashboard
