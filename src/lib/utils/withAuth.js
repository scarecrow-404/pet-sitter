import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
import { set } from "date-fns";
export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const [userSession, setUserSession] = useState(null);
    const { setUser, setUserId, userId } = useUser();
    async function getUser(session) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id);
      setUser(data[0]);
      setIsLoading(false);
      return data[0]; // return the user data
    }
    useEffect(() => {
      const fetchSession = async () => {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        setUserSession(session);
        setUser(session?.user);
        setUserId(session?.user?.id);
        supabase.auth.onAuthStateChange(async (event, session) => {
          console.log(`Supabase auth event: ${event}`);
          // console.log(session);
          if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
            const currentSession = supabase.auth.session; // use supabase.auth.session, not supabase.auth.session()
            if (currentSession) {
              setUserId(currentSession.user.id);
              const user = await getUser(currentSession);
              setUser(user);
            }
          } else if (event === "SIGNED_OUT") {
            setUser(null);
          }
        });

        // console.log(userSession);
        // console.log(error);

        if (!session) {
          router.push("/login");
        }
      };

      fetchSession();
    }, []);

    return <Component {...props} />;
  };
}
