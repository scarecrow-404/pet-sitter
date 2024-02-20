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

  console.log("Check your email to complete sign up.");
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
  console.log("sign out function called");
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
    return;
  }

  console.log("User signed out");
}

export async function resetPassword(email) {
  const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
  if (error) {
    console.error("Error resetting password:", error);
    return error;
  }

  console.log("Password recovery email sent");
  return data;
}

export async function signInWithProvider(provider) {
  const { user, session, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) {
    console.error("Error signing in:", error);
    return error;
  }

  return user;
}
export async function signUpWithProvider(provider) {
  console.log(provider);
  const { user, session, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) {
    console.error("Error signing up:", error);
    return error;
  }

  return user;
}
