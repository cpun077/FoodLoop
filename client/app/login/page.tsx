"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { useState } from "react";
import { login, signup } from "./actions";

const LoginInput = ({label, name, placeholder, hidden}:{label:string, name:string, placeholder:string, hidden:boolean}) => {
  return (
    <div className="flex flex-col gap-2 mb-6 logininput" style={{display: hidden?('none'):('flex'), opacity: hidden?(0):(1)}}>
      <label className="text-md" htmlFor={name}>
        {label}
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border"
        name={name}
        placeholder={placeholder}
        type={name==="password"?(name):("text")}
      />
    </div>
  )
}

export default function Login({ searchParams, }: { searchParams: { message: string }; }) {

  const [signin, setSignin] = useState(true)

  const signIn = async (formData: FormData) => {

    if (signin === false) {
      setSignin(true)
      return
    } else {
      login(formData)
    }
  };

  const signUp = async (formData: FormData) => {

    if (signin === true) {
      setSignin(false);
      return
    } else {
      signup(formData)
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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
        Back
      </Link>

      <form className="animate-in flex-1 flex flex-col w-full justify-center text-foreground" id='login'>
        <header className="mx-auto text-lg mb-5">{signin?("Welcome Back!"):("Welcome!")}</header>
        <LoginInput label="First Name" name="first" placeholder="John" hidden={signin} />
        <LoginInput label="Last Name" name="last" placeholder="Doe" hidden={signin} />
        <LoginInput label="Email" name="email" placeholder="you@example.com" hidden={false} />
        {/* <LoginInput label="Phone Number" name="phone" placeholder="01234567890" hidden={signin} />
        <LoginInput label="Home Address" name="address" placeholder="1234 Fake Avenue" hidden={signin} />
        <LoginInput label="City" name="city" placeholder="Cupertino" hidden={signin} />
        <LoginInput label="State" name="state" placeholder="California" hidden={signin} />
        <LoginInput label="Zip Code" name="zipcode" placeholder="90210" hidden={signin} /> */}

        {/* <label className="text-md mb-2.5" htmlFor="org" hidden={signin}>
          Organization
        </label>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="org"
            hidden={signin}
            type="radio"
            value="1"
            id="yes"
          />
          <label
            htmlFor="yes"
            className="ml-5"
            hidden={signin}
          >
            Yes
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="org"
            hidden={signin}
            type="radio"
            value="0"
            id="no"
          />
          <label
            htmlFor="no"
            className="ml-5"
            hidden={signin}
          >
            No
          </label>
        </div>

        <label className="text-md mb-2.5" htmlFor="type" hidden={signin}>
          User Type
        </label>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="type"
            hidden={signin}
            type="radio"
            value="1"
            id="giver"
          />
          <label
            htmlFor="giver"
            className="ml-5"
            hidden={signin}
          >
            Giver
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="type"
            hidden={signin}
            type="radio"
            value="2"
            id="receiver"
          />
          <label
            htmlFor="receiver"
            className="ml-5"
            hidden={signin}
          >
            Receiver
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="type"
            hidden={signin}
            type="radio"
            value="3"
            id="volunteer"
          />
          <label
            htmlFor="volunteer"
            className="ml-5"
            hidden={signin}
          >
            Volunteer
          </label>
        </div> */}

        <LoginInput label="Password" name="password" placeholder="••••••••" hidden={false} />

        <SubmitButton
          formAction={signIn}
          className={!signin ? ("border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2") : ("bg-purple-700 rounded-md px-4 py-2 text-foreground mb-2")}
          pendingText={!signin?"Sign In":"Signing In..."}
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className={!signin ? ("bg-purple-700 rounded-md px-4 py-2 text-foreground mb-2") : ("border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2")}
          pendingText={!signin?"Signing Up...":"Sign Up"}
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
