import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { createClient } from "@supabase/supabase-js";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
import { set } from "date-fns";

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const pathname = usePathname();
    const [userSession, setUserSession] = useState(null);
    const { setUser, setUserId, userId } = useUser();

    async function getUser(session) {
      if (!session || !session.user) {

        return null;
      } else {
        
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id);
        if (error) {
          console.error("Error fetching user data:", error.message);
          return null;
        }
        return data[0];
      }
    }

    useEffect(() => {
      const fetchSession = async () => {
        let {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (!session) {
          const storedSession = localStorage.getItem("supabase.auth.token");
          if (storedSession) {
            session = JSON.parse(storedSession);
            supabase.auth.setSession(session);
          }
        }
        setUserSession(session);

        setUserId(session?.user?.id);
        const user = await getUser(session);
        setUser(user);
        if (
          (pathname === "/sitter_management" && user?.user_type !== "sitter") 
        ) {
          router.push("/");
        } else if (
          (pathname === "/sitter_management" && !session)
        ) {
          router.push("/");
        }
        supabase.auth.onAuthStateChange(async (event, session) => {
        

          if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
            const currentSession = supabase.auth.session;

            if (currentSession) {
              localStorage.setItem(
                "supabase.auth.token",
                JSON.stringify(currentSession)
              );
              setUserId(currentSession.user.id);
              const user = await getUser(currentSession);

              setUser(user);
          
            }
          } else if (event === "SIGNED_OUT") {
            setUser(null);
            localStorage.removeItem("supabase.auth.token");
          }
        });

        // Check if session exists
        if (!session) {
          // Redirect to login page immediately if there's no session
          router.push("/login");
        }
      };

      fetchSession();
    }, []);

    return <Component {...props} />;
  };
}
