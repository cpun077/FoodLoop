import './landingpage.css';
import Link from 'next/link';

const ActionButton = ({ className, link, text }: { className: string; link: string; text: string; }) => {
	return (
		<Link className={className} href={link}>
			<div className="approx-181000-tons-container">{text}</div>
		</Link>
	)
}

export default function Dashboard() {

	return (
		<div className="splash-screen">
			<h1 className="approx-181000-tons-of-food-g-wrapper">
				Around <b>181,000 tons</b> of food is wasted in the United States everyday
			</h1>
			<div className="bannerfinal-2-wrapper">
				<img className="bannerfinal-2-icon" alt="" src="https://media.istockphoto.com/id/536665840/photo/family-dinner.jpg?s=612x612&w=0&k=20&c=9dc8vWUoErfaxzTNqYt2T7sA5DyCRO5gRvF6pYU1LSI=" />
			</div>
			<div className="wastage-fact">Together, we can make a measurable impact.</div>
			<div className="get-started-here-parent">
				<b>Get started here!</b>
				<div className="primary-3-buttons">
					<ActionButton className="deliverbutton" link="/volunteer" text="Volunteer to Deliver Food" />
					<ActionButton className="requestfoodbutton" link="/request" text="Request Food" />
					<ActionButton className="donatefoodbutton" link="/give" text="Donate Food" />
				</div>
			</div>
		</div>
	);
}
