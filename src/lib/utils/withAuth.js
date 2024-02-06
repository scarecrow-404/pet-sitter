import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import supabase from "@/lib/utils/db";
import { useUser } from "@/hooks/hooks";
export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const [userSession, setUserSession] = useState(null);
    const { user, setUser } = useUser();
    useEffect(() => {
      const fetchSession = async () => {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        setUserSession(session);
        setUser(session?.user);
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
