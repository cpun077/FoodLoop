import './design.css';
import './Splash.css';

export default function NewLogin({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  return (
    <div className="splash-screen">
    <div className="app-name-parent">
        <div className="app-name">App Name</div>
        <div className="about-us-wrapper">
            <div className="app-name">About Us</div>
        </div>
    </div>
    <div className="frame-parent">
        <div className="volunteer-to-deliver-parent">
            <div className="volunteer-to-deliver">
                <div className="volunteer-to-deliver1">Volunteer to Deliver Food</div>
            </div>
            <div className="volunteer-to-deliver">
                <div className="app-name">Request Food</div>
            </div>
            <div className="volunteer-to-deliver">
                <div className="app-name">Donate Food</div>
            </div>
        </div>
        <div className="istockphoto-1299146413-1024x10-wrapper">
            <img className="istockphoto-1299146413-1024x10-icon" alt="" src="https://drive.google.com/thumbnail?id=1MwVBRx9vYnIbn8MsuI5N-w0e4gb1PZUn&sz=w1000" />
            
        </div>
    </div>
    <div className="lets-save-the-world-by-donatin-wrapper">
        <div className="lets-save-the">Lets save the world by donating food that may go to waste.</div>
    </div>
</div>
  );
}
