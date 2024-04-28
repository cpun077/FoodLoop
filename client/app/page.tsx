import './landingpage.css';
import Link from 'next/link';
import NavBar from '@/components/NavBar';

export default function Dashboard() {

	return (
		<div className="splash-screen">
			<NavBar />
			<div className="approx-181000-tons-of-food-g-wrapper">
				<div className="approx-181000-tons-container">
					<span>Approx. </span>
					<b>181,000 tons </b>
					<span>of food goes to waste in the U.S. per day</span>
				</div>
			</div>
			<div className="bannerfinal-2-wrapper">
				<img className="bannerfinal-2-icon" alt="" src="https://drive.google.com/thumbnail?id=1sav3Th6LXhuUSdEP13s_wjlXrKxVUnAC" />

			</div>
			<div className="wastage-fact">
				<div className="together-we-can">Together, we can make a measurable impact.</div>
			</div>
			<div className="get-started-here-parent">
				<b className="together-we-can">Get started here!</b>
				<div className="primary-3-buttons">
					<Link className="deliverbutton" href="/volunteer">
						<div className="approx-181000-tons-container">Volunteer to Deliver Food</div>
					</Link>
					<Link className="requestfoodbutton" href="/request">
						<div className="approx-181000-tons-container">Request Food</div>
					</Link>
					<Link className="donatefoodbutton" href="/give">
						<div className="approx-181000-tons-container">Donate Food</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
