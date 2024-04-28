"use client";

import Link from 'next/link';
import './DonatorLandingPage.css';
import { SubmitButton } from "../login/submit-button";
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';
import { useState } from 'react';
import RootLayout from '../layout';

export default function Give() {

  const [success, setSuccess] = useState(false)
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  interface FileInputEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const getPhoto = (e:FileInputEvent) => {
    const fileInput = e.target

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      console.error('No file selected.');
      return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const base64Data = (event.target as FileReader).result?.toString().split(',')[1];
      setPhoto(base64Data)
    };
  
    reader.readAsDataURL(file);
  };
  

  const submit = async (formData: FormData) => {

    const email = localStorage.getItem("Email") ?? null;
    const desc = formData.get("desc") as string;

    const response = await fetch('http://localhost:8000/api/give', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Email": email,
        "Description": desc,
        "Picture": photo,
      })
    });

    if (!response.ok) {
      const data = await response.json()
      alert(data.error)
    }

    setSuccess(true)
  };

  return (
    success ? (<RootLayout>
      <div className='food-donator-landing-page' id='back'>
        <h1>You Just Made Somebody's Day!</h1>
        <Link
          href={"/"}
          className='bg-purple-700 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm'
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Return Home
        </Link>
      </div>
    </RootLayout>
    ) : (
      <RootLayout>
        <div className="food-donator-landing-page">
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
            <input
              className="uploadfoodimagebutton"
              type="file"
              id="uploadbutt"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={(e: FileInputEvent) => getPhoto(e)}
              required
            />
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
      </RootLayout>
    )
  );
}
