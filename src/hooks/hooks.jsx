"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { getUser } from "@supabase/auth-helpers-nextjs";
import supabase from "@/lib/utils/db";
import { set } from "date-fns";
// Create a context
const UserContext = createContext();

// Create a provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const [search, setSearch] = useState({
    exp: "0-10",
    rating: 0,
    pet: [1, 2, 3, 4],
    keyword: "",
  });

  const [bookingData, setBookingData] = useState({
    isModalOpen: false,
    startTime: "07.00",
    endTime: "07.15",
    date: new Date(),
    fullname: "",
    sittername: "",
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userId,
        setUserId,
        bookingData,
        setBookingData,
        search,
        setSearch,
      }}
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

async function getUserFromQuery(session) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", "fed4e73e-0600-4fa7-acff-25d9bf80b66e");
  console.log(error);
  console.log(data);
  return data[0];
}
