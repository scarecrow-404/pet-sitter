// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@supabase/supabase-js";
// import supabase from "@/lib/utils/db";
// import { useUser } from "@/hooks/hooks";
// import { set } from "date-fns";
// export default function withAuth(Component) {
//   return function ProtectedRoute(props) {
//     const router = useRouter();
//     const [userSession, setUserSession] = useState(null);
//     const { setUser, setUserId, userId } = useUser();
//     async function getUser(session) {
//       if (!session) {
//         console.log("not session");
//         return null;
//       } else if (!session.user) {
//         console.log("not session.user");
//         return null;
//       } else {
//         console.log("in else condition");
//         const { data, error } = await supabase
//           .from("users")
//           .select("*")
//           .eq("id", session.user.id);
//         console.log(error);

//         return data[0];
//       }
//     }
//     useEffect(() => {
//       const fetchSession = async () => {
//         let {
//           data: { session },
//           error,
//         } = await supabase.auth.getSession();
//         if (!session) {
//           const storedSession = localStorage.getItem("supabase.auth.token");
//           if (storedSession) {
//             session = JSON.parse(storedSession);
//             supabase.auth.setSession(session);
//           }
//         }
//         setUserSession(session);

//         setUserId(session?.user?.id);
//         const user = await getUser(session);
//         setUser(user);
//         supabase.auth.onAuthStateChange(async (event, session) => {
//           console.log(`Supabase auth event: ${event}`);

//           if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
//             const currentSession = supabase.auth.session;

//             if (currentSession) {
//               localStorage.setItem(
//                 "supabase.auth.token",
//                 JSON.stringify(currentSession)
//               );
//               setUserId(currentSession.user.id);
//               const user = await getUser(currentSession);

//               setUser(user);
//             }
//           } else if (event === "SIGNED_OUT") {
//             setUser(null);
//             localStorage.removeItem("supabase.auth.token");
//           }
//         });

//         if (!session) {
//           router.push("/login");
//         }
//       };

//       fetchSession();
//     }, []);

//     return <Component {...props} />;
//   };
// }

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
        console.log("No session or session user found");
        return null;
      } else {
        console.log("Fetching user data...");
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
        if (pathname === "/sitter_management" && user.user_type !== "sitter") {
          router.push("/");
        }
        supabase.auth.onAuthStateChange(async (event, session) => {
          console.log(`Supabase auth event: ${event}`);

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
              console.log("ssssssssssss", user.user_type);
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
