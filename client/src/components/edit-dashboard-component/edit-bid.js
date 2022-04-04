/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\edit-dashboard-component\edit-bid.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Monday, January 17th 2022, 9:55:29 am
 * Author: han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Edit item page in user dashboard
 */


import React from "react"
import { Link } from "react-router-dom"
import ImageUpload from "./image-upload"
import { Button, ButtonGroup } from "react-bootstrap"
import "./edit-bid.css"

function EditBid() {
	return (
		<>
			<Button variant="primary">
				<Link to="/dashboard" className="btn-back">
					go back to dash board
				</Link>
			</Button>
			<div className="edit-bid">
				<ImageUpload></ImageUpload>
			</div>
		</>
	)
}

export default EditBid
