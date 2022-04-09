import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import axios from "axios";
import { SERVER_URL } from "../../../ConstantValue";
import "../Dashboard.css";

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
      <h2>Bidding</h2>
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
            <div className="card-body1">

						<table>
							<thead>
							<tr>
								<td rowspan="2">
									{item.images.map((prop) => (
									<img src={item.images[0].uri} alt="hotwheels image" />
								))}
								</td>
								<td className="title-col">
									{item.title}
								</td>
								<td rowspan="2" className="price-col">
									<p>$ {item.currentPrice}</p>
								</td>
								<td rowspan="2" className="endtime-col">
                  <Moment date={item.endTime} format="MMM/DD/YYYY HH:mm"></Moment>

								</td>
							</tr>
							<tr>
								<td>
                  <p>Brand: {item.brand}</p>
									<p>Color: {item.color}</p>
									<p>Description: {item.description}</p>
									<p>Year: {item.year}</p>
								</td>
							</tr>
							</thead>
						</table>
            </div>
          </div>
        );
      })}
    </div>
  );

  return <>{!loading && page}</>;
}

export default DashboardBid;
