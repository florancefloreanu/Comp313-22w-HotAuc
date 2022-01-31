import React, { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { login } from "../../redux/features/userInforSlice"

function UserLogin(props) {
	const { user, errors, token } = useSelector((state) => state.userInfor)
	const dispatch = useDispatch()
	const loginErrorMsg = errors[0]?.msg
	const navigate = useNavigate()
	const [loginUserState, setLoginUserState] = useState({
		email: "",
		password: ""
	})
	const [loginUserErrorState, setLoginUserErrorState] = useState({
		emailError: true,
		passwordError: true
	})

	function emailOnChangeHandler(e) {
		setLoginUserState({ ...loginUserState, email: e.target.value })
		setLoginUserErrorState({ ...loginUserErrorState, emailError: false })
	}
	function passwordOnChangeHandler(e) {
		setLoginUserState({ ...loginUserState, password: e.target.value })
		setLoginUserErrorState({ ...loginUserErrorState, passwordError: false })
	}

	useEffect(() => {
		if (!!token && errors.length === 0) {
			navigate("/")
		}
	}, [token, errors])

	return (
		<>
			<div className="card mx-auto">
				<Form className="m-3">
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={loginUserState.email}
							onChange={emailOnChangeHandler}
						/>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={loginUserState.password}
							onChange={passwordOnChangeHandler}
						/>
					</Form.Group>
					<Form.Group className="d-flex">
						{/* <Button variant="primary" type="button" onClick={login}>
							Submit
						</Button> */}
						<Button
							variant="primary"
							type="button"
							onClick={() => dispatch(login(loginUserState))}
						>
							Submit
						</Button>
						<Form.Text className="mx-3 text-danger">{loginErrorMsg}</Form.Text>
					</Form.Group>
				</Form>
			</div>
		</>
	)
}

export default UserLogin
