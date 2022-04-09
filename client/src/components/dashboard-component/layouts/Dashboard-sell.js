import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../../ConstantValue";
import Moment from "react-moment";
import "../Dashboard.css";

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
      <h2>Selling</h2>
      <h5>
        My earnings : <span class="stress">$ {earning}</span>
      </h5>
      {items?.map((item) => {
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
								<td className="title-col1">
									{item.title}
								</td>
								<td rowspan="2" className="endtime-col">
                <Moment date={item.endTime} format="MMM/DD/YYYY HH:mm"></Moment>
								</td>
                <td rowspan="2" className="price-col">
									<p>$ {item.currentPrice}</p>
								</td>
								<td rowspan="2" className="paid-col">
                {item.isPaid && (
                  ' Paid'
                  )}
                {!item.isPaid && (
                  ' Not paid'
                )}
								</td>
							</tr>
							<tr>
              <td className="description-col">
									<p>Color: {item.color}</p>
									<p>Description: {item.description}</p>
									<p>Year: {item.year}</p>
								</td>
							</tr>
							</thead>
						</table>

						</div>
					</div>
				)
      })}
    </div>
  );
}

export default DashboardSell;
