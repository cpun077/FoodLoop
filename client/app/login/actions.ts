'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error)
    redirect("/login?message=Could not signup user");
  }

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const zipcode = parseInt(formData.get("zipcode") as string) as number;
  const org = parseInt(formData.get("org") as string) as number;
  const type = parseInt(formData.get("type") as string) as number;
  const response = await fetch('http://localhost:8000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "Name": name,
      "Email": data.email,
      "PhoneNumber": phone,
      "Address": address,
      "City": city,
      "State": state,
      "Zip Code": zipcode,
      "Organization": org,
      "Type": type,
      "Password": data.password,
    })
  });

  if (!response.ok) {
    const data = await response.json()
    redirect(`/login?message=${data.error}`)
  }

  revalidatePath('/', 'layout')
  redirect("/login?message=Check email to continue sign up process");
}