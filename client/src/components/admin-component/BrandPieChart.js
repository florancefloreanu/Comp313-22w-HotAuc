import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Chart from "chart.js/auto";
import axios from "axios";
import { SERVER_URL } from "../../ConstantValue";
import { Bar, Pie } from "react-chartjs-2";
import "./BrandPieChart.css";

const PieChart = () => {
  //value for all the list of brands that has count > 1
  const [brandList, setBrandList] = useState([]);
  //corresponding count for brandlist
  const [brandCount, setBrandCount] = useState([]);
  const itemName = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];

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
        `${SERVER_URL}item/all/getbrands&count`,
        config
      );
      setBrandList(res.data.brandList);
      setBrandCount(res.data.brandCount);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="pie-chart">
      <Pie
        className="pie"
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Pie Chart for Brand Count",
              padding: { top: 10, bottom: 30 },
            },
          },
        }}
        data={{
          labels: brandList,
          datasets: [
            {
              label: "# of Votes",
              data: brandCount,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChart;
