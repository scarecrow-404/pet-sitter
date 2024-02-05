import supabase from "@/lib/utils/db";

export async function signUp(email, password, values) {
  const { user, session, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      // // data: {
      // //   full_name: values.name,
      // //   email: values.email,
      // //   phone_number: values.phone,
      // // },
      data: {
        full_name: "John",
        avatar_url: "213123.COM/ASDASDA",
      },
      emailRedirectTo: `${location.origin}/auth/callback`,
    },
  });
  console.log(user, session, error);
  // if (user) {
  //   const { data, error } = await supabase.from("profiles").insert([
  //     {
  //       id: user.id,
  //       full_name: "John",
  //       avatar_url: "27",
  //     },
  //   ]);
  //   console.log(data);
  // }

  console.log("Check your email to complete sign up.");

  // const { data, insertError } = await supabase
  //   .from("profiles")
  //   .insert([{ email: values.email, full_name: values.name }], {
  //     headers: {
  //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6InlEeklWN29xa3BTMXMyeWciLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA3MTI3NTY5LCJpYXQiOjE3MDcxMjM5NjksImlzcyI6Imh0dHBzOi8vZHptZmRweXpnbHhvdml6ZGhpdHYuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjExMzdhYzVmLTZjN2YtNDU4MC1hYWUxLTJkMzQ3YmQxOTVlZCIsImVtYWlsIjoia2l0dGlwb29tLnB1dEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImFnZSI6MjcsImZpcnN0X25hbWUiOiJKb2huIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib3RwIiwidGltZXN0YW1wIjoxNzA3MTIzOTY5fV0sInNlc3Npb25faWQiOiI2NDM5OWI3ZS1lNjdiLTQ3YmMtYTE1My1mYzc2YTU4M2UwOTYifQ.Q_5QDaqy8dgwvaMXkBwPIcrtAEJWUZCuukqDDGEk53g`,
  //     },
  //   });
  // const { data, insertError } = await supabase.from("users").insert([
  //   {
  //     email: values.email,
  //     phone_number: values.phone,
  //     user_type: "user",

  //     full_name: values.name,
  //   },
  // ]);
  console.log(data, insertError ?? null);

  // if (insertError) {
  //   console.error("Error inserting values:", insertError);
  //   console.error("Error details:", insertError.details);
  //   return;
  // }
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in:", error);
    return error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
    return;
  }

  console.log("User signed out");
}
