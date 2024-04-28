import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

export default function Give() {

    return (
      <div className="food-donator-landing-page">
        <div className="nav-bar-parent">
          <div className="nav-bar">
            <img className="foodloop-logo-1" alt="" src="https://drive.google.com/thumbnail?id=1nqead4zKVwK5dLZE3k3ylAEJGQnbNemu" />
  
              <div className="navbarbuttons">
                <div className="about-us">About Us</div>
                <div className="about-us">FAQ</div>
                <div className="about-us">History</div>
                <div className="about-us">Chat</div>
                <div className="about-us">Log Out</div>
              </div>
          </div>
          <div className="line">
            <div className="line-child">
            </div>
          </div>
        </div>
        <div className="bannerfinal-2-parent">
          <img className="bannerfinal-2-icon" alt="" src="https://drive.google.com/thumbnail?id=1sav3Th6LXhuUSdEP13s_wjlXrKxVUnAC" />
  
            <div className="thank-you-for-donating-your-fo-wrapper">
              <div className="thank-you-for-container">
                <p className="thank-you-for-donating-your-fo">
                  <b>Thank you for donating your food!</b>
                </p>
                <p className="thank-you-for-donating-your-fo">
                  <b>&nbsp;</b>
                </p>
                <p className="thank-you-for-donating-your-fo">Its easy to send your food to someone in need!</p>
              </div>
            </div>
        </div>
        <div className="uploadfoodimagebutton-parent">
          <button className="uploadfoodimagebutton">
            <div className="div">+</div>
          </button>
          <div className="upload-an-image">Upload an image of the food item you would like to donate.</div>
        </div>
        <div className="food-donator-landing-page-child">
        </div>
        <div className="food-donator-landing-page-inner">
          <div className="pending-delivery-of-your-food-wrapper">
            <b className="about-us">Pending Delivery of your food</b>
          </div>
        </div>
        <div className="frame-div">
          <div className="pending-delivery-of-your-food-wrapper">
            <div className="about-us">No food uploaded to donate yet!</div>
          </div>
        </div>
      </div>
    );
  }
  