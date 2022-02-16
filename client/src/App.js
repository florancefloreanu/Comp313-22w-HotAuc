import React, { Fragment } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import Items from "./components/item-component/Items"
import Register from "./components/auth-component/Register"
import Login from "./components/auth-component/Login"
import Sidebar from "./components/Sidebar"
import "bootstrap/dist/css/bootstrap.min.css"
import Footer from "./components/Footer"
import { Provider } from "react-redux"
import store from "./redux/store"
import Dashboard from "./components/dashboard-component/Dashboard"
import "bootstrap/dist/css/bootstrap.min.css"
import EditBid from "./components/edit-dashboard-component/edit-bid"
import EditProfile from "./components/edit-dashboard-component/edit-profile"
import Item from "./components/item-component/item"
import Chatbot from "./components/chatbot-component/Chatbot"


class App extends React.Component {
	constructor() {
		super()
		this.state = {
			user: {},
			token: "",
			setUserContext: (key, value) => {
				this.setState({ [key]: value })
			}
		}
	}

	render() {
		return (
			<Provider store={store}>
					<Router>
						<Fragment>
							<Navbar />
							<Sidebar className="sidebar" />
							<Chatbot/>
							
							<section
								className="right-container"
								style={{ minHeight: "900px" }}
							>
								<Routes>
									<Route exact path="/" element={<Items />} />
									<Route path="/dashboard" element={<Dashboard />} />
									<Route
										exact
										path="/api/auth/register"
										element={<Register />}
									/>
									<Route
										path="dashboard/profile/edit"
										element={<EditProfile />}
									/>
									<Route path="dashboard/bid/edit" element={<EditBid />} />
									<Route path="/item/:id" element={<Item />} />

									<Route exact path="/api/auth/login" element={<Login />} />
								</Routes>
							</section>
							<Footer />
						</Fragment>
					</Router>
			</Provider>
		)
	}
}

export default App
