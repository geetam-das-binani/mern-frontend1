import React from "react";
import Sidebar from "./Sidebar.jsx";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
export default function DashBoard() {
  Chart.register(...registerables);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,77,49)"],
        data: [0, 4000],
      },
    ],
  };
  const doughnutState={
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
       
        backgroundColor: ["#00A6B4","#6800B4"],
        hoverBackgroundColor: ["#4B5000","#25014F"],
        data: [2,10],
      },
    ],
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__container">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboard__summary">
          <div>
            <p>
              Total Amount
              <br />
              ₹2000
            </p>
          </div>
          <div className="dashboard__summary__box2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>₹10</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>4</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>

          <div className="line__chart">
            <Line data={lineState} />
          </div>
          <div className="donut__chart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </div>
  );
}
