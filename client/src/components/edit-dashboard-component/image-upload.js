import { useState, useEffect, Component } from "react"
import storage from "../../firebase/config"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useSelector, useDispatch } from "react-redux"
import {
	InputGroup,
	FormControl,
	Button,
	Col,
	Form,
	Row,
	Alert,
	Dropdown,
	DropdownButton
} from "react-bootstrap"
import Select from "react-select"
import "./image-upload.css"
import axios from "axios"
import { SERVER_URL } from "../../ConstantValue"
import { useNavigate } from "react-router-dom"
import { async } from "@firebase/util"
import { parseToYYYYMMDD } from "../../helper/time"

function ImageUpload() {
	const userId = useSelector((state) => state.userInfor.user._id)

	const token = useSelector((state) => state.userInfor.token)

	const [images, setImage] = useState([])

	const [imageUri, setImageUri] = useState([])

	const [imageUploaded, setImageUploaded] = useState(false)

	const [timeFormatError, setTimeFormatError] = useState(false)

	var imageUris = []

	const navigate = useNavigate()

	const [item, setItem] = useState({
		title: "",
		brand: "Mazda",
		description: "",
		color: "",
		year: "2000",
		seller: userId,
		endTime: new Date(),
		startingPrice: "",
		currentPrice: "",
		images: []
	})

	const onInputChange = (e) => {
		setItem({ ...item, [e.target.name]: e.target.value })
	}

	const handlePostItem = async (e) => {
		e.preventDefault()
		if (images.length === 0 || imageUri === null || imageUri.length === 0) {
			console.log("No image")
			setAlert(true)
			setTimeout(() => {
				setAlert(false)
			}, 3000)
		} else {
			const newItem = {
				title: item.title,
				brand: item.brand,
				description: item.description,
				color: item.color,
				year: item.year,
				seller: userId,
				endTime: item.endTime,
				startingPrice: item.startingPrice,
				currentPrice: item.startingPrice,
				images: imageUri
			}
			setItem(newItem)
			//setItem({ ...item ,currentPrice:item.startingPrice})
			console.log(newItem)

			//Post item
			try {
				//Set request header
				const config = {
					headers: {
						"Content-Type": "Application/json"
					}
				}
				//Set request body
				const body = JSON.stringify(newItem)
				console.log(body)
				//Make request
				const res = await axios.post(`${SERVER_URL}item`, body, config)
				navigate("/dashboard")

				console.log(res.data)
			} catch (error) {
				console.log(error)
			}
		}
	}

	const loadImage = (newImage) => {
		if (newImage != null) {
			setImage([...images, newImage])
		}
	}

	const upload = async () => {
		if (images != null) {
			for (const image of images) {
				await getImageUri(image)
			}
			// images.forEach(async (image) => {
			//   await getImageUri(image);
			// });
		}
	}

	const getImageUri = async (image) => {
		const imageRef = ref(storage, `auction/${image.name}`)
		// 'file' comes from the Blob or File API
		var urls = []
		const snapshot = uploadBytes(imageRef, image).then((snapshot) => {
			getDownloadURL(imageRef).then((uri) => {
				imageUris.push({ uri })
				var currentUris = [...imageUri, { uri }]

				setImageUri((imageUri) => [...imageUri, { uri }])

				setImageUploaded(true)
				setTimeout(() => {
					setImageUploaded(false)
				}, 3000)
			})
		})
	}

	const onTimeChange = (e) => {
		const time = e.target.value
		const hour = time.substring(0, 2)
		const minute = time.substring(3, 5)
    let endTime = item.endTime
    console.log(endTime.getHours())
		endTime.setMinutes(minute)
    endTime.setHours(parseInt(hour))
    console.log(endTime)
		setItem({ ...item, endTime: endTime })
	}

	const onDateChange = (e) => {
		const current = new Date()
		let currentDay = parseToYYYYMMDD(current)

		if (e.target.value >= currentDay) {
			const dateTime = e.target.value
			const fullYear = dateTime.substring(0, 4)
			const month = dateTime.substring(5, 7)
			const date = dateTime.substring(8, 10)
			let endTime = item.endTime
			endTime.setFullYear(fullYear)
			endTime.setMonth(parseInt(month) - 1)
			endTime.setDate(date)

			setItem({ ...item, endTime: endTime })
		} else {
			setTimeFormatError(true)
			setTimeout(() => {
				setTimeFormatError(false)
			}, 3000)
		}
	}

	const [alert, setAlert] = useState()

	const brandOptions = [
		{ value: "Mazda", label: "Mazda" },
		{ value: "Ford", label: "Ford" },
		{ value: "Porsche", label: "Porsche" },
		{ value: "BMW", label: "BMW" },
		{ value: "Honda", label: "Honda" },
		{ value: "Toyota", label: "Toyota" },
		{ value: "Ferrari", label: "Ferrari" },
		{ value: "Lamborghini", label: "Lamborghini" },
		{ value: "Chevrolet", label: "Chevrolet" },
		{ value: "Dodge", label: "Dodge" }
	]

	const yearOptions = [
		{ value: "2000", label: "2000" },
		{ value: "2001", label: "2001" },
		{ value: "2002", label: "2002" },
		{ value: "2003", label: "2003" },
		{ value: "2004", label: "2004" },
		{ value: "2005", label: "2005" },
		{ value: "2006", label: "2006" },
		{ value: "2007", label: "2007" },
		{ value: "2008", label: "2008" },
		{ value: "2009", label: "2009" },
		{ value: "2010", label: "2010" },
		{ value: "2012", label: "2012" },
		{ value: "2017", label: "2017" },
		{ value: "2018", label: "2018" },
		{ value: "2019", label: "2019" },
		{ value: "2020", label: "2020" },
		{ value: "2021", label: "2021" },
		{ value: "2022", label: "2022" }
	]

	return (
		<div className="container">
			<h1 className="large text-primary">Post a new auction item</h1>
			<div className="image-container">
				{images != null &&
					images.map((image) => {
						return (
							<img
								key={image.name}
								src={URL.createObjectURL(image)}
								alt="..."
								className="img-thumbnail rounded float-left"
							></img>
						)
					})}
			</div>
			<div className="image-upload">
				<div class="input-group mb-3">
					<input
						type="file"
						className="form-control"
						id="inputGroupFile02"
						onChange={(e) => {
							loadImage(e.target.files[0])
						}}
					/>
					<button className="input-group-text" onClick={upload}>
						Upload
					</button>
				</div>
			</div>
			{imageUploaded && (
				<Alert variant="success">Image uploaded successfully</Alert>
			)}
			<div>
				<Form onSubmit={(e) => handlePostItem(e)}>
					<Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
						<Form.Label column sm={2}>
							Title
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="title"
								type="text"
								placeholder="title"
								value={item.title}
								onChange={(e) => onInputChange(e)}
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
						<Form.Label column sm={2}>
							Brand
						</Form.Label>
						<Col sm={10}>
							<Form.Select name="brand" onChange={(e) => onInputChange(e)}>
								{brandOptions.map((brand) => {
									return <option value={brand.value}>{brand.value}</option>
								})}
							</Form.Select>
							<Form.Control
								name="brand"
								type="hidden"
								placeholder="Brand"
								value={item.brand}
								onChange={(e) => onInputChange(e)}
							/>
						</Col>
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							name="description"
							value={item.description}
							onChange={(e) => onInputChange(e)}
						/>
					</Form.Group>
					<Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
						<Form.Label column sm={2}>
							Year
						</Form.Label>
						<Col sm={10}>
							<Form.Select name="year" onChange={(e) => onInputChange(e)}>
								{yearOptions.map((year) => {
									return <option value={year.value}>{year.value}</option>
								})}
							</Form.Select>
							<Form.Control
								type="hidden"
								placeholder="year"
								name="year"
								value={item.year}
								onChange={(e) => onInputChange(e)}
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
						<Form.Label column sm={2}>
							Color
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								type="text"
								placeholder="color"
								name="color"
								value={item.color}
								onChange={(e) => onInputChange(e)}
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3" controlId="formHorizontalPrice">
						<Form.Label column sm={2}>
							Starting Price
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="startingPrice"
								type="number"
								placeholder="Starting Price"
								value={item.startingPrice}
								onChange={(e) => onInputChange(e)}
							/>
						</Col>
					</Form.Group>
					<Form.Group
						as={Row}
						className="mb-3"
						controlId="formHorizontalEndTime"
					>
						<Form.Label column sm={2}>
							End date
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								type="date"
								placeholder="endDate"
								name="endDate"
								value={
									item.endTime.getFullYear() +
									"-" +
									(item.endTime.getMonth() + 1 > 9
										? item.endTime.getMonth() + 1
										: "0".concat(item.endTime.getMonth() + 1)) +
									"-" +
									item.endTime.getDate()
								}
								onChange={(e) => onDateChange(e)}
							/>
						</Col>
					</Form.Group>
					<Form.Group
						as={Row}
						className="mb-3"
						controlId="formHorizontalEndDate"
					>
						<Form.Label column sm={2}>
							End time
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								type="time"
								placeholder="endTime"
								name="endTime"
								value={
									(item.endTime.getHours() > 9
										? item.endTime.getHours()
										:  "0".concat(item.endTime.getHours())) +
									":" +
									(item.endTime.getMinutes()>9?item.endTime.getMinutes():"0".concat(item.endTime.getMinutes()))+":"+"00"
								}
								onChange={(e) => onTimeChange(e)}
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3">
						<Col sm={{ span: 10, offset: 2 }}>
							<Button type="submit">Post</Button>
						</Col>
					</Form.Group>
					{timeFormatError && (
						<Alert variant="danger">Time must be later than current</Alert>
					)}
					{alert && <Alert variant="danger">Please upload images first</Alert>}
				</Form>
			</div>
		</div>
	)
}

export default ImageUpload
