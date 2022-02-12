import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchResult,
  setResultError,
} from "../../../redux/features/dashboardItemsSlice";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../../ConstantValue";
import axios from "axios";

function DashboardSell() {
  const userId = useSelector((state) => state.userInfor.user._id);
  //Set dispatch for Redux
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      console.log("called get sells");
      //Set request header
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };

      const res = await axios.get(`${SERVER_URL}item/userid/${userId}`, config);
      console.log(res.data);
      setItems(res.data);
    };

    fetchItems();
  }, []);

  return (
    <div className="dashboard-sell">
      {items?.map((item) => {
        return (
          <div className="card">
            <div className="card-body">
              {item.images.map((prop) => (
                <img src={item.images[0].uri} alt="hotwheels image" />
              ))}
              <p> </p>
              <h2>{item.title}</h2>
              <p>Brand: {item.brand}</p>
              <p>Color: {item.color}</p>
              <p>Description: {item.description}</p>
              <p>Year: {item.year}</p>
              <p>Current Price: {item.currentPrice}</p>
              <p>End Time: {item.endTime}</p>
            </div>
          </div>
        );
      })}

      <Link to="/dashboard/bid/edit"> Go to post a new sell</Link>
    </div>
  );
}

export default DashboardSell;
