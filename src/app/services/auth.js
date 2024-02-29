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
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return;
  }
}

export async function resetPassword(email) {
  const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
  if (error) {
    return error;
  }
  return data;
}

export async function signInWithProvider(provider) {
  const { user, session, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) {
    return error;
  }

  return user;
}
export async function signUpWithProvider(provider) {
  const { user, session, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) {
    return error;
  }

  return user;
}
