"use client";

import Link from 'next/link';
import '../DonatorLandingPage.css';
import { SubmitButton } from "../../login/submit-button";
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';

export default function Give() {

  const submit = async (formData: FormData) => {

    const email = localStorage.getItem("Email") ?? null;
    console.log(email)
    const desc = formData.get("desc") as string;
    const photo = formData.get("photo") as string;

    const response = await fetch('http://localhost:8000/api/give', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Email": email,
        "Description": desc,
        /*"Picture": photo,*/
      })
    });

    if (!response.ok) {
      const data = await response.json()
      alert(data.error)
    }

    return redirect("/")
  };

  return (
    <div className="food-donator-landing-page">
      <NavBar />
      <div className="thank-you-for-donating-your-fo-wrapper">
        <div className="thank-you-for-container">
          <span>
            <p className="thank-you-for-donating-your-fo">
              <b>Thank you for donating your food!</b>
            </p>
            <p className="thank-you-for-donating-your-fo">
              <b>&nbsp;</b>
            </p>
            <p className="thank-you-for-donating-your-fo">We appreciate you helping someone in need and helping reduce food waste.</p>
          </span>
        </div>
      </div>
      <label htmlFor="avatar">Upload image of donation:</label>
      <form>
        <input className="uploadfoodimagebutton" type="file" name="avatar" accept="image/png, image/jpeg" required />
        <div className="food-donator-landing-page-inner">
          <div className="describe-the-food-here-parent">
            <div className="describe-the-food-container">
              <span>Describe the food here </span>
              <span className="span">*</span>
            </div>
            <input
              className="input-field"
              name="desc"
              type='text'
              placeholder='In the description please enter if the food is vegan, vegetarian or what kind of meat it contains. For Example: 1 In N Out Burger Cheese Burger. Contains Beef.'
              required
            />
            <SubmitButton
              formAction={submit}
              className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
              pendingText="Uploading..."
            >
              Submit Photo and Description
            </SubmitButton>
          </div>
        </div>
      </form>
      <div className="food-donator-landing-page-child">
      </div>
      <div className="frame-div">
        <div className="pending-delivery-of-your-food-wrapper">
          <b className="about-us">Pending Delivery of your food</b>
        </div>
      </div>
      <div className="food-donator-landing-page-inner1">
        <div className="pending-delivery-of-your-food-wrapper">
          <div className="about-us">No food uploaded to donate yet!</div>
        </div>
      </div>
    </div>

  );
}
