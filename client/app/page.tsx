import './landingpage.css';
import Link from 'next/link';
import banner from './assets/banner.jpg'
import Image from 'next/image';

const ActionButton = ({ id, link, text }: { id: string; link: string; text: string; }) => {
	return (
		<Link className='homeactionbutton' id={id} href={link}>
			{text}
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
				<Image className="bannerfinal-2-icon" alt="Logo" src={banner} />
			</div>
			<div className="wastage-fact">Together, we can make a measurable impact.</div>
			<div className="get-started-here-parent">
				<b>Get started here!</b>
				<div className="primary-3-buttons">
					<ActionButton id="deliver" link="/volunteer" text="Volunteer to Deliver Food" />
					<ActionButton id="request" link="/request" text="Request Food" />
					<ActionButton id="donate" link="/give" text="Donate Food" />
				</div>
			</div>
		</div>
	);
}
