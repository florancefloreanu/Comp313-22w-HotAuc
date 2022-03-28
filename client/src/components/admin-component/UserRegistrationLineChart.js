import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import Chart from "chart.js/auto";
import axios from "axios";
import { SERVER_URL } from "../../ConstantValue";
import { Bar, Pie, Line } from "react-chartjs-2";
import "./chart.css";

const UserRegistrationLineChart = () => {
  //value for all the list of brands that has count > 1
  const [monthLabels, setMonthLabels] = useState([]);
  //corresponding count for brandlist
  const [registeredUsersMonthly, setRegisteredUsersMonthly] = useState([]);

  const loadData = async () => {
    try {
      //Set request header
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      console.log("try block conditions: ");
      const res = await axios.get(
        `${SERVER_URL}item/all/monthly-registered-users`,
        config
      );
      setMonthLabels(res.data.currentMonth);
      setRegisteredUsersMonthly(res.data.monthlyRegistrations);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="chart">
      <Line
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Line Chart for Monthly User Registrations",
              padding: { top: 10, bottom: 30 },
            },
          },
        }}
        data={{
          labels: monthLabels,
          datasets: [
            {
              label: "Number of users Registered",
              data: registeredUsersMonthly,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default UserRegistrationLineChart;
