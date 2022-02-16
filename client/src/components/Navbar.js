import React, { useState, Fragment } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"
import { useSelector, useDispatch } from "react-redux"
import { setSearchResult } from "../redux/features/itemSlice"
import { SERVER_URL } from "../ConstantValue"
import axios from "axios"

const NavBar = () => {
	// const value = useContext(UserContext)
	const value = useSelector((state) => state.userInfor.user?.email)

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
			dispatch(setSearchResult(res.data.items))
			if (res.data.spelling_fix != null) {
				setSpellFix(res.data.spelling_fix)
				setSearchCondition(res.data.spelling_fix)
			} else {
				setSpellFix(null)
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	const guestLink = (
		<>
			<Link to="/api/auth/login" className="navbar__item">
				Login
			</Link>
			<Link to="/api/auth/register" className="navbar__item">
				Register
			</Link>
		</>
	)

	const authLink = (
		<>
			<Link to="/" className="navbar__item" onClick="Logout">
				Logout
			</Link>

			<Link to="/dashboard" className="navbar__item">
				Hello, {value}
			</Link>
		</>
	)

	//   if (value.user["email"]) {
	//     return (
	// 			<header className="navbar">
	// 				<Link to="/" className="navbar__title navbar__item">
	// 					HotAuc
	// 				</Link>
	// 				<form onSubmit={(e) => handleSerch(e)}>
	// 					<label htmlFor="header-search">
	// 						<span className="visually-hidden">Search Items</span>
	// 					</label>
	// 					<input
	// 						type="text"
	// 						id="header-search"
	// 						placeholder="Search items"
	//             name="s"
	//             value={searchCondition}
	// 						onChange={(e) => onSearchConditionChange(e)}
	// 					/>
	// 					<button type="submit">Search</button>
	// 				</form>
	// 				<Link to="/" className="navbar__item">
	// 					Home
	// 				</Link>
	// 				<div to="" className="navbar__item">
	// 					Hello, {value.user["email"]}{" "}
	// 				</div>
	// 				<Link to="/" className="navbar__item">
	// 					Contact Us
	// 				</Link>
	// 				<Link to="/" className="navbar__item" onClick={e=>logout()}>
	// 					Logout
	// 				</Link>
	// 			</header>
	// 		)
	//   } else {
	//     return (
	//       <header className="navbar">
	//         <Link to="/" className="navbar__title navbar__item">
	//           HotAuc
	//         </Link>
	//         <form action="/" method="get">
	//           <label htmlFor="header-search">
	//             <span className="visually-hidden">Search Items</span>
	//           </label>
	//           <input
	//             type="text"
	//             id="header-search"
	//             placeholder="Search Items"
	//             name="s"
	//           />
	//           <button type="submit">Search</button>
	//         </form>
	//         <Link to="/" className="navbar__item">
	//           Home
	//         </Link>

	//         <Link to="/api/auth/login" className="navbar__item">
	//           Login
	//         </Link>
	//         <Link to="/api/auth/register" className="navbar__item">
	//           Register
	//         </Link>
	//         <Link onClick={()=>{window.scrollTo(0,document.body.scrollHeight)}} to="/#bottom" className="navbar__item">
	//           Contact Us
	//         </Link>
	//       </header>
	//     );
	//   }
	// };

	// const logout = () => {
	//   const navigate = useNavigate();
	//   const appContext = useContext(UserContext);
	//   appContext.setUserContext({
	//     user: {},
	//     token: "",
	//   });
	//   navigate("/");
	// };

	// function Navbar1() {
	//   return (
	//     <div className="navbar-container">
	//       <NavBar />
	//     </div>
	//   );
	// }

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
			{<Fragment>{value ? authLink : guestLink}</Fragment>}
		</header>
	)
}

export default NavBar
