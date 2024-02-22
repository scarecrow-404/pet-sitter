"use server";
import { createServerClient } from "@supabase/ssr";

export const createClient = (cookieStore) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: function (name) {
          return cookieStore.get(name)?.value;
        },
        set: function (name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error(error);
          }
        },
        remove: function (name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.error(error);
          }
        },
      },
    }
  );
};
