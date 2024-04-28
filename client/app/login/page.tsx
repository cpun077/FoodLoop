import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import './login.css';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
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

    const supabase = createClient();

    const response = await fetch('http://localhost:8000/api/form', {
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
      return redirect("/login?message=Response error")
    }

    const responseData = await response.json();
    return redirect(`/login?message=${responseData.message}`)

    // const { data, error } = await supabase
    //     .from('Users')
    //     .select('*')
    //     .eq('Email', email)

    //   if (error) {
    //     return redirect("/login?message=Database error");
    //   } else {
    //     if (data.length > 0) {
    //       return redirect("/login?message=Duplicate user");
    //     } else {
    //       const { error: insertError } = await supabase
    //         .from('Users')
    //         .insert({ 
    //           "Name" : name,
    //           "Email" : email,
    //           "PhoneNumber" : phone,
    //           "Address" : address,
    //           "City" : city,
    //           "State" : state,
    //           "Zip Code" : zipcode,
    //           "Organization" : org,
    //           "Type" : type,
    //           "Password" : password,
    //         })

    //       if (insertError) {
    //         return redirect("/login?message=Insert error")
    //       } else {
    //         return redirect("/login?message=Signed Up!")
    //       }
    //     }
    //   }
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

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="name">
          Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="name"
          placeholder="John Doe"
          required
        />

        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />

        <label className="text-md" htmlFor="phone">
          Phone Number
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="phone"
          placeholder="01234567890"
          required
        />

        <label className="text-md" htmlFor="address">
          Address
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="address"
          placeholder="1234 Fake Avenue"
          required
        />

        <label className="text-md" htmlFor="city">
          City
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="city"
          placeholder="Cupertino"
          required
        />

        <label className="text-md" htmlFor="state">
          State
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="state"
          placeholder="California"
          required
        />

        <label className="text-md" htmlFor="zipcode">
          Zipcode
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="zipcode"
          placeholder="90210"
          required
          type="number"
        />

        <label className="text-md" htmlFor="org">
          Organization
        </label>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="org"
            required
            type="radio"
            value="0"
            id="yes"
          />
          <label
            htmlFor="yes"
            className="picker"
          >
            Yes
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="org"
            required
            type="radio"
            value="1"
            id="no"
          />
          <label
            htmlFor="no"
            className="picker"
          >
            No
          </label>
        </div>

        <label className="text-md" htmlFor="type">
          User Type
        </label>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="type"
            required
            type="radio"
            value="1"
            id="giver"
          />
          <label
            htmlFor="giver"
            className="picker"
          >
            Giver
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="type"
            required
            type="radio"
            value="2"
            id="receiver"
          />
          <label
            htmlFor="receiver"
            className="picker"
          >
            Receiver
          </label>
        </div>
        <div>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="type"
            required
            type="radio"
            value="3"
            id="volunteer"
          />
          <label
            htmlFor="volunteer"
            className="picker"
          >
            Volunteer
          </label>
        </div>

        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <SubmitButton
          formAction={signIn}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
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
