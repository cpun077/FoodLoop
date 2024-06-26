"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import './volunteer.css';
import SpeedIcon from '@mui/icons-material/Speed';

export default function Volunteer() {

  const [clicked, setClicked] = useState(false)

  interface tupleInterface {
    id: number,
    d: string;
    pickup: string;
    dropoff: string
    time: string;
    food: number
  }

  const Tuple = (props: tupleInterface) => {

    const handleClick = async () => {
      setClicked(true)
      const email = localStorage.getItem("Email") ?? null;

      const response = await fetch('http://localhost:8000/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Email": email,
          "Delivery ID": props.id,
          "Food ID": props.food
        })
      });
  
      if (!response.ok) {
        const data = await response.json()
        alert(data.error)
      }
  
    }

    return (
      <div className="deliverytableheaders1">
        <div className="miles-wrapper">
          <div className="thank-you-for-container">{props.d}</div>
        </div>
        <div className="deliverytableheaders-child1">
        </div>
        <div className="fruitdale-ave-san-jose-ca-wrapper">
          <div className="fruitdale-ave-san">{props.pickup}</div>
        </div>
        <div className="deliverytableheaders-child1">
        </div>
        <div className="union-sq-san-jose-ca-wrapper">
          <div className="fruitdale-ave-san">{props.dropoff}</div>
        </div>
        <div className="deliverytableheaders-child1">
        </div>
        <div className="mins-wrapper">
          <div className="thank-you-for-container">{props.time}</div>
        </div>
        <div className="deliverytableheaders-child1">
        </div>
        <button onClick={handleClick} className="view-wrapper">
          <div className="thank-you-for-container">Pick Up</div>
        </button>
      </div>
    )
  }

  const [rows, setRows] = useState([
    {
      id: 1,
      d: "12 Mi",
      pickup: "1497 Fruitdale Ave, San Jose, CA",
      dropoff: "100 Union Sq, San Jose, CA",
      time: "25 Min",
      food: 2
    },
    {
      id: 2,
      d: "15 Mi",
      pickup: "2924 Carter Way, Antioch, CA",
      dropoff: "101 San Fernando, Antioch, CA",
      time: "30 Min",
      food: 7
    },
    {
      id: 3,
      d: "18 Mi",
      pickup: "567 Carter Way, Antioch, CA",
      dropoff: "1001 Union Sq, San Jose, CA",
      time: "35 Min",
      food: 11
    },
  ])

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(`http://localhost:8000/api/deliveries`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      interface DeliveryData {
        "Pickup Address": string;
        "Delivery Address": string;
        "Delivery ID": number;
        "Food ID": number
      }
      let parsed = await response.json()
      let string = await parsed.message
      let fixed = string.replace(/'/g, '"'); //has single quotes around keys for some reason
      let array = JSON.parse(fixed)
      let updatedtuples = array.map((row: DeliveryData) => ({
        id: row["Delivery ID"],
        d: "15 Mi",
        pickup: row["Pickup Address"],
        dropoff: row["Delivery Address"],
        time: "35 min",
        food: row["Food ID"]
      }))
      console.log(updatedtuples)
      setRows(updatedtuples)
    };

    getOrders();
  }, [])

  return (
      <div className="delivery-landing-page-ui">
        <div className="delivery-landing-page-ui-inner">
          <div className="thank-you-for-donating-your-ti-wrapper">
            <div className="thank-you-for-container">
              <p className="thank-you-for-donating-your-ti">
                <b>Thank you for donating your time!</b>
              </p>
              <p className="thank-you-for-donating-your-ti">We appreciate you helping someone in need and helping reduce food waste.</p>
            </div>
          </div>
        </div>
        <div className="frame-parent">
          <div className="total-miles-to-travel-parent">
            <div className="nav-bar-button">Total miles to travel:</div>
            <div className="frame-wrapper">
              <div className="miles-parent">
                <div className="miles">20 Miles</div>
                < SpeedIcon />

              </div>
            </div>
          </div>
          <div className="sort-by-parent">
            <div className="sort-by">Sort by: </div>
            <div className="frame-container">
              <div className="nearest-wrapper">
                <div className="nearest">Nearest</div>
              </div>
            </div>
            <div className="frame-container">
              <div className="fastest-wrapper">
                <div className="fastest">Fastest</div>
              </div>
            </div>
          </div>
        </div>
        <div className="delivery-landing-page-ui-child">
        </div>
        <div className="deliverytableheaders">
          <div className="total-miles-wrapper">
            <div className="total-miles">Total miles</div>
          </div>
          <div className="deliverytableheaders-child">
          </div>
          <div className="total-miles-wrapper">
            <div className="total-miles">Pickup address</div>
          </div>
          <div className="deliverytableheaders-child">
          </div>
          <div className="drop-off-address-wrapper">
            <div className="total-miles">Drop-off address</div>
          </div>
          <div className="deliverytableheaders-child">
          </div>
          <div className="drop-off-address-wrapper">
            <div className="total-miles">Total Travel Time</div>
          </div>
          <div className="deliverytableheaders-child">
          </div>
          <div className="drop-off-address-wrapper">
            <div className="review">Review</div>
          </div>
        </div>
        {
          rows.map((row) => (
            <div>
              <div className="delivery-landing-page-ui-child">
              </div>
              <Tuple
                id={row.id}
                d={row.d}
                pickup={row.pickup}
                dropoff={row.dropoff}
                time={row.time}
                food={row.food}
              />
              <div className="delivery-landing-page-ui-child">
              </div>
            </div>
          ))
        }
      </div>
  );
}
