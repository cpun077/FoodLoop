"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import './login.css';
import { useState } from "react";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const [login, setLogin] = useState(true)

  const signIn = async (formData: FormData) => {

    if (login === false) {
      setLogin(true)
      return
    } else {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      console.log(email, password)

      const response = await fetch('http://localhost:8000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Email": email,
          "Password": password,
        })
      });

      if (!response.ok) {
        const data = await response.json()
        return redirect(`/login?message=${data.error}`)
      }

      localStorage.clear()
      localStorage.setItem('Email', email)

      return redirect("/")
    }
  };

  const signUp = async (formData: FormData) => {

    if (login === true) {
      setLogin(false);
      return
    } else {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const address = formData.get("address") as string;
      const city = formData.get("city") as string;
      const state = formData.get("state") as string;
      const zipcode = parseInt(formData.get("zipcode") as string) as number;
      const org = parseInt(formData.get("org") as string) as number;
      const type = parseInt(formData.get("type") as string) as number;
      const password = formData.get("password") as string;

      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Name": name,
          "Email": email,
          "PhoneNumber": phone,
          "Address": address,
          "City": city,
          "State": state,
          "Zip Code": zipcode,
          "Organization": org,
          "Type": type,
          "Password": password,
        })
      });

      if (!response.ok) {
        const data = await response.json()
        return redirect(`/login?message=${data.error}`)
      }

      localStorage.clear()
      localStorage.setItem('Email', email)

      return redirect("/")
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
        <label className="text-md" htmlFor="name" hidden={login}>
          Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="name"
          placeholder="John Doe"
          hidden={login}
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

        <label className="text-md" htmlFor="phone" hidden={login}>
          Phone Number
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="phone"
          placeholder="01234567890"
          hidden={login}
        />

        <label className="text-md" htmlFor="address" hidden={login}>
          Home Address
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="address"
          placeholder="1234 Fake Avenue"
          hidden={login}
        />

        <label className="text-md" htmlFor="city" hidden={login}>
          City
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="city"
          placeholder="Cupertino"
          hidden={login}
        />

        <label className="text-md" htmlFor="state" hidden={login}>
          State
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="state"
          placeholder="California"
          hidden={login}
        />

        <label className="text-md" htmlFor="zipcode" hidden={login}>
          Zipcode
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="zipcode"
          placeholder="90210"
          type="number"
          hidden={login}
        />

        <label className="text-md mb-1.5" htmlFor="org" hidden={login}>
          Organization
        </label>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            name="org"
            hidden={login}
            type="radio"
            value="1"
            id="yes"
          />
          <label
            htmlFor="yes"
            className="picker"
            hidden={login}
          >
            Yes
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            name="org"
            hidden={login}
            type="radio"
            value="0"
            id="no"
          />
          <label
            htmlFor="no"
            className="picker"
            hidden={login}
          >
            No
          </label>
        </div>

        <label className="text-md mb-1.5" htmlFor="type" hidden={login}>
          User Type
        </label>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            name="type"
            hidden={login}
            type="radio"
            value="1"
            id="giver"
          />
          <label
            htmlFor="giver"
            className="picker"
            hidden={login}
          >
            Giver
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            name="type"
            hidden={login}
            type="radio"
            value="2"
            id="receiver"
          />
          <label
            htmlFor="receiver"
            className="picker"
            hidden={login}
          >
            Receiver
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            name="type"
            hidden={login}
            type="radio"
            value="3"
            id="volunteer"
          />
          <label
            htmlFor="volunteer"
            className="picker"
            hidden={login}
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
          className={!login ? ("border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2") : ("bg-purple-700 rounded-md px-4 py-2 text-foreground mb-2")}
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className={!login ? ("bg-purple-700 rounded-md px-4 py-2 text-foreground mb-2") : ("border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2")}
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
