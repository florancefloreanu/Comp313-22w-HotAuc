import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import axios from "axios";
import { SERVER_URL } from "../../../ConstantValue";

function DashboardBid() {
  const userId = useSelector((state) => state.userInfor.user._id);
  //Set dispatch for Redux
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      console.log("called");
      //Set request header
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      console.log(userId);
      const res = await axios.get(`${SERVER_URL}item/bidder/${userId}`, config);
      setItems(res.data);

      console.log(res.data);
      setLoading(false);
    };

    fetchItems();
  }, []);

  const page = (
    <div className="dashboard-bid">
      {items?.map((item) => {
        console.log(item);
        console.log(item.bids);
        let maxPrice = Math.max.apply(
          Math,
          item.bids.map(function (o) {
            return o.price;
          })
        );
        let myPrice = item.bids.map(function (o) {
          if (o.bidder == userId) {
            return o.price;
          }
        });
        console.log(maxPrice);
        console.log(myPrice[0]);

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
              <br />
              <p>Current Price: {item.currentPrice}</p>
              <p>
                <Moment parse="YYYY-MM-DD">{item.endTime}</Moment>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return <>{!loading && page}</>;
}

export default DashboardBid;
