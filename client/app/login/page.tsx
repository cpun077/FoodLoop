"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import './login.css';
import { useState } from "react";
import { login, signup } from "./actions";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {

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
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
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

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" id='login'>
        <label className="text-md" htmlFor="name" hidden={signin}>
          Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="name"
          placeholder="John Doe"
          hidden={signin}
        />

        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="email"
          placeholder="you@example.com"
          type="email"
        />

        <label className="text-md" htmlFor="phone" hidden={signin}>
          Phone Number
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="phone"
          placeholder="01234567890"
          hidden={signin}
        />

        <label className="text-md" htmlFor="address" hidden={signin}>
          Home Address
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="address"
          placeholder="1234 Fake Avenue"
          hidden={signin}
        />

        <label className="text-md" htmlFor="city" hidden={signin}>
          City
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="city"
          placeholder="Cupertino"
          hidden={signin}
        />

        <label className="text-md" htmlFor="state" hidden={signin}>
          State
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="state"
          placeholder="California"
          hidden={signin}
        />

        <label className="text-md" htmlFor="zipcode" hidden={signin}>
          Zipcode
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="zipcode"
          placeholder="90210"
          type="number"
          hidden={signin}
        />

        <label className="text-md mb-1.5" htmlFor="org" hidden={signin}>
          Organization
        </label>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            name="org"
            hidden={signin}
            type="radio"
            value="1"
            id="yes"
          />
          <label
            htmlFor="yes"
            className="picker"
            hidden={signin}
          >
            Yes
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            name="org"
            hidden={signin}
            type="radio"
            value="0"
            id="no"
          />
          <label
            htmlFor="no"
            className="picker"
            hidden={signin}
          >
            No
          </label>
        </div>

        <label className="text-md mb-1.5" htmlFor="type" hidden={signin}>
          User Type
        </label>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            name="type"
            hidden={signin}
            type="radio"
            value="1"
            id="giver"
          />
          <label
            htmlFor="giver"
            className="picker"
            hidden={signin}
          >
            Giver
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            name="type"
            hidden={signin}
            type="radio"
            value="2"
            id="receiver"
          />
          <label
            htmlFor="receiver"
            className="picker"
            hidden={signin}
          >
            Receiver
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            name="type"
            hidden={signin}
            type="radio"
            value="3"
            id="volunteer"
          />
          <label
            htmlFor="volunteer"
            className="picker"
            hidden={signin}
          >
            Volunteer
          </label>
        </div>

        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          type="password"
          name="password"
          placeholder="••••••••"
        />

        <SubmitButton
          formAction={signIn}
          className={!signin ? ("border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2") : ("bg-purple-700 rounded-md px-4 py-2 text-foreground mb-2")}
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className={!signin ? ("bg-purple-700 rounded-md px-4 py-2 text-foreground mb-2") : ("border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2")}
          pendingText="Signing Up..."
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
