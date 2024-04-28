"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './FoodRequestorPage1.css';
import RootLayout from '../layout';

export default function Request() {

  let temppic = "https://drive.google.com/thumbnail?id=1SHzji5N7mM0hxLYWaNXlj2O6lJ5fOY9B"

  interface ItemInterface {
    description: string;
    pic: string;
  }
  const Item = (props: ItemInterface) => {
    return (
      <div className="view-button-1">
        <img className="uploadfoodimagebutton-icon" alt="" src={`data:image/png;base64,${props.pic}`} />

        <div className="shrimp-scampi-with-oyster-container">
          <p className="shrimp-scampi">{props.description}</p>
        </div>
        <div className="requestthisbutton">
          <div className="about-us">View</div>
        </div>
      </div>
    )
  }

  const [items, setItems] = useState([
    {
      description: "Shrim Scampi with Oyster Sauce Be Aware of Allergies.",
      pic: "Sample"
    }, {
      description: "Shrimp Noodles with Oyster Sauce and French Fries on the Side",
      pic: "Sample"
    }, {
      description: "Shrimp Noodles with Oyster Sauce and French Fries on the Side",
      pic: "Sample"
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
      }
      let parsed = await response.json()
      let string = await parsed.message
      let fixed = string.replace(/'/g, '"'); //has single quotes around keys for some reason
      let array = JSON.parse(fixed)
      let fetched = array.map((row: DeliveryData) => ({
        description: row["Description"],
        pic: row["Picture"]
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
                <img className="dropdown-1-icon" alt="" src="Dropdown 1.svg" />

              </div>
            </div>
          </div>
        </div>
        <div className="food-carousel">
          {
            items.map((item) => (
              <Item description={item.description} pic={item.pic}/>
            ))
          }
        </div>
      </div>
    </RootLayout>
  );
}
