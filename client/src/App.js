import React, { Fragment, useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import Items from "./components/item-component/Items"
import Register from "./components/auth-component/Register"
import Login from "./components/auth-component/Login"
import Sidebar from "./components/Sidebar"
import "bootstrap/dist/css/bootstrap.min.css"
import Footer from "./components/Footer"
import { useSelector } from "react-redux"

import Dashboard from "./components/dashboard-component/Dashboard"
import "bootstrap/dist/css/bootstrap.min.css"
import EditBid from "./components/edit-dashboard-component/edit-bid"
import EditProfile from "./components/edit-dashboard-component/edit-profile"
import Item from "./components/item-component/item"
import Chatbot from "./components/chatbot-component/Chatbot"
import { LocalUser } from "./components/LocalUser"
import { PrivateRoute } from "./PrivateRoute"
import NoSidebar from "./components/NoSidebar"
import ShowSidebar from "./components/ShowSidebar"
import AdminDashboard from "./components/admin-component/AdminDashboard"
import BrandPieChart from "./components/admin-component/BrandPieChart"
import OneSignal from "react-onesignal"
import UserRegistrationLineChart from "./components/admin-component/UserRegistrationLineChart"
import MonthlyItemsPostedBarChart from "./components/admin-component/MonthlyItemsPostedBarChart"
import AdminAllUsers from "./components/admin-component/users/AdminAllUsers"
import EditUser from "./components/admin-component/users/EditUser"
import AdminAllItems from "./components/admin-component/items/AdminAllItems"
import EditItem from "./components/admin-component/items/EditItem"
const appId = "5d1f1b0a-5f01-4823-9796-7ccc768f8393"

function App() {
	const [sideBarVisibility, setSideBarVisibility] = useState({
		visibility: "visible"
	})
	const [mainContainerMargin, setMainContainerMargin] = useState({
		marginLeft: "400px"
	})

	const sidebarDisplay = useSelector((state) => state.layout.value.sidebar)

	useEffect(() => {
		console.log(sidebarDisplay)
		if (sidebarDisplay) {
			setSideBarVisibility({ visibility: "visible" })
			setMainContainerMargin({ marginLeft: "400px" })
		} else {
			setSideBarVisibility({ visibility: "hidden" })
			setMainContainerMargin({ marginLeft: "50px" })
		}
	}, [sidebarDisplay])

	//Set oneSignal
	const [initialized, setInitialized] = useState(false)
	useEffect(() => {
		OneSignal.init({ appId: appId }).then(async () => {
			setInitialized(true)
			OneSignal.showSlidedownPrompt().then(() => {
				// do other stuff
			})
		})
	}, [])

	return (
		<Router>
			<LocalUser>
				<Fragment>
					<Navbar />
					<div style={sideBarVisibility}>
						<Sidebar className="sidebar" />
					</div>
					<Chatbot />
					<section
						className="right-container"
						style={({ minHeight: "900px" }, mainContainerMargin)}
					>
						<Routes>
							<Route
								exact
								path="/"
								element={
									<ShowSidebar>
										<Items />
									</ShowSidebar>
								}
							/>
							<Route
								path="/dashboard"
								element={
									<PrivateRoute>
										<NoSidebar>
											<Dashboard />
										</NoSidebar>
									</PrivateRoute>
								}
							/>
							<Route
								exact
								path="/register"
								element={
									<NoSidebar>
										<Register />
									</NoSidebar>
								}
							/>
							<Route
								path="dashboard/profile/edit"
								element={
									<PrivateRoute>
										<NoSidebar>
											<EditProfile />
										</NoSidebar>
									</PrivateRoute>
								}
							/>
							<Route
								path="dashboard/bid/edit"
								element={
									<PrivateRoute>
										<NoSidebar>
											<EditBid />
										</NoSidebar>
									</PrivateRoute>
								}
							/>
							<Route
								path="/item/:id"
								element={
									<NoSidebar>
										<Item />
									</NoSidebar>
								}
							/>

							<Route
								exact
								path="/login"
								element={
									<NoSidebar>
										<Login />
									</NoSidebar>
								}
							/>
							<Route
								path="/admin/dashboard"
								element={
									<NoSidebar>
										<AdminDashboard />
									</NoSidebar>
								}
							>
								<Route path="users" element={<AdminAllUsers />} />
								<Route
									path="users/edit/:userId"
									element={<EditUser></EditUser>}
								/>

								<Route path="items" element={<AdminAllItems />} />
								<Route path="items/edit/:itemId" element={<EditItem />} />
								<Route path="brands-piechart" element={<BrandPieChart />} />
								<Route
									path="user-registrations-linechart"
									element={<UserRegistrationLineChart />}
								/>
								<Route
									path="monthly-itemposting-barchart"
									element={<MonthlyItemsPostedBarChart />}
								/>
							</Route>
						</Routes>
					</section>
					<Footer />
				</Fragment>
			</LocalUser>
		</Router>
	)
}

// class App extends React.Component {
// 	constructor() {
// 		super()
// 		this.state = {
// 			user: {},
// 			token: "",
// 			setUserContext: (key, value) => {
// 				this.setState({ [key]: value })
// 			}
// 		}
// 	}

// 	render() {
// 		return (
// 			<Provider store={store}>
// 				<Router>
// 					<LocalUser>
// 						<Fragment>
// 							<Navbar />
// 							<Sidebar className="sidebar" style={inputStyle} />
// 							<Chatbot />
// 							<section
// 								className="right-container"
// 								style={{ minHeight: "900px" }}
// 							>
// 								<Routes>
// 									<Route exact path="/" element={<Items />} />
// 									<Route
// 										path="/dashboard"
// 										element={
// 											<PrivateRoute>
// 												<Dashboard />
// 											</PrivateRoute>
// 										}
// 									/>
// 									<Route exact path="/register" element={<Register />} />
// 									<Route
// 										path="dashboard/profile/edit"
// 										element={
// 											<PrivateRoute>
// 												<EditProfile />
// 											</PrivateRoute>
// 										}
// 									/>
// 									<Route
// 										path="dashboard/bid/edit"
// 										element={
// 											<PrivateRoute>
// 												<EditBid />
// 											</PrivateRoute>
// 										}
// 									/>
// 									<Route path="/item/:id" element={<Item />} />

// 									<Route exact path="/login" element={<Login />} />
// 								</Routes>
// 							</section>
// 							<Footer />
// 						</Fragment>
// 					</LocalUser>
// 				</Router>
// 			</Provider>
// 		)
// 	}
// }

export default App
