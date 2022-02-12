import { useState, useEffect } from "react";
import storage from "../../firebase/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import {
  InputGroup,
  FormControl,
  Button,
  Col,
  Form,
  Row,
  Alert,
} from "react-bootstrap";
import "./image-upload.css";
import axios from "axios";
import { SERVER_URL } from "../../ConstantValue";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { parseToYYYYMMDD } from "../../helper/time";

function ImageUpload() {
  const userId = useSelector((state) => state.userInfor.user._id);

  const token = useSelector((state) => state.userInfor.token);

  const [images, setImage] = useState([]);

  const [imageUri, setImageUri] = useState(null);

  const [imageUploaded, setImageUploaded] = useState(false);

  const [timeFormatError, setTimeFormatError] = useState(false);

  const navigate = useNavigate();

  const [item, setItem] = useState({
    title: "",
    brand: "",
    description: "",
    color: "",
    year: "",
    seller: userId,
    endTime: "2022-05-01T05:00:00.000+00:00",
    startingPrice: "",
    currentPrice: "",
    images: [],
  });

  const onInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handlePostItem = async (e) => {
    e.preventDefault();
    if (images.length === 0 || imageUri === null || imageUri.length === 0) {
      console.log("No image");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      const newItem = {
        title: item.title,
        description: item.description,
        color: item.color,
        year: item.year,
        seller: userId,
        endTime: item.endTime,
        startingPrice: item.startingPrice,
        currentPrice: item.startingPrice,
        images: imageUri,
      };
      setItem(newItem);
      //setItem({ ...item ,currentPrice:item.startingPrice})
      console.log(newItem);

      //Post item
      try {
        //Set request header
        const config = {
          headers: {
            "Content-Type": "Application/json",
          },
        };
        //Set request body
        const body = JSON.stringify(newItem);
        console.log(body);
        //Make request
        const res = await axios.post(`${SERVER_URL}item`, body, config);
        navigate("/dashboard");

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loadImage = (newImage) => {
    if (newImage != null) {
      setImage([...images, newImage]);
    }
  };

  const upload = async () => {
    if (images != null) {
      //var urls = []
      images.forEach(async (image) => {
        await getImageUri(image);
      });

      // const imageRef = ref(storage, `auction/${images[0].name}`)

      // const snapshot = await uploadBytes(imageRef, images[0])
      // const url = await getDownloadURL(imageRef)
      // console.log(url)

      // imagesRef.put(image).on("state_changed", alert("success"), alert)
    }
  };

  const getImageUri = async (image) => {
    const imageRef = ref(storage, `auction/${image.name}`);
    // 'file' comes from the Blob or File API
    var urls = [];
    const snapshot = uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(imageRef).then((uri) => {
        urls.push({ uri });

        console.log(urls);

        console.log(imageUri);
        setImageUri(urls);
        setImageUploaded(true);
        setTimeout(() => {
          setImageUploaded(false);
        }, 3000);
      });
    });
  };

  const onTimeChange = (e) => {
    const endTime = item.endTime
      .substring(0, item.endTime.indexOf("T"))
      .concat("T" + e.target.value);
    setItem({ ...item, endTime: endTime });
  };

  const onDateChange = (e) => {
    console.log(e.target.value);
    const current = new Date();
    let currentDay = parseToYYYYMMDD(current);

    if (e.target.value >= currentDay) {
      const endTime =
        e.target.value + item.endTime.substring(10, item.endTime.length);

      setItem({ ...item, endTime: endTime });
    } else {
      setTimeFormatError(true);
      setTimeout(() => {
        setTimeFormatError(false);
      }, 3000);
    }
  };

  const [alert, setAlert] = useState();

  //Set timer for alert
  // useEffect(() => {
  // 	const timer = setTimeout(() => {
  // 		console.log(alert)
  // 		setAlert(false)
  // 		console.log(alert)
  // 	}, 3000)

  // 	// To clear or cancel a timer, you call the clearTimeout(); method,
  // 	// passing in the timer object that you created into clearTimeout().

  // 	return () => clearTimeout(timer)
  // }, [])

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
            );
          })}
      </div>
      <div className="image-upload">
        <div class="input-group mb-3">
          <input
            type="file"
            className="form-control"
            id="inputGroupFile02"
            onChange={(e) => {
              loadImage(e.target.files[0]);
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
              <Form.Control
                name="brand"
                type="text"
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
              <Form.Control
                type="text"
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
                value={item.endTime.substring(0, item.endTime.indexOf("T"))}
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
                value={item.endTime.substring(
                  item.endTime.indexOf("T") + 1,
                  item.endTime.indexOf("T") + 6
                )}
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
  );
}

export default ImageUpload;
