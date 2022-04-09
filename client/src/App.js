import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Items from "./components/item-component/Items";
import Register from "./components/auth-component/Register";
import Login from "./components/auth-component/Login";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

import DashboardProfile from "./components/dashboard-component/layouts/Dashboard-profile";
import DashboardBid from "./components/dashboard-component/layouts/Dashboard-bid";
import DashboardSell from "./components/dashboard-component/layouts/Dashboard-sell";
import DashboardWin from "./components/dashboard-component/layouts/Dashboard-win";
import "bootstrap/dist/css/bootstrap.min.css";
import EditBid from "./components/edit-dashboard-component/edit-bid";
import EditProfile from "./components/edit-dashboard-component/edit-profile";
import Item from "./components/item-component/item";
import Chatbot from "./components/chatbot-component/Chatbot";
import { LocalUser } from "./components/LocalUser";
import { PrivateRoute } from "./PrivateRoute";
import NoSidebar from "./components/NoSidebar";
import ShowSidebar from "./components/ShowSidebar";
import ShowDashboardSidebar from "./components/ShowDashboardSidebar";
import AdminDashboard from "./components/admin-component/AdminDashboard";
import BrandPieChart from "./components/admin-component/BrandPieChart";
import OneSignal from "react-onesignal";
import UserRegistrationLineChart from "./components/admin-component/UserRegistrationLineChart";
import MonthlyItemsPostedBarChart from "./components/admin-component/MonthlyItemsPostedBarChart";
import AdminAllUsers from "./components/admin-component/users/AdminAllUsers"
import EditUser from "./components/admin-component/users/EditUser"
import AdminAllItems from "./components/admin-component/items/AdminAllItems"
import EditItem from "./components/admin-component/items/EditItem"
import AdminDashboardHome from "./components/admin-component/AdminDashboardHome"
const appId = "5d1f1b0a-5f01-4823-9796-7ccc768f8393";

function App() {
  const [sideBarVisibility, setSideBarVisibility] = useState({
    visibility: "visible",
  });
  const [mainContainerMargin, setMainContainerMargin] = useState({
    marginLeft: "400px",
  });

  const sidebarDisplay = useSelector((state) => state.layout.value.sidebar);

  useEffect(() => {
    console.log(sidebarDisplay);
    if (sidebarDisplay) {
      setSideBarVisibility({ visibility: "visible" });
      setMainContainerMargin({ marginLeft: "400px" });
    } else {
      setSideBarVisibility({ visibility: "hidden" });
      setMainContainerMargin({ marginLeft: "50px" });
    }
  }, [sidebarDisplay]);

  //Set oneSignal
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    OneSignal.init({ appId: appId }).then(async () => {
      setInitialized(true);
      OneSignal.showSlidedownPrompt().then(() => {
        // do other stuff
      });
    });
  }, []);

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
                path="/dashboard/profile"
                element={
                  <PrivateRoute>
                    <div className="dashboard">
                    <table>
                      <thead>
                        <tr>
                          <td className="dashboard-sidebar">
                            <ShowDashboardSidebar/>
                          </td>
                          <td>
                            <NoSidebar>
                              <DashboardProfile/>
                            </NoSidebar>
                          </td>
                        </tr>
                      </thead>
                    </table>
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <NoSidebar>
                      <DashboardProfile />
                    </NoSidebar>
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/sell"
                element={
                  <PrivateRoute>
                    <div className="dashboard">
                    <table>
                      <thead>
                        <tr>
                          <td className="dashboard-sidebar">
                            <ShowDashboardSidebar/>
                          </td>
                          <td>
                            <NoSidebar>
                              <DashboardSell/>
                            </NoSidebar>
                          </td>
                        </tr>
                      </thead>
                    </table>
                    </div>
                  </PrivateRoute>
                }
              />
               <Route
                path="/dashboard/bid"
                element={
                  <PrivateRoute>
                    <div className="dashboard">
                    <table>
                      <thead>
                        <tr>
                          <td className="dashboard-sidebar">
                            <ShowDashboardSidebar/>
                          </td>
                          <td>
                            <NoSidebar>
                              <DashboardBid/>
                            </NoSidebar>
                          </td>
                        </tr>
                      </thead>
                    </table>
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/win"
                element={
                  <PrivateRoute>
                    <div className="dashboard">
                    <table>
                      <thead>
                        <tr>
                          <td className="dashboard-sidebar">
                            <ShowDashboardSidebar/>
                          </td>
                          <td>
                            <NoSidebar>
                              <DashboardWin/>
                            </NoSidebar>
                          </td>
                        </tr>
                      </thead>
                    </table>
                    </div>
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
								<Route path="home" element={<AdminDashboardHome />} />
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

export default App
