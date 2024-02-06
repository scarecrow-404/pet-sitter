import supabase from "@/lib/utils/db";

export async function signUp(email, password, values) {
  const { user, session, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        full_name: values.name,
        email: values.email,
        phone_number: values.phone,
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
  //     returning: "minimal", // Don't return the value after inserting
  //   });
  // const { data, insertError } = await supabase.from("users").insert([
  //   {
  //     email: values.email,
  //     phone_number: values.phone,
  //     user_type: "user",

  //     full_name: values.name,
  //   },
  // ]);
  // console.log(data, insertError ?? null);

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
