import Link from 'next/link';
import './FoodRequestorPage1.css';
import RootLayout from '../layout';

export default function Request() {

  let temppic = "https://drive.google.com/thumbnail?id=1SHzji5N7mM0hxLYWaNXlj2O6lJ5fOY9B"

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
          <div className="view-button-1">
            <img className="uploadfoodimagebutton-icon" alt="" src={temppic} />

            <div className="shrimp-scampi-with-oyster-container">
              <p className="shrimp-scampi">Shrimp Scampi</p>
              <p className="shrimp-scampi">with Oyster Sauce</p>
              <p className="shrimp-scampi">Be aware of allergies.</p>
            </div>
            <div className="requestthisbutton">
              <div className="about-us">View</div>
            </div>
          </div>
          <div className="view-button-2">
            <img className="uploadfoodimagebutton-icon" alt="" src={temppic} />

            <div className="shrimp-scampi-with-oyster-container">
              <p className="shrimp-scampi">Shrimp Noodles</p>
              <p className="shrimp-scampi">With Oyster Sauce with French Fries on the side.</p>
            </div>
            <div className="requestthisbutton">
              <div className="about-us">View</div>
            </div>
          </div>
          <div className="view-button-2">
            <img className="uploadfoodimagebutton-icon" alt="" src={temppic} />

            <div className="shrimp-scampi-with-oyster-container">Mixed Seafood Salad. One Soy sauce packet. And Chili sauce packet.</div>
            <div className="requestthisbutton">
              <div className="about-us">View</div>
            </div>
          </div>
          <div className="view-button-2">
            <img className="uploadfoodimagebutton-icon" alt="" src={temppic} />

            <div className="shrimp-scampi-with-oyster-container">Mixed Seafood Salad. One Soy sauce packet. And Chili sauce packet.</div>
            <div className="requestthisbutton">
              <div className="about-us">View</div>
            </div>
          </div>
          <div className="view-button-2">
            <img className="uploadfoodimagebutton-icon" alt="" src={temppic} />

            <div className="shrimp-scampi-with-oyster-container">Mixed Seafood Salad. One Soy sauce packet. And Chili sauce packet.</div>
            <div className="requestthisbutton">
              <div className="about-us">View</div>
            </div>
          </div>
          <div className="view-button-2">
            <img className="uploadfoodimagebutton-icon" alt="" src={temppic} />

            <div className="shrimp-scampi-with-oyster-container">Mixed Seafood Salad. One Soy sauce packet. And Chili sauce packet.</div>
            <div className="requestthisbutton">
              <div className="about-us">View</div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
