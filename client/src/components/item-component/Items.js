/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\item-component\Items.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Tuesday, March 29th 2022, 6:39:21 pm
 * Author: Olivia
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Show items list
 */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Items.css";
import axios from "axios";
import { setSearchResult } from "../../redux/features/itemSlice";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../ConstantValue";
import Moment from "react-moment";

const Items = () => {
  const items = useSelector((state) => state.item.value);

  //Set dispatch for Redux
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("called");
        //Set request header
        const config = {
          headers: {
            "Content-Type": "Application/json",
          },
        };

        const res = await axios.get(`${SERVER_URL}item/all`, config);

        dispatch(setSearchResult(res.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, [dispatch]);

  const cards = (
    <>
      {items.length >= 1 ? (
        <div className="cards">
          {items.map((item) => {
            return (
              <div className="card">
                <Link to={`/item/${item._id}`} className="no-decoration">
                  <div className="card-body">
                    <img
                      src={
                        item.images[0]
                          ? item.images[0].uri
                          : "https://previews.123rf.com/images/happyvector071/happyvector0711608/happyvector071160800591/62947847-abstract-creative-vector-design-layout-with-text-do-not-exist-.jpg"
                      }
                    />

                    <p> </p>
                    <h2>{item.title}</h2>
                    <p>Brand: {item.brand}</p>
                    <p>Year: {item.year}</p>
                    <p>Price: {item.currentPrice}</p>
                    <p>Color: {item.color}</p>
                    <p>Description: {item.description}</p>
                    <p class="text">
                      End Date:
                      {!loading && (
                        <Moment format="YYYY-MM-DD">{item.endTime}</Moment>
                      )}
                    </p>
                    <p class="text">
                      End Time:
                      {!loading && (
                        <Moment format="HH:mm">{item.endTime}</Moment>
                      )}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="error">
          <p>Sorry, There Are No Results To Your Filter</p>
        </div>
      )}
    </>
  );

  return <>{!loading && cards}</>;
};
export default Items;
