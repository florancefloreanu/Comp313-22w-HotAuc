import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchResult,
  setResultError,
} from "../../../redux/features/dashboardItemsSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../../ConstantValue";
import Moment from "react-moment";

function DashboardSell() {
  const userId = useSelector((state) => state.userInfor.user._id);
  //Set dispatch for Redux
  const [items, setItems] = useState([]);
  const [earning, setEarning] = useState();

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

      var paidItems = await res.data.filter(item => item.isPaid === true);
      const paidItemsArray = paidItems.map(item => item.currentPrice);
      const sumEarning = paidItemsArray.reduce((partialSum, a) => partialSum + a, 0);
  
      console.log('Sum of earning: $', sumEarning);
      setEarning(sumEarning);

      console.log(res.data);
      setItems(res.data);
    };

    fetchItems();
  }, []);


  return (
    <div className="dashboard-sell">
      <Link to="/dashboard/bid/edit"> Go to post a new sell</Link>
      <h3>My earning : $ {earning}</h3>
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
              <p>Seller Id: {item.seller}</p>
              <p>Current status:  
                {item.isPaid && (
                  'Already paid'
                  )}
                {!item.isPaid && (
                  'not paid'
                )}
              </p>
							<p className="text">
								End Date:
								{
									<Moment format="YYYY-MM-DD">{item.endTime}</Moment>
								}
							</p>
							<p className="text">
								End Time:
								{ <Moment format="HH:mm">{item.endTime}</Moment>}
							</p>
						</div>
					</div>
				)
      })}
    </div>
  );
}

export default DashboardSell;
