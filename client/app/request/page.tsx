"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './FoodRequestorPage1.css';
import RootLayout from '../layout';
import SetMealIcon from '@mui/icons-material/SetMeal';
import { SetMeal } from '@mui/icons-material';

export default function Request() {

  let temppic = "https://drive.google.com/thumbnail?id=1SHzji5N7mM0hxLYWaNXlj2O6lJ5fOY9B"

  const [clicked, setClicked] = useState(false)

  interface ItemInterface {
    description: string;
    pic: string;
    id: number;
  }
  const Item = (props: ItemInterface) => {

    const handleClick = async () => {
      setClicked(true)
      const email = localStorage.getItem("Email") ?? null;

      const response = await fetch('http://localhost:8000/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Email": email,
          "Food ID": props.id,
        })
      });
  
      if (!response.ok) {
        const data = await response.json()
        alert(data.error)
      }
  
    }

    return (
      <button className="view-button-1" onClick={handleClick}>
        <img className="uploadfoodimagebutton-icon" alt="" src={`data:image/png;base64,${props.pic}`} />

        <div className="shrimp-scampi-with-oyster-container">
          <p className="shrimp-scampi">{props.description}</p>
        </div>
        <div className="requestthisbutton">
          <div className="about-us">Order</div>
        </div>
      </button>
    )
  }

  const [items, setItems] = useState([
    {
      description: "Shrim Scampi with Oyster Sauce Be Aware of Allergies.",
      pic: "Sample",
      id: 1,
    }, {
      description: "Shrimp Noodles with Oyster Sauce and French Fries on the Side",
      pic: "Sample",
      id: 2,
    }, {
      description: "Shrimp Noodles with Oyster Sauce and French Fries on the Side",
      pic: "Sample",
      id: 3,
    }
  ])

  useEffect(() => {
    const getFood = async () => {
      const response = await fetch(`http://localhost:8000/api/foods`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      interface DeliveryData {
        "Description": string;
        "Picture": string;
        "id": string;
      }
      let parsed = await response.json()
      let string = await parsed.message
      let fixed = string.replace(/'/g, '"'); //has single quotes around keys for some reason
      let array = JSON.parse(fixed)
      let fetched = array.map((row: DeliveryData) => ({
        description: row["Description"],
        pic: row["Picture"],
        id: row["id"],
      }))
      setItems(fetched)
    };

    getFood();
  }, [])

  return (
    <RootLayout>
      <div className="food-request-page-1">
        <div className="food-request-page-1-inner">
          <div className="request-the-following-foods-fo-parent">
            <div className="about-us">Request the following foods for free.</div>
            <div className="frame-wrapper">
              <div className="pescatarian-parent">
                <div className="about-us">Pescatarian</div>
                <SetMealIcon />

              </div>
            </div>
          </div>
        </div>
        <div className="food-carousel">
          {
            items.map((item) => (
              <Item description={item.description} pic={item.pic} id={item.id}/>
            ))
          }
        </div>
      </div>
    </RootLayout>
  );
}
