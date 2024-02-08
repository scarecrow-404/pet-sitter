"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { getUser } from "@supabase/auth-helpers-nextjs";
import supabase from "@/lib/utils/db";
// Create a context
const UserContext = createContext();

// Create a provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState({});

  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, userId, setUserId, search, setSearch }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook for using the user state
export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
