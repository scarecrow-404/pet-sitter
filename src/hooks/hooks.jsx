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
  const [sitterId, setSitterId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewSearch, setIsNewSearch] = useState(true);
  const [search, setSearch] = useState({
    exp: "",
    rating: 0,
    pet: [],
    keyword: "",
  });

  const [bookingData, setBookingData] = useState({
    isModalOpen: false,
    startTime: "07:00 AM",
    endTime: "07:00 AM",
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
        setIsNewSearch,
        isNewSearch,
        sitterId,
        setSitterId,
        isLoading,
        setIsLoading,
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

  return data[0];
}
