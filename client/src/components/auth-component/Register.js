/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\auth-component\Register.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Tuesday, March 29th 2022, 7:02:01 pm
 * Author: ting
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: User register page
 */


import "./Register.css"
import React, {useEffect, useState } from "react"
import "./Login.css"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { register } from "../../redux/features/userInforSlice"

function Register() {

	const { user, errors, token } = useSelector(state => state.userInfor)
	const dispatch = useDispatch();
	const registErrorMsg = errors[0]?.msg;

	const navigate = useNavigate();
	const [RegistUserState, setRegistUserState] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [RegistUserErrorState, setRegistUserErrorState] = useState({
		nameError: true,
		emailError: true,
		passwordError: true,
		registErrorMsg: "",
	});

	function nameOnChangeHandler(e) {
		setRegistUserState({ ...RegistUserState, name: e.target.value });
		setRegistUserErrorState({ ...RegistUserErrorState, nameError: false });
	}
	function emailOnChangeHandler(e) {
		setRegistUserState({ ...RegistUserState, email: e.target.value });
		setRegistUserErrorState({ ...RegistUserErrorState, emailError: false });
	}
	function passwordOnChangeHandler(e) {
		setRegistUserState({ ...RegistUserState, password: e.target.value });
		setRegistUserErrorState({ ...RegistUserErrorState, passwordError: false });
	}

	useEffect(() => {
		if (!!token && errors.length === 0) {
			navigate('/');
		}
	},[token,errors])

	return (
		<>
			<div className="card mx-auto">
				<Form className="m-3">
					<Form.Group className="mb-3" controlId="formBasicname">
						<Form.Label>User Name</Form.Label>
						<Form.Control type="text" placeholder="Enter name" value={RegistUserState.name} onChange={nameOnChangeHandler} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" value={RegistUserState.email} onChange={emailOnChangeHandler} />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>


					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" value={RegistUserState.password} onChange={passwordOnChangeHandler} />
					</Form.Group>
					
					<Form.Group className="d-flex">
						<Button variant="primary" type="button" onClick={() => dispatch(register(RegistUserState))}>
							Submit
						</Button>
						<Form.Text className="mx-3 text-danger">
							{registErrorMsg}
						</Form.Text>
					</Form.Group>

				</Form>
			</div>
		</>

	);
}

export default Register
