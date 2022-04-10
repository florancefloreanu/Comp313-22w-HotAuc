import React, { Fragment, useState } from "react"
import { useNavigate } from 'react-router-dom';
import "../components/dashboard-component/Dashboard.css"


function ShowDashboardSidebar() {

    const navigate = useNavigate();
	const [selectedSection, setSelectedSection] = useState("profile")

	const handleProfileSelection = () => {
		navigate('/dashboard/profile');
	}

	const handleSellSelection = () => {
		navigate('/dashboard/sell');
	}

	const handleBidSelection = () => {
		navigate('/dashboard/bid');
	}

	const handleWinSelection = () => {
		navigate('/dashboard/win');
	}
	return (
		<div>
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
								{/* {(selectedSection === "profile" && profile) ||
									(selectedSection === "sell" && sell) ||
									(selectedSection === "bid" && bid) } */}
									{/* // (selectedSection === "win" && win)} */}
							</div>
						</td>
					</tr>
				</thead>
			</table>
		</div>
	)
}

export default ShowDashboardSidebar
