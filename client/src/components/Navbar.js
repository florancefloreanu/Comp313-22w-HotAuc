/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\Navbar.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Wednesday, February 23rd 2022, 10:05:41 am
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Navbar component
 */

import React, { useState, Fragment, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"
import { useSelector, useDispatch } from "react-redux"
import { setSearchResult } from "../redux/features/itemSlice"
import { SERVER_URL } from "../ConstantValue"
import axios from "axios"
import { setLogout } from "../redux/features/userInforSlice"

const NavBar = () => {
	// const value = useContext(UserContext)
	const value = useSelector((state) => state.userInfor.user?.email)
	const role = useSelector((state) => state.userInfor.user?.role)
	const [searchCondition, setSearchCondition] = useState("")

	const [spellFix, setSpellFix] = useState()

	const items = useSelector((state) => state.item.value)
	//Set dispatch for Redux
	const dispatch = useDispatch()

	const onSearchConditionChange = (e) => {
		setSearchCondition(e.target.value)
	}

	const handleSearch = async (e) => {
		e.preventDefault()

		try {
			//Set request header
			const config = {
				headers: {
					"Content-Type": "Application/json"
				}
			}

			const res = await axios.get(
				`${SERVER_URL}item/search`,
				{ params: { title: searchCondition } },
				config
			)
			console.log(res.data)
			dispatch(setSearchResult(res.data.items))
			if (res.data.spelling_fix != null) {
				setSpellFix(res.data.spelling_fix)

				setTimeout(() => {
					setSpellFix(null)
				}, 3000)

				setSearchCondition(res.data.spelling_fix)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleLogout = (e) => {
		dispatch(setLogout())
	}

	const guestLink = (
		<>
			<Link to="/login" className="navbar__item">
				Login
			</Link>
			<Link to="/register" className="navbar__item">
				Register
			</Link>
		</>
	)

	const userLink = (
		<>
			<Link to="/" className="navbar__item" onClick={(e) => handleLogout(e)}>
				Logout
			</Link>

			<Link to="/dashboard" className="navbar__item">
				Hello, {value}
			</Link>
		</>
	)
	const adminLink = (
		<>
			<Link to="/" className="navbar__item" onClick={(e) => handleLogout(e)}>
				Logout
			</Link>

			<Link to="/admin/dashboard/home" className="navbar__item">
				Admin Dashboard
			</Link>
		</>
	)

	return (
		<header className="navbar">
			<Link to="/" className="navbar__title navbar__item">
				HotAuc
			</Link>
			{spellFix != null && (
				<span>
					Showing result of
					<b className="bold-text"> {spellFix} </b>
				</span>
			)}
			<form onSubmit={(e) => handleSearch(e)}>
				<label htmlFor="header-search">
					<span className="visually-hidden">Search Items</span>
				</label>
				<input
					type="text"
					id="header-search"
					placeholder="Search items"
					name="s"
					value={searchCondition}
					onChange={(e) => onSearchConditionChange(e)}
				/>
				<button type="submit">Search</button>
			</form>
			<Link to="/" className="navbar__item">
				Home
			</Link>

			<a href="#footer" className="navbar__item">
				Contact Us
			</a>
			{!value && (guestLink)}
			{value && (!role || role === 'user') && (userLink)}
			{value&&role==='admin'&&(adminLink)}
		</header>
	)
}

export default NavBar
